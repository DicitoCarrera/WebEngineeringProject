// routes/lessons/[lesson].tsx
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import Layout from "../../components/Layout.tsx";
import { lessons } from "../../data/lessonsData.ts";
import CodeLanguageSelector from "../../islands/CodeLanguageSelector.tsx";

export default function LessonPage({ params }: PageProps) {
  const lesson = lessons[params.lesson];

  if (!lesson) {
    return (
      <main>
        <p>Lesson not found</p>
      </main>
    );
  }

  return (
    <Layout isLoggedIn={true}>
      <Head>
        <title>{lesson.title}</title>
      </Head>
      <div class="container mx-auto p-8">
        <h1 class="text-4xl font-bold mb-8">{lesson.title}</h1>
        <p class="text-lg mb-6">{lesson.description}</p>
        <p class="text-lg mb-6">{lesson.explanation}</p>

        {/* Render each code example dynamically */}
        {lesson.codeExamples.map((example, index) => (
          <div key={index} class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">{example.title}</h2>
            <CodeLanguageSelector
              codeSamples={example.languages.map((lang) => ({
                language: lang.name.toLowerCase(),
                code: lang.code,
                icon: lang.icon, // Using the icon from data
              }))}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
}
