import { describe, expect, it } from "vitest";
import { classifyHref, hostOf } from "../src/lib/url";

describe("classifyHref", () => {
  it.each([
    ["/ecosystem", "internal"],
    ["/privacy#cookies", "internal"],
    ["#swc-vision", "internal"],
    ["https://talentexcel.com", "external"],
    ["https://www.sevapremi.com/en/charter?x=1", "external"],
    ["mailto:info@example.com", "mailto"],
    ["mailto:info@example.com?subject=Hello", "mailto"],
    ["tel:+919876543210", "tel"],
    ["tel:+91-98765-43210", "tel"],
  ])("accepts %s as %s", (href, kind) => {
    expect(classifyHref(href)).toBe(kind);
  });

  it.each([
    "javascript:alert(1)",
    "JavaScript:alert(1)",
    " javascript:alert(1)",
    "java\tscript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:msgbox(1)",
    "http://talentexcel.com",
    "//evil.example",
    "/\\evil.example",
    "https://user:pass@example.com",
    "ftp://example.com",
    "ecosystem",
    "mailto:",
    "mailto:not-an-email",
    "tel:call-me",
    "tel:+91 98765 43210",
    "",
    "https://exa mple.com",
  ])("rejects %j", (href) => {
    expect(classifyHref(href)).toBeNull();
  });

  it("rejects non-string input", () => {
    expect(classifyHref(undefined as unknown as string)).toBeNull();
  });
});

describe("hostOf", () => {
  it("normalises case and strips www.", () => {
    expect(hostOf("https://WWW.SevaPremi.com/x")).toBe("sevapremi.com");
  });

  it("returns null for non-https links", () => {
    expect(hostOf("/ecosystem")).toBeNull();
    expect(hostOf("http://sevapremi.com")).toBeNull();
  });
});
