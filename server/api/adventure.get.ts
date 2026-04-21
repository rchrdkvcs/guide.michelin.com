
export default defineCachedEventHandler((event) => {
  const query = getQuery(event)
  const id = (query.id as string) || 'bretagne'

  // Using the adventures object from server/utils/adventures.ts (auto-imported by Nuxt/Nitro)
  const adventure = adventures[id] || adventures['bretagne']

  return adventure
}, {
  maxAge: 60 * 60, // Cache for 1 hour
  name: 'adventure-data',
  getKey: (event) => {
    const query = getQuery(event)
    return query.id || 'bretagne'
  }
})
