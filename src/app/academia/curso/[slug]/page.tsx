import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { MOCK_COURSES } from "@/data/mockData";
import { CoursePlayer } from "@/components/course/CoursePlayer";

export function generateStaticParams() {
  return MOCK_COURSES.map((course) => ({
    slug: course.slug,
  }));
}

export default async function CoursePlayerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = MOCK_COURSES.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
          <p className="text-zinc-400 text-sm">Cargando reproductor de lecciones...</p>
        </div>
      }
    >
      <CoursePlayer course={course} />
    </Suspense>
  );
}
