import type { NavigationMenuItem } from "@nuxt/ui";

export function useNavigation() {
  const headerItems = ref<NavigationMenuItem[]>([
    {
      label: "Restaurants",
      to: "/restaurants",
    },
    {
      label: "Hébergements",
      to: "/hotels",
    },
    {
      label: "Aventures",
      to: "/adventures",
    },
    {
      label: "L'échappée",
      to: "/escape",
    },
  ]);

  const menuItems = ref<NavigationMenuItem[]>([
    {
      label: "Accueil",
      to: "/",
    },
    {
      label: "Restaurants",
      to: "/restaurants",
    },
    {
      label: "Hébergements",
      to: "/hotels",
    },
    {
      label: "Aventures",
      to: "/adventures",
    },
    {
      label: "L'échappée",
      to: "/escape",
    },
    {
      label: "Mon compte",
      to: "/compte",
    },
  ]);

  return { headerItems, menuItems };
}
