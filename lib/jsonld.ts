// Serializer for JSON-LD injected via dangerouslySetInnerHTML.
// Escaping "<" prevents a "</script>" sequence inside any schema value from
// terminating the script block early (XSS sink hardening).
export function toJsonLd(schema: object): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
