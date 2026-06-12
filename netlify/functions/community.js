const FIELD_MAP = {
  name: process.env.AIRTABLE_FIELD_NAME || "Name",
  approved: process.env.AIRTABLE_FIELD_APPROVED || "Approved",
  response: process.env.AIRTABLE_FIELD_RESPONSE || "Response",
  email: process.env.AIRTABLE_FIELD_EMAIL || "Email",
  kidsAge: process.env.AIRTABLE_FIELD_KIDS_AGE || "Kids Age",
  heardFrom: process.env.AIRTABLE_FIELD_HEARD_FROM || "Heard From",
  relatedQuestion: process.env.AIRTABLE_FIELD_RELATED_QUESTION || "Related Question",
  questionIntro: process.env.AIRTABLE_FIELD_QUESTION_INTRO || "Question Intro",
  questionActive: process.env.AIRTABLE_FIELD_QUESTION_ACTIVE || "Question Active",
  questionText: process.env.AIRTABLE_FIELD_QUESTION_TEXT || "Question Text",
  featured: process.env.AIRTABLE_FIELD_FEATURED || "Featured",
  therapistReflection: process.env.AIRTABLE_FIELD_THERAPIST_REFLECTION || "Therapist Reflection",
  toolTitle: process.env.AIRTABLE_FIELD_TOOL_TITLE || "Tool Title",
  toolInstructions: process.env.AIRTABLE_FIELD_TOOL_INSTRUCTIONS || "Tool Instructions",
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

function isTruthy(value) {
  if (value === true) return true;

  const text = unwrapValue(value).toLowerCase();
  return ["true", "yes", "approved", "published", "public", "1"].includes(text);
}

function firstValue(records, fieldName) {
  for (const record of records) {
    const value = unwrapValue(record.fields?.[fieldName]);
    if (value) return value;
  }

  return "";
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

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?${params}`;
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

    const activeRecords = records.filter((record) =>
      isTruthy(record.fields?.[FIELD_MAP.questionActive])
    );
    const sourceRecords = activeRecords.length ? activeRecords : records;

    const currentQuestion = firstValue(sourceRecords, FIELD_MAP.questionText);
    const questionIntro = firstValue(sourceRecords, FIELD_MAP.questionIntro);
    const therapistReflection = firstValue(sourceRecords, FIELD_MAP.therapistReflection);
    const toolTitle = firstValue(sourceRecords, FIELD_MAP.toolTitle);
    const toolInstructions = firstValue(sourceRecords, FIELD_MAP.toolInstructions);

    const responses = records
      .filter((record) => {
        const approved = record.fields?.[FIELD_MAP.approved];
        return isTruthy(approved);
      })
      .map((record) => ({
        id: record.id,
        text: unwrapValue(record.fields?.[FIELD_MAP.response]),
        name: unwrapValue(record.fields?.[FIELD_MAP.name]),
        featured: isTruthy(record.fields?.[FIELD_MAP.featured]),
      }))
      .filter((item) => item.text)
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });

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
        therapistReflection,
        toolTitle,
        toolInstructions,
        responses,
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
