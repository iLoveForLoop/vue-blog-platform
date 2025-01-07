export const decreasingOrder = data => {
  return data.sort((a, b) => b.created_at.toMillis() - a.created_at.toMillis())
}
