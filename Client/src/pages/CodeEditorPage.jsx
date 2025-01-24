import React, { useRef, useState } from "react";
import LanguageSelector from "../components/LanguageSelector";
import { CODE_SNIPPETS } from "../utility/Constants";
import Editor from "@monaco-editor/react";
import Output from "../components/Output";

const CodeEditorPage = () => {
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState("");
  const editorRef = useRef();

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Language Selector + Editor Setup */}
        <div className="md:col-span-2 space-y-6">
          {/* Language Selector */}
          <div className="p-4 border rounded-md shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-2">Select Language: </h2>
            <LanguageSelector language={language} onSelect={onSelect} />
            <div className="rounded-lg"> 
              <Editor
                options={{
                  minimap: {
                    enabled: false,
                  },
                }}
                height="75vh"
                theme="vs-dark"
                language={language}
                defaultValue={CODE_SNIPPETS[language]}
                onMount={onMount}
                value={value}
                onChange={(value) => setValue(value)}
              />
            </div>
          </div>
        </div>

        {/* Right Side: Output Setup */}
        <div>
          <div className="p-4 border rounded-md shadow-sm bg-white h-full">
            <h2 className="text-lg font-semibold mb-2">Output</h2>
            <Output editorRef={editorRef} language={language} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPage;
