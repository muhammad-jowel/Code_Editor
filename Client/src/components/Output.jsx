import React, { useState } from "react";
import { executeCode } from "../utility/Api";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null); // State for output
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  const [isError, setIsError] = useState(false); // State for error
  const [toastMessage, setToastMessage] = useState(null); // State for toast messages

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue(); // 'editorRef.current' is missing in props
    if (!sourceCode) return;
  
    try {
      setIsLoading(true);
      const result = await executeCode(language, sourceCode); // 'executeCode' is not defined.
      console.log(result);
  
      setOutput(result.run.output.split("\n")); // convert to array
      result.run.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      setToastMessage({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      {/* Run Code Button */}
      <button
        className={`py-2 px-4 mb-4 rounded-md text-white font-medium transition ${
          isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
        }`}
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white inline-block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
            ></path>
          </svg>
        ) : (
          "Run Code"
        )}
      </button>

      {/* Output Display */}
      <div
        className={`h-[75vh] p-4 border rounded-md overflow-y-auto ${
          isError ? "border-red-500 text-red-600" : "border-gray-300 text-gray-900"
        }`}
      >
        {output ? (
          output.map((line, i) => <p key={i}>{line}</p>)
        ) : (
          <p className="text-gray-500">Click "Run Code" to see the output here</p>
        )}
      </div>
    </div>
  );
};

export default Output;
