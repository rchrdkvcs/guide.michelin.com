import { getRestaurants } from "../../utils/restaurants";

export default defineEventHandler(() => {
  const restaurants = getRestaurants();

  const oneStarCount = restaurants.filter((r) => r.michelin_star === "ONE").length;
  const twoStarCount = restaurants.filter((r) => r.michelin_star === "TWO").length;
  const threeStarCount = restaurants.filter((r) => r.michelin_star === "THREE").length;
  const bibGourmandCount = restaurants.filter(
    (r) => r.distinction?.slug === "bib-gourmand",
  ).length;
  const countriesCount = new Set(
    restaurants.map((r) => r.country?.slug).filter(Boolean),
  ).size;

  return {
    total: restaurants.length,
    oneStarCount,
    twoStarCount,
    threeStarCount,
    bibGourmandCount,
    countriesCount,
  };
});
