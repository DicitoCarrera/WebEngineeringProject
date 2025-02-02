// routes/lessons/[lesson].tsx
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import CodeSnippetCard from "../../components/CodeSnippetCard.tsx";
import Layout from "../../components/Layout.tsx";
import { lessons } from "../../data/lessonsData.ts";

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

        {lesson.codeExamples.map((example, index) => (
          <CodeSnippetCard
            key={index}
            title={example.title}
            languages={example.languages}
          />
        ))}
      </div>
    </Layout>

  );
}
