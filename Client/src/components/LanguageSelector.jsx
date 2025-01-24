import { useState } from "react";
import { LANGUAGE_VERSIONS } from "../utility/Constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (lang) => {
    onSelect(lang);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="">
      <div className="mb-4">
        <div className="relative inline-block">
          <div className="flex">
            <button
              className="bg-gray-800 text-white py-2 px-4 rounded-l-md hover:bg-gray-700"
              onClick={toggleDropdown}
            >
              {language}
            </button>
            <button
              className="bg-gray-800 text-white py-2 px-2 rounded-r-md hover:bg-gray-700"
              onClick={toggleDropdown}
              aria-expanded={isOpen}
              aria-label="Toggle dropdown"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          {/* Dropdown Menu */}
          {isOpen && (
            <ul className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto z-10">
              {languages.map(([lang, version]) => (
                <li
                  key={lang}
                  className={`flex justify-between items-center px-4 py-2 text-sm cursor-pointer ${
                    lang === language
                      ? "bg-gray-100 font-medium"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleSelect(lang)}
                >
                  <span>{lang}</span>
                  <span className="text-gray-500 text-xs">({version})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
