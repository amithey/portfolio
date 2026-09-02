export type ProjectSearch = { category?: string; tag?: string };

/** Next may pass search param values as string or string[]. */
export function firstSearchParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value || undefined;
}

export function buildProjectsHref(next: ProjectSearch): string {
  const params = new URLSearchParams();
  if (next.category) params.set("category", next.category);
  if (next.tag) params.set("tag", next.tag);
  const qs = params.toString();
  return qs ? `/projects?${qs}` : "/projects";
}