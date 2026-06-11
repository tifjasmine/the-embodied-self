const FIELD_MAP = {
  name: process.env.AIRTABLE_FIELD_NAME || "Name",
  approved: process.env.AIRTABLE_FIELD_APPROVED || "Approved",
  response: process.env.AIRTABLE_FIELD_RESPONSE || "Response",
  email: process.env.AIRTABLE_FIELD_EMAIL || "Email",
  kidsAge: process.env.AIRTABLE_FIELD_KIDS_AGE || "Kids Age",
  heardFrom: process.env.AIRTABLE_FIELD_HEARD_FROM || "Heard From",
  relatedQuestion: process.env.AIRTABLE_FIELD_RELATED_QUESTION || "Related Question",
  questionActive: process.env.AIRTABLE_FIELD_QUESTION_ACTIVE || "Question Active",
};

function requiredEnv() {
  const token = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Community";

  return { token, baseId, tableName };
}

function clean(value) {
  return String(value || "").trim();
}

function arrayValue(value) {
  if (!value) return [];
  return Array.isArray(value) ? value.map(clean).filter(Boolean) : [clean(value)].filter(Boolean);
}

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed." }),
    };
  }

  try {
    const { token, baseId, tableName } = requiredEnv();

    if (!token || !baseId || !tableName) {
      return {
        statusCode: 503,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Airtable is not configured yet.",
        }),
      };
    }

    const data = JSON.parse(event.body || "{}");
    const formType = clean(data.formType);
    const responseText = clean(data.response);
    const questionText = clean(data.question);

    if (formType === "truth" && !responseText) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Please share a response before submitting." }),
      };
    }

    if (formType === "question" && !questionText) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Please add a question before submitting." }),
      };
    }

    const fields = {
      [FIELD_MAP.name]: clean(data.name),
      [FIELD_MAP.email]: clean(data.email),
      [FIELD_MAP.kidsAge]: arrayValue(data.kidsAge),
      [FIELD_MAP.heardFrom]: arrayValue(data.heardFrom),
      [FIELD_MAP.approved]: false,
      [FIELD_MAP.questionActive]: false,
    };

    if (formType === "truth") {
      fields[FIELD_MAP.response] = responseText;
      fields[FIELD_MAP.relatedQuestion] = clean(data.relatedQuestion);
    }

    if (formType === "question") {
      fields[FIELD_MAP.relatedQuestion] = questionText;
      fields[FIELD_MAP.response] = clean(data.context);
    }

    Object.keys(fields).forEach((key) => {
      if (fields[key] === "" || fields[key] === undefined || fields[key] === null) {
        delete fields[key];
      }
    });

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ records: [{ fields }] }),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Airtable request failed: ${response.status} ${message}`);
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Unable to submit right now.",
        details: error.message,
      }),
    };
  }
};
