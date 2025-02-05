// components/CodeLanguageSelector.tsx
import { useState } from "preact/hooks";

const CodeLanguageSelector = ({
  codeSamples,
}: {
  codeSamples: { language: string; code: string; icon: string }[];
}) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Toggle language selection
  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages((prevSelected) => {
      if (prevSelected.includes(language)) {
        return prevSelected.filter((lang) => lang !== language);
      } else {
        return [...prevSelected, language];
      }
    });
  };

  return (
    <div class="p-6 max-w-4xl mx-auto">
      {/* Language Icons Selector */}
      <div class="flex space-x-6 mb-8 overflow-x-auto">
        {codeSamples.map(({ language, icon }) => (
          <div
            key={language}
            class={`cursor-pointer flex flex-col items-center justify-center ${selectedLanguages.includes(language)
                ? "border-2 border-blue-500 p-2 rounded-md"
                : "opacity-75 hover:opacity-100"
              }`}
            onClick={() => handleLanguageToggle(language)}
          >
            <img src={icon} alt={language} class="w-12 h-12 mb-2" />
            <span className="text-sm capitalize">{language}</span>
          </div>
        ))}
      </div>

      {/* Display Code Samples for Selected Languages */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedLanguages.map((language) => {
          const selectedCode = codeSamples.find(
            (sample) => sample.language === language
          );
          return (
            <div class="p-4 border rounded-lg bg-gray-50 shadow-md" key={language}>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">
                {language.charAt(0).toUpperCase() + language.slice(1)}
              </h3>
              <pre class="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-auto">
                {selectedCode?.code}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CodeLanguageSelector;
