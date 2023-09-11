import courseData from "./courseData";

type Lesson = {
  title: string;
  slug: string;
  number: number;
  downloadUrl: string;
  videoId: number;
  text: string;
  sourceUrl?: string;
};

export const useCourse = () => {
  return {
    ...courseData,
    chapters: courseData.chapters.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map((lesson) => ({
        ...lesson,
        path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
      })),
    })),
  };
}
