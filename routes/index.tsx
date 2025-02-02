// pages/index.tsx
import Layout from "../components/Layout.tsx";
import LessonCard from "../components/LessonCard.tsx";

export default function Home() {
  return (
    <Layout isLoggedIn={false} >
      <div class="container mx-auto p-8">
        <h1 class="text-4xl font-bold text-center mb-8">
          Learn Programming Principles
        </h1>
        <p class="text-lg text-center mb-12">
          Explore core programming concepts like variables, data types, functions,
          and more, through interactive lessons in multiple languages.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Lesson Cards */}
          <LessonCard
            title="Variables and Data Types"
            description="Learn how variables and data types are fundamental in every language."
            link="/lessons/variables"
            imageUrl="https://via.placeholder.com/400x200"
          />

          <LessonCard
            title="Control Flow"
            description="Understand how control structures like loops and conditionals work across languages."
            link="/lessons/control-flow"
            imageUrl="https://via.placeholder.com/400x200"
          />

          <LessonCard
            title="Functions"
            description="Learn about the building blocks of reusable code—functions and methods."
            link="/lessons/functions"
            imageUrl="https://via.placeholder.com/400x200"
          />
        </div>
      </div>
</Layout>
  );
}
