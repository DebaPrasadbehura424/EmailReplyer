const fetch = require("node-fetch");

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAOd0c_05TGpxk6GFERgg4kU2QEqoZqJhM";

exports.UserEmailScanner = async (req, res) => {
  const { emailContext, tone, language } = req.body;

  if (!emailContext || !tone || !language) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const prompt = `Write a reply to the following email using a ${tone} tone and translate or format it in ${language}: ${emailContext}`;

  const body = {
    contents: [
      {
        parts: [
          {
            text: prompt.trim(),
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    console.log("🟡 Raw Gemini API Response:\n", text);

    const data = JSON.parse(text);

    if (!data.candidates || !data.candidates.length) {
      return res.status(500).json({ error: "No valid response from Gemini" });
    }

    const convertedMessage = data.candidates[0].content.parts[0].text;
    console.log("🟢 Converted message:", convertedMessage);

    return res.status(200).json({ convertedMessage });
  } catch (error) {
    console.error("🔴 Gemini API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
