// components/LessonCard.tsx

type LessonCardProps = {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
};

export default function LessonCard({ title, description, link, imageUrl }: LessonCardProps) {
  return (
    <div class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
      <img class="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div class="p-6">
        <h2 class="text-2xl font-semibold text-gray-800">{title}</h2>
        <p class="text-gray-600 mt-2">{description}</p>
        <a href={link} class="mt-4 inline-block text-blue-500 hover:underline">
          Start Lesson
        </a>
      </div>
    </div>
  );
}
