/**
 * Checks if a given path matches a specified template.
 *
 * @param   template - The path template (e.g., '/users/{id}').
 * @param   actual - The actual request path (e.g., '/users/123').
 * @returns `true` if the paths match, otherwise `false`.
 */
export function pathMatch(template: string, actual: string): boolean {
  const tplParts = template.split("/").filter(Boolean);
  const actParts = actual.split("/").filter(Boolean);

  if (tplParts.length !== actParts.length) {
    return false;
  }

  return tplParts.every((part, i) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      return true;
    }
    return part === actParts[i];
  });
}
