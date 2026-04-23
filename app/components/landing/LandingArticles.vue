<script lang="ts" setup>
const { data: articlesPage } = await useFetch("/api/articles", {
  query: { limit: 3 },
});

const articles = computed(() => articlesPage.value?.data ?? []);

function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
</script>

<template>
  <UPageSection
    v-if="articles.length"
    title="À la une"
    description="Découvrez les dernières chroniques, sélections et tendances de nos experts."
  >
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="article in articles"
        :key="article.objectID"
        :to="article.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-default bg-elevated transition-shadow duration-300 hover:shadow-md"
      >
        <div class="relative aspect-video w-full overflow-hidden">
          <NuxtImg
            v-if="article.image"
            :src="article.image"
            :alt="article.title"
            class="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div v-else class="flex h-full items-center justify-center bg-muted">
            <UIcon name="lucide:newspaper" class="size-10 text-muted" />
          </div>
        </div>

        <div class="flex flex-1 flex-col gap-3 p-4">
          <div class="flex flex-wrap items-center gap-2">
            <UBadge
              v-for="tag in article.tags?.slice(0, 2)"
              :key="tag"
              :label="tag"
              color="neutral"
              variant="subtle"
              size="sm"
            />
          </div>

          <h3 class="line-clamp-2 text-base font-semibold leading-snug">
            {{ article.title }}
          </h3>

          <p class="line-clamp-3 text-sm text-muted">
            {{ article.excerpt }}
          </p>

          <div class="mt-auto flex items-center justify-between border-t border-default pt-3 text-xs text-muted">
            <span>{{ formatDate(article.published_date) }}</span>
            <span class="flex items-center gap-1">
              <UIcon name="lucide:clock" class="size-3" />
              {{ article.reading_time }} min
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div class="mt-10 flex justify-center">
      <UButton
        label="Lire tous nos articles"
        color="neutral"
        variant="ghost"
        trailing-icon="lucide:arrow-right"
      />
    </div>
  </UPageSection>
</template>
