import { describe, it, expect } from "@jest/globals";

import { TokenReader } from "./lib/token-reader";

describe("TokenReader", () => {
  // this is the main test case from the assignment instructions.
  it("should read tokens from a tab-delimited file", async () => {
    const reader = new TokenReader("./sample-files/sample.tab");
    expect(await reader.getNextLineTokens()).toEqual(["this", "is", "a", "test"]);
    expect(await reader.getNextLineTokens()).toEqual(["red", "green", "blue"]);
    expect(await reader.getNextLineTokens()).toBeNull();
  });

  it("should read a large file without running out of memory", async () => {
    const reader = new TokenReader("./sample-files/larger-sample.tab");
    let lineCount = 0;
    while ((await reader.getNextLineTokens()) !== null) {
      lineCount++;
    }
    expect(lineCount).toBe(10000);
  });

  it("should output blank lines as an array of empty string", async () => {
    const reader = new TokenReader("./sample-files/blank-lines-sample.tab");
    expect(await reader.getNextLineTokens()).toEqual(["this", "is", "a", "test"]);
    expect(await reader.getNextLineTokens()).toEqual([""]);
    expect(await reader.getNextLineTokens()).toEqual([""]);
    expect(await reader.getNextLineTokens()).toEqual(["red", "green", "blue"]);
  });

  it("should work for non-english characters (emoji)", async () => {
    const reader = new TokenReader("./sample-files/emoji-sample.tab");
    expect(await reader.getNextLineTokens()).toEqual(["💎", "👌", "🎶"]);
    expect(await reader.getNextLineTokens()).toEqual(["❤️", "🤑", "🫨", "🦚"]);
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