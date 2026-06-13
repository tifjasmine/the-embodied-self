const FIELD_MAP = {
  entryType: process.env.AIRTABLE_FIELD_ENTRY_TYPE || "Entry Type",
  name: process.env.AIRTABLE_FIELD_NAME || "Name",
  approved: process.env.AIRTABLE_FIELD_APPROVED || "Approved",
  response: process.env.AIRTABLE_FIELD_RESPONSE || "Response",
  email: process.env.AIRTABLE_FIELD_EMAIL || "Email",
  kidsAge: process.env.AIRTABLE_FIELD_KIDS_AGE || "Kids Age",
  heardFrom: process.env.AIRTABLE_FIELD_HEARD_FROM || "Heard From",
  relatedQuestion:
    process.env.AIRTABLE_FIELD_RELATED_QUESTION || "Related Question",
  questionIntro:
    process.env.AIRTABLE_FIELD_QUESTION_INTRO || "Question Intro",
  questionActive:
    process.env.AIRTABLE_FIELD_QUESTION_ACTIVE || "Question Active",
  questionText:
    process.env.AIRTABLE_FIELD_QUESTION_TEXT || "Question Text",
  featured: process.env.AIRTABLE_FIELD_FEATURED || "Featured",
};

function unwrapValue(value) {
  if (value === null || value === undefined) return "";

  if (Array.isArray(value)) {
    return value.map((item) => unwrapValue(item)).filter(Boolean).join(", ");
  }

  if (typeof value === "object") {
    if (value.value !== undefined) return unwrapValue(value.value);
    if (value.label !== undefined) return unwrapValue(value.label);
    if (value.name !== undefined) return unwrapValue(value.name);
    if (value.title !== undefined) return unwrapValue(value.title);
    if (value.text !== undefined) return unwrapValue(value.text);
    return "";
  }

  if (typeof value === "boolean") return value ? "true" : "";
  return String(value).trim();
}

function cleanType(value) {
  return unwrapValue(value).toLowerCase();
}

function isTruthy(value) {
  if (value === true) return true;

  const text = unwrapValue(value).toLowerCase();

  return ["true", "yes", "approved", "published", "public", "1"].includes(
    text
  );
}

function firstValue(records, fieldName) {
  for (const record of records) {
    const value = unwrapValue(record.fields?.[fieldName]);
    if (value) return value;
  }

  return "";
}

function responseItem(record) {
  return {
    id: record.id,
    text: unwrapValue(record.fields?.[FIELD_MAP.response]),
    name: unwrapValue(record.fields?.[FIELD_MAP.name]),
    featured: isTruthy(record.fields?.[FIELD_MAP.featured]),
  };
}

function sortFeaturedFirst(a, b) {
  if (a.featured && !b.featured) return -1;
  if (!a.featured && b.featured) return 1;
  return 0;
}

async function fetchAllAirtableRecords() {
  const token = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Community";
  const viewName = process.env.AIRTABLE_VIEW_NAME;

  if (!token || !baseId || !tableName) {
    return { configured: false, records: [] };
  }

  const records = [];
  let offset = "";

  do {
    const params = new URLSearchParams({ pageSize: "100" });

    if (offset) params.set("offset", offset);
    if (viewName) params.set("view", viewName);

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
      tableName
    )}?${params}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Airtable request failed: ${response.status} ${message}`);
    }

    const payload = await response.json();
    records.push(...(payload.records || []));
    offset = payload.offset || "";
  } while (offset);

  return { configured: true, records };
}

exports.handler = async function handler() {
  try {
    const { configured, records } = await fetchAllAirtableRecords();

    const questionRecords = records.filter((record) => {
      const entryType = cleanType(record.fields?.[FIELD_MAP.entryType]);
      const active = isTruthy(record.fields?.[FIELD_MAP.questionActive]);

      return entryType === "monthly question" && active;
    });

    const sourceRecords = questionRecords.length
      ? questionRecords
      : records.filter((record) =>
          isTruthy(record.fields?.[FIELD_MAP.questionActive])
        );

    const currentQuestion = firstValue(sourceRecords, FIELD_MAP.questionText);
    const questionIntro = firstValue(sourceRecords, FIELD_MAP.questionIntro);

    const dysregulatedThoughts = records
      .filter((record) => {
        const entryType = cleanType(record.fields?.[FIELD_MAP.entryType]);
        const approved = isTruthy(record.fields?.[FIELD_MAP.approved]);
        const response = unwrapValue(record.fields?.[FIELD_MAP.response]);

        return entryType === "dysregulated thought" && approved && response;
      })
      .map(responseItem)
      .sort(sortFeaturedFirst);

    const questionResponses = records
      .filter((record) => {
        const entryType = cleanType(record.fields?.[FIELD_MAP.entryType]);
        const approved = isTruthy(record.fields?.[FIELD_MAP.approved]);
        const response = unwrapValue(record.fields?.[FIELD_MAP.response]);

        return entryType === "question response" && approved && response;
      })
      .map(responseItem)
      .sort(sortFeaturedFirst);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
      },
      body: JSON.stringify({
        configured,
        currentQuestion,
        questionIntro,
        dysregulatedThoughts,
        questionResponses,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Unable to load community data.",
        details: error.message,
      }),
    };
  }
};
