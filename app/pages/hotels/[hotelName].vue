<script lang="ts" setup>
const { hotelName } = useRoute().params;
const { data: hotel, error } = await useFetch("/api/hotel", {
  query: { slug: hotelName },
});
</script>

<template>
  <div v-if="hotel">
    <!-- Hero -->
    <div class="relative w-full h-[50vh] overflow-hidden">
      <NuxtImg
        :src="hotel.image"
        :alt="hotel.name"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div class="absolute bottom-0 left-0 right-0 p-8">
        <UContainer>
          <div class="flex items-end justify-between gap-4">
            <div>
              <div class="flex items-center gap-1 mb-2">
                <NuxtImg
                  v-for="i in hotel.stars"
                  :key="i"
                  src="/images/logo.png"
                  alt="étoile Michelin"
                  class="size-6 object-contain"
                />
              </div>
              <h1 class="text-4xl font-bold text-white leading-tight">{{ hotel.name }}</h1>
              <p class="text-white/80 mt-1 flex items-center gap-1.5">
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

    <UContainer class="py-10 space-y-10">
      <!-- Description + Infos pratiques -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-4">
          <h2 class="text-2xl font-semibold">À propos</h2>
          <p class="text-muted leading-relaxed">{{ hotel.longDescription }}</p>
        </div>

        <div class="space-y-4">
          <div class="rounded-2xl border border-default bg-elevated p-5 space-y-4">
            <h3 class="font-semibold text-lg">Informations pratiques</h3>

            <div class="flex items-start gap-2 text-sm">
              <UIcon name="lucide:map-pin" class="size-4 shrink-0 mt-0.5 text-muted" />
              <span>{{ hotel.address }}</span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <UIcon name="lucide:phone" class="size-4 shrink-0 text-muted" />
              <a :href="`tel:${hotel.phone}`" class="hover:underline">{{ hotel.phone }}</a>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <UIcon name="lucide:globe" class="size-4 shrink-0 text-muted" />
              <a :href="hotel.website" target="_blank" class="hover:underline truncate">{{
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
              class="w-full justify-center mt-2"
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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(img, idx) in hotel.gallery"
            :key="idx"
            class="aspect-video rounded-2xl overflow-hidden"
          >
            <NuxtImg
              :src="img"
              :alt="`${hotel.name} - photo ${idx + 1}`"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </UContainer>
  </div>

  <div v-else-if="error" class="flex items-center justify-center min-h-[50vh]">
    <div class="text-center space-y-2">
      <p class="text-xl font-semibold">Hôtel introuvable</p>
      <UButton to="/hotels" label="Voir tous les hôtels" variant="ghost" />
    </div>
  </div>
</template>
