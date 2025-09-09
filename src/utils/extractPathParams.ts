/**
 * Extracts path parameters from an actual URL based on a given template.
 *
 * @param   template - The path template, e.g., "/users/{id}/posts/{postId}".
 * @param   actual - The actual path, e.g., "/users/123/posts/456".
 * @returns An object containing the extracted path parameters.
 * For example, for the above inputs, it might return `{ id: "123", postId: "456" }`.
 */
export function extractPathParams(
  template: string,
  actual: string
): Record<string, string> {
  const tplParts = template.split("/").filter(Boolean);
  const actParts = actual.split("/").filter(Boolean);
  const params: Record<string, string> = {};

  tplParts.forEach((part, i) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      const paramName = part.slice(1, -1);
      params[paramName] = actParts[i];
    }
  });

  return params;
}
