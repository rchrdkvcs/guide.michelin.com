import { useWindowScroll } from "@vueuse/core";

export function useHeroScroll(scrollDistance = 300) {
  const { y } = useWindowScroll();

  const scrollProgress = computed(() => Math.min(y.value / scrollDistance, 1));

  const heroStyle = computed(() => {
    const scale = 1 - scrollProgress.value * 0.05;
    const radius = scrollProgress.value * 20;
    return {
      transform: `scale(${scale})`,
      borderRadius: `${radius}px`,
    };
  });

  return { scrollProgress, heroStyle };
}
