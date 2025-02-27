"use client"
import React, { useState } from "react";
import { HfInference } from "@huggingface/inference";

const HF_TOKEN = "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"; // Replace with your Hugging Face API token
const inference = new HfInference(HF_TOKEN);

const TaxBenefits = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    setLoading(true);
    try {
      const out = await inference.chatCompletion({
        model: "HuggingFaceH4/zephyr-7b-alpha",
        messages: [{ role: "user", content: input }],
        max_tokens: 512,
      });

      setResponse(out.choices[0]?.message?.content || "No response.");
    } catch (error) {
      setResponse("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">AI Chat - Tax Benefits</h1>

      <textarea
        className="w-2/3 p-3 border rounded-lg"
        placeholder="Ask about tax benefits..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>

      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
        onClick={handleChat}
        disabled={loading}
      >
        {loading ? "Processing..." : "Ask AI"}
      </button>

      {response && (
        <div className="w-2/3 mt-4 p-3 bg-white border rounded-lg">
          <strong>AI Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default TaxBenefits;
