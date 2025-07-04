import React, { useState } from "react";
import axios from "axios";

function ConvertForm() {
  const [email, setEmail] = useState("");
  const [convertedMessage, setConvertedMessage] = useState("");
  const [tone, setTone] = useState("");
  const [language, setLanguage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = async () => {
    if (!tone || !language) {
      setConvertedMessage("");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5757/api/email/emailScanner",
        {
          emailContext: email,
          tone,
          language,
        }
      );

      setConvertedMessage(res.data.convertedMessage || "Message converted!");
    } catch {
      setConvertedMessage("An error occurred.");
    }
  };
  const handleCopy = () => {
    console.log(convertedMessage);

    if (convertedMessage) return;
    const copy = navigator.clipboard.writeText(convertedMessage.trim());
    console.log(copy);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Email Message Converter
      </h2>

      <textarea
        placeholder="Write your email here..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        rows={6}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-500"
      />

      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-4 bg-white focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="">Select Tone</option>
        <option value="Formal">Formal</option>
        <option value="Friendly">Friendly</option>
        <option value="Professional">Professional</option>
        <option value="Casual">Casual</option>
      </select>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-4 bg-white focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="">Select Language</option>
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
        <option value="German">German</option>
      </select>

      <button
        onClick={handleConvert}
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Convert
      </button>

      {convertedMessage && (
        <div className="mt-6 bg-gray-100 p-4 rounded border border-gray-300">
          <strong className="block mb-2 text-gray-700">
            Converted Message:
          </strong>
          <p className="text-gray-800 whitespace-pre-line">
            {convertedMessage}
          </p>
        </div>
      )}

      <button
        onClick={handleCopy}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        {copied ? "Copied!" : "Copy Reply"}
      </button>
    </div>
  );
}

export default ConvertForm;
