import { describe, it, expect } from "@jest/globals";

import { TokenReader } from "./lib/token-reader";

describe("TokenReader", () => {
  // this is the main test case from the assignment instructions.
  it("should read tokens from a tab-delimited file", async () => {
    const reader = new TokenReader("./sample-files/sample.tab");
    expect(await reader.getNextLineTokens()).toEqual([
      "this",
      "is",
      "a",
      "test",
    ]);
    expect(await reader.getNextLineTokens()).toEqual(["red", "green", "blue"]);
    expect(await reader.getNextLineTokens()).toBeNull();
  });

  it("should read a large file without running out of memory", async () => {
    const reader = new TokenReader("./sample-files/sample-large.tab");
    let lineCount = 0;
    while ((await reader.getNextLineTokens()) !== null) {
      lineCount++;
    }
    expect(lineCount).toBe(10000);
  });

  it("should output blank lines as an array of empty string", async () => {
    const reader = new TokenReader("./sample-files/sample-blank-lines.tab");
    expect(await reader.getNextLineTokens()).toEqual([
      "this",
      "is",
      "a",
      "test",
    ]);
    expect(await reader.getNextLineTokens()).toEqual([""]);
    expect(await reader.getNextLineTokens()).toEqual([""]);
    expect(await reader.getNextLineTokens()).toEqual(["red", "green", "blue"]);
  });

  it("should work for non-english characters (emoji)", async () => {
    const reader = new TokenReader("./sample-files/sample-emoji.tab");
    expect(await reader.getNextLineTokens()).toEqual(["💎", "👌", "🎶"]);
    expect(await reader.getNextLineTokens()).toEqual(["❤️", "🤑", "🫨", "🦚"]);
  });

  // this one is a bit tricky and tripped me up initially. see the
  // notes/assumptions section of the readme for more details.
  it("should return an array of empty strings for lines with only tabs", async () => {
    const reader = new TokenReader("./sample-files/sample-only-tabs.tab");
    expect(await reader.getNextLineTokens()).toEqual(["", "", ""]);
    expect(await reader.getNextLineTokens()).toEqual(["", "", "", "", "", ""]);
  });

  it("should return empty strings for consecutive tabs", async () => {
    const reader = new TokenReader("./sample-files/sample-consecutive-tabs.tab");
    expect(await reader.getNextLineTokens()).toEqual([
      "a",
      "",
      "b"
    ]);
  });

  it("should return empty strings for first or last tabs", async () => {
    const reader = new TokenReader("./sample-files/sample-first-or-last-tabs.tab");
    expect(await reader.getNextLineTokens()).toEqual([
      "",
      "first",
      "char",
      "tab"
    ]);
    expect(await reader.getNextLineTokens()).toEqual([
      "last",
      "char",
      "tab",
      ""
    ]);
  });

  it("should throw for files without an extension", async () => {
    expect(async () => {
      const reader = new TokenReader("./sample-files/sample-no-ext");
      await reader.getNextLineTokens();
    }).rejects.toThrow();
  });

  it("should throw for files with an unknown extension", async () => {
    expect(async () => {
      const reader = new TokenReader("./sample-files/sample.unknown");
      await reader.getNextLineTokens();
    }).rejects.toThrow();
  });
});
