<script lang="ts" setup>
const { hotelName } = useRoute().params;
const { data: hotel, error } = await useFetch("/api/hotel", {
  query: { slug: hotelName },
});
</script>

<template>
  <div v-if="hotel">
    <!-- Hero -->
    <div class="relative h-[50vh] w-full overflow-hidden">
      <NuxtImg
        :src="hotel.image"
        :alt="hotel.name"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div class="absolute right-0 bottom-0 left-0 p-8">
        <UContainer>
          <div class="flex items-end justify-between gap-4">
            <div>
              <div class="mb-2 flex items-center gap-1">
                <NuxtImg
                  v-for="i in hotel.stars"
                  :key="i"
                  src="/images/logo.png"
                  alt="étoile Michelin"
                  class="size-6 object-contain"
                />
              </div>
              <h1 class="text-4xl leading-tight font-bold text-white">{{ hotel.name }}</h1>
              <p class="mt-1 flex items-center gap-1.5 text-white/80">
                <UIcon name="lucide:map-pin" class="size-4" />
                {{ hotel.city }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <UBadge
                v-for="tag in hotel.tags"
                :key="tag"
                :label="tag"
                color="neutral"
                variant="solid"
                size="md"
              />
            </div>
          </div>
        </UContainer>
      </div>
    </div>

    <UContainer class="space-y-10 py-10">
      <!-- Description + Infos pratiques -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="space-y-4 lg:col-span-2">
          <h2 class="text-2xl font-semibold">À propos</h2>
          <p class="leading-relaxed text-muted">{{ hotel.longDescription }}</p>
        </div>

        <div class="space-y-4">
          <div class="space-y-4 rounded-2xl border border-default bg-elevated p-5">
            <h3 class="text-lg font-semibold">Informations pratiques</h3>

            <div class="flex items-start gap-2 text-sm">
              <UIcon name="lucide:map-pin" class="mt-0.5 size-4 shrink-0 text-muted" />
              <span>{{ hotel.address }}</span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <UIcon name="lucide:phone" class="size-4 shrink-0 text-muted" />
              <a :href="`tel:${hotel.phone}`" class="hover:underline">{{ hotel.phone }}</a>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <UIcon name="lucide:globe" class="size-4 shrink-0 text-muted" />
              <a :href="hotel.website" target="_blank" class="truncate hover:underline">{{
                hotel.website
              }}</a>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <UIcon name="lucide:euro" class="size-4 shrink-0 text-muted" />
              <span>{{ hotel.priceRange }}</span>
            </div>

            <UButton
              label="Réserver"
              icon="lucide:calendar"
              color="primary"
              class="mt-2 w-full justify-center"
              :to="hotel.website"
              target="_blank"
            />
          </div>
        </div>
      </div>

      <!-- Équipements -->
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Équipements & Services</h2>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="amenity in hotel.amenities"
            :key="amenity"
            :label="amenity"
            color="neutral"
            variant="subtle"
            size="lg"
          />
        </div>
      </div>

      <!-- Galerie -->
      <div class="space-y-4" v-if="hotel.gallery?.length">
        <h2 class="text-2xl font-semibold">Galerie</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(img, idx) in hotel.gallery"
            :key="idx"
            class="aspect-video overflow-hidden rounded-2xl"
          >
            <NuxtImg
              :src="img"
              :alt="`${hotel.name} - photo ${idx + 1}`"
              class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </UContainer>
  </div>

  <div v-else-if="error" class="flex min-h-[50vh] items-center justify-center">
    <div class="space-y-2 text-center">
      <p class="text-xl font-semibold">Hôtel introuvable</p>
      <UButton to="/hotels" label="Voir tous les hôtels" variant="ghost" />
    </div>
  </div>
</template>
