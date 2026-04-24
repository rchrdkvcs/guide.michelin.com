<script lang="ts" setup>
useSeoMeta({
  title: "L'Échappée",
  description:
    "Rejoignez L'Échappée, le programme de fidélité du Guide MICHELIN. Collectionnez des tampons, gagnez des récompenses et explorez les meilleures tables.",
  ogTitle: "L'Échappée · Guide MICHELIN",
  ogDescription:
    "Rejoignez L'Échappée, le programme de fidélité du Guide MICHELIN. Collectionnez des tampons, gagnez des récompenses et explorez les meilleures tables.",
  ogImage: "/images/hero.png",
});
</script>

<template>
  <div>
    <EscapeHero />
    <EscapeSteps />
    <EscapeXp />
    <EscapeStamps />
    <EscapeBattlePass />
    <EscapePlans />
    <EscapePasseport />
    <EscapeCta />
  </div>
</template>
