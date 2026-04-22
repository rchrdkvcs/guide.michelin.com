import { getEventBySlug } from "../../utils/events";

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({ statusCode: 400, message: "Missing slug" });
  }

  const michelinEvent = getEventBySlug(slug);

  if (!michelinEvent) {
    throw createError({ statusCode: 404, message: "Event not found" });
  }

  return michelinEvent;
});
