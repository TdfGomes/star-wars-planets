export function getHref(url: string) {
  const { pathname } = new URL(url);

  return pathname.split("/api").join("");
}
