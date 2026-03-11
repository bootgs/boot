export class PathMatcher {
  /**
   * Checks if a given path matches a specified template.
   *
   * @param   {string} template - The path template (e.g., '/users/{id}').
   * @param   {string} actual - The actual request path (e.g., '/users/123').
   * @returns {boolean} `true` if the paths match, otherwise `false`.
   */
  public match(template: string, actual: string): boolean {
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

  /**
   * Extracts path parameters from an actual URL based on a given template.
   *
   * @param   {string} template - The path template, e.g., "/users/{id}/posts/{postId}".
   * @param   {string} actual - The actual path, e.g., "/users/123/posts/456".
   * @returns {Record<string, string>} An object containing the extracted path parameters.
   */
  public extractParams(template: string, actual: string): Record<string, string> {
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
}
