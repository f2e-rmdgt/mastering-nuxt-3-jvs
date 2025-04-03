<template>
  <div>
    <div class="prose mb-12">
      <h1>
        <span class="font-medium">
          Course:
          <span class="font-bold">Mastering Nuxt 3</span>
        </span>
      </h1>
    </div>

    <div class="flex flex-row justify-center flex-grow">
      <div
        class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col"
      >
        <h3>Chapters</h3>
        <div
          class="space-y-1 mb-4 flex flex-col"
          v-for="chapter in chapters"
          :key="chapter.slug"
        >
          <h4>{{ chapter.title }}</h4>
          <NuxtLink
            v-for="(lesson, index) in chapter.lessons"
            :key="lesson.slug"
            class="flex flex-row space-x-1 no-underline prose-sm font-normal py-1 px-4 -mx-4"
            :to="lesson.path"
            :class="{
              'text-blue-500':
                lesson.path === $route.fullPath,
              'text-gray-600':
                lesson.path !== $route.fullPath,
            }"
          >
            <span class="text-gray-500"
              >{{ index + 1 }}.</span
            >
            <span>{{ lesson.title }}</span>
          </NuxtLink>
        </div>
      </div>

      <div class="prose p-12 bg-white rounded-md w-[65ch]">
        <NuxtErrorBoundary>
          <NuxtPage />
          <template #error="{ error }">
            <p>
              Oh no, something went wrong with the lesson!
              <code>{{ error }}</code>
            </p>
            <p>
              <button
                class="hover:cursor-pointer bg-gray-500 text-white font-bold py-1 px-3 rounded"
                @click="resetError(error)"
              >
                Reset
              </button>
            </p>
          </template>
        </NuxtErrorBoundary>
      </div>
    </div>
  </div>
</template>

<script setup>
const { chapters } = useCourse();

definePageMeta({
  middleware: [
    // Redirect to the first chapter/lesson if the path is just '/course'
    function({ path }) {

      if (path === '/course') {
        const { chapters } = useCourse();
        const firstChapter = chapters[0];
        const firstLesson = firstChapter.lessons[0];

        return navigateTo(
          `/course/chapter/${firstChapter.slug}/lesson/${firstLesson.slug}`
        );

      }
    },
  ],
});

const resetError = async (error) => {
// if the following execution order is reversed,
// Setting `error.value = null` tells the NuxtErrorBoundary to try rendering its child component again immediately
// Since you haven't navigated away yet, the exact same component with the same state/props would be rendered
// The same error would occur again instantly
// Only then would the navigation attempt happen, but it's too late - the error has already re-triggered
  
  await navigateTo(
    '/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3'
  );
  error.value = null;
};
</script>
