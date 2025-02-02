// components/CodeSnippetCard.tsx
type CodeSnippetCardProps = {
  title: string;
  languages: {
    name: string;
    code: string;
  }[];
};

export default function CodeSnippetCard({ title, languages }: CodeSnippetCardProps) {
  return (
    <div class="bg-white shadow-lg rounded-lg overflow-hidden p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4">{title}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {languages.map((language, index) => (
          <div key={index} class="border p-4 rounded-lg">
            <h3 class="font-semibold text-lg text-center mb-2">{language.name}</h3>
            <pre class="bg-gray-100 p-4 rounded-md overflow-auto">
              <code>{language.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
