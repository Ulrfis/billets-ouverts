export type NotionProperty = { type: string; [key: string]: unknown };

export function allowsContributorCredit(properties: Record<string, NotionProperty>): boolean {
  return properties["Consentement crédits"]?.["checkbox"] === true;
}

export function coverUrl(property: NotionProperty | undefined): string {
  if (!property) return "";
  let url = "";
  if (property.type === "url") url = typeof property["url"] === "string" ? property["url"] : "";
  if (property.type === "files") {
    const files = property["files"] as { file?: { url?: string }; external?: { url?: string } }[] | undefined;
    url = files?.[0]?.external?.url ?? files?.[0]?.file?.url ?? "";
  }
  return url.startsWith("https://") ? url : "";
}