import { TokenReader } from "./lib/token-reader";

// USAGE EXAMPLES:

// when running locally, comment in/out the modes you want to run.
// all test cases have corresponding execution modes

// methods that throw will swallow the original error message and display a
// simplified message
(async () => {
  await main();
  await readLargeFile();
  await blankLines();
  await nonEnglishCharacters();
  await onlyTabs();
  await consecutiveTabs();
  await firstOrLastTabs();
  await noExtensionFile();
  await unknownExtensionFile();
})();

// the example from the assignment.
async function main() {
  console.log("===main() output===");

  const reader = new TokenReader("./sample-files/sample.tab");

  console.log(await reader.getNextLineTokens());
  console.log(await reader.getNextLineTokens());
  console.log(await reader.getNextLineTokens());
}

async function readLargeFile() {
  console.log("===readLargeFile() output===");

  const reader = new TokenReader("./sample-files/sample-large.tab");

  let lineCount = 0;
  while ((await reader.getNextLineTokens()) !== null) {
    lineCount++;
  }

  console.log(`Total lines read: ${lineCount}`);
}

async function blankLines() {
  console.log("===blankLines() output===");

  const reader = new TokenReader("./sample-files/sample-blank-lines.tab");

  console.log(await reader.getNextLineTokens());
  console.log(await reader.getNextLineTokens());
  console.log(await reader.getNextLineTokens());
  console.log(await reader.getNextLineTokens());
}

async function nonEnglishCharacters() {
  console.log("===nonEnglishCharacters() output===");

  const reader = new TokenReader("./sample-files/sample-emoji.tab");

  console.log(await reader.getNextLineTokens());
  console.log(await reader.getNextLineTokens());
}

async function onlyTabs() {
  console.log("===onlyTabs() output===");

  const reader = new TokenReader("./sample-files/sample-only-tabs.tab");

  console.log(await reader.getNextLineTokens());
  console.log(await reader.getNextLineTokens());
}

async function consecutiveTabs() {
  console.log("===consecutiveTabs() output===");

  const reader = new TokenReader("./sample-files/sample-consecutive-tabs.tab");

  console.log(await reader.getNextLineTokens());
}

async function firstOrLastTabs() {
  console.log("===firstOrLastTabs() output===");

  const reader = new TokenReader("./sample-files/sample-first-or-last-tabs.tab");

  console.log(await reader.getNextLineTokens());
  console.log(await reader.getNextLineTokens());
}

async function noExtensionFile() {
  console.log("===noExtensionFile() output===");

  try {
    const reader = new TokenReader("./sample-files/sample-no-ext");

    await reader.getNextLineTokens();
  } catch (error) {
    //swallow the actual error and show a simpler message
    console.error("Error reading file without extension");
    // uncomment this if you want to see the actual error
    // console.error(error);
  }
}

async function unknownExtensionFile() {
  console.log("===unknownExtensionFile() output===");

  try {
    const reader = new TokenReader("./sample-files/sample.unknown");

    await reader.getNextLineTokens();
  } catch (error) {
    //swallow the actual error and show a simpler message
    console.error("Error reading file with unknown extension");
    // uncomment this if you want to see the actual error
    // console.error(error);
  }
}
