export function getTodosCacheKey(user_id: number): string {
  return `todos:${user_id}`;
}
