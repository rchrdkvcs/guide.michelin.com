<script lang="ts" setup>
const { menuItems } = useNavigation();
const route = useRoute();
const emit = defineEmits<{ close: [] }>();
const open = ref(true);

watch(
  () => route.fullPath,
  () => emit("close"),
);

watch(open, (value) => {
  if (!value) emit("close");
});
</script>

<template>
  <USlideover side="left" v-model:open="open">
    <template #title>
      <div class="flex items-center justify-center gap-2">
        <NuxtImg src="/images/logo.png" class="size-6" />
        <NuxtImg src="/images/logo_horizontal.png" class="h-3" />
      </div>
    </template>

    <template #body>
      <UNavigationMenu
        :ui="{
          link: 'text-lg font-medium text-elevated hover:text-primary hover:translate-x-1 transition-transform duration-300',
        }"
        orientation="vertical"
        :items="menuItems"
        variant="link"
      />
    </template>

    <template #footer>
      <div class="grid w-full grid-cols-2 items-center justify-center gap-4">
        <UButton label="Se connecter" color="primary" variant="solid" block />
        <UButton label="S'inscrire" color="primary" variant="outline" block />
      </div>
    </template>
  </USlideover>
</template>
