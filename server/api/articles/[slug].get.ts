import { getArticleBySlug } from "../../utils/articles";

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({ statusCode: 400, message: "Missing slug" });
  }

  const article = getArticleBySlug(slug);

  if (!article) {
    throw createError({ statusCode: 404, message: "Article not found" });
  }

  return article;
});
