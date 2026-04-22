<script lang="ts" setup>
const route = useRoute();
const hotelId = route.params.id as string;

const { data: hotel, error } = await useFetch(`/api/hotels/${hotelId}`);

if (error.value) {
  throw createError({ statusCode: 404, message: "Hôtel introuvable" });
}

const heroImage = computed(() => hotel.value?.rooms?.[0]?.room?.images?.[0] ?? null);
</script>

<template>
  <div v-if="hotel">
    <!-- Hero -->
    <div class="relative h-[50vh] w-full overflow-hidden">
      <NuxtImg
        v-if="heroImage"
        :src="heroImage"
        :alt="hotel.name"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div
        v-else
        class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200"
      >
        <UIcon name="lucide:building" class="size-24 text-neutral-400" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div class="absolute right-0 bottom-0 left-0 p-8">
        <UContainer>
          <h1 class="text-4xl leading-tight font-bold text-white">{{ hotel.name }}</h1>
          <p class="mt-2 text-white/80">
            {{ hotel.roomCount }} chambre{{ hotel.roomCount > 1 ? "s" : "" }}
          </p>
        </UContainer>
      </div>
    </div>

    <UContainer class="space-y-12 py-12">
      <!-- Rooms grid -->
      <div>
        <h2 class="mb-6 text-2xl font-semibold">Nos chambres</h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(roomEntry, idx) in hotel.rooms"
            :key="idx"
            class="overflow-hidden rounded-2xl border border-default bg-elevated"
          >
            <!-- Room image carousel (first image) -->
            <div class="relative aspect-video overflow-hidden">
              <NuxtImg
                v-if="roomEntry.room?.images?.[0]"
                :src="roomEntry.room.images[0]"
                :alt="roomEntry.room.room_title ?? 'Chambre'"
                class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div
                v-else
                class="flex h-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200"
              >
                <UIcon name="lucide:bed" class="size-12 text-neutral-400" />
              </div>
              <UBadge
                v-if="roomEntry.room?.images?.length > 1"
                :label="`+${roomEntry.room.images.length - 1} photos`"
                color="neutral"
                variant="solid"
                class="absolute right-2 bottom-2"
              />
            </div>

            <div class="space-y-3 p-4">
              <h3 class="font-semibold leading-tight">
                {{ roomEntry.room?.room_title ?? `Chambre ${idx + 1}` }}
              </h3>

              <p
                v-if="roomEntry.room?.room_description"
                class="line-clamp-3 text-sm leading-relaxed text-muted"
              >
                {{ roomEntry.room.room_description }}
              </p>

              <!-- Occupancy & bedding -->
              <div class="flex flex-wrap gap-2 text-xs text-muted">
                <span v-if="roomEntry.room?.total_guest_occupancy" class="flex items-center gap-1">
                  <UIcon name="lucide:users" class="size-3" />
                  {{ roomEntry.room.total_guest_occupancy }} pers.
                </span>
                <span v-if="roomEntry.room?.bedding_list?.[0]" class="flex items-center gap-1">
                  <UIcon name="lucide:bed" class="size-3" />
                  {{ roomEntry.room.bedding_list[0] }}
                </span>
              </div>

              <!-- Amenities -->
              <div
                v-if="roomEntry.room?.amenities?.length"
                class="flex flex-wrap gap-1"
              >
                <UBadge
                  v-for="amenity in roomEntry.room.amenities.slice(0, 4)"
                  :key="amenity.id"
                  :label="amenity.amenity"
                  color="neutral"
                  variant="subtle"
                  size="sm"
                />
                <UBadge
                  v-if="roomEntry.room.amenities.length > 4"
                  :label="`+${roomEntry.room.amenities.length - 4}`"
                  color="neutral"
                  variant="subtle"
                  size="sm"
                />
              </div>
            </div>
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