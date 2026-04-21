import type { NavigationMenuItem } from "@nuxt/ui";

export function useNavigation() {
  const headerItems = ref<NavigationMenuItem[]>([
    {
      label: "Restaurants",
      to: "#",
    },
    {
      label: "Hébergements",
      to: "#",
    },
    {
      label: "Guides de voyage",
      to: "#",
    },
    {
      label: "Magazine",
      to: "#",
    },
  ]);

  const menuItems = ref<NavigationMenuItem[]>([
    {
      label: "Accueil",
      to: "/",
    },
    {
      label: "Restaurants",
      to: "#",
    },
    {
      label: "Hébergements",
      to: "#",
    },
    {
      label: "Guide MICHELIN Plus",
      to: "#",
    },
    {
      label: "Guides de voyage",
      to: "#",
    },
    {
      label: "Guides Best-of",
      to: "#",
    },
    {
      label: "Magazine",
      to: "#",
    },
    {
      label: "Nous contacter",
      to: "#",
    },
    {
      label: "S'inscrire à la newsletter",
      to: "#",
    },
    {
      label: "Partenariat privilégié TheFork",
      to: "#",
    },
    {
      label: "Restaurants partenaires TheFork",
      to: "#",
    },
  ]);

  return { headerItems, menuItems };
}
