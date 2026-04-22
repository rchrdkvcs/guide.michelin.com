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
      label: "Guide MICHELIN Plus",
      to: "#",
    },
    {
      label: "Aventures",
      to: "/adventures",
    },
    {
      label: "Guides de voyage",
      to: "/#",
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
