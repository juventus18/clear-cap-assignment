import { TokenReader } from "./lib/token-reader";

// when running locally, comment in/out the modes you want to run.
// all test cases have corresponding execution modes
(async () => {
  await main();
  await blankLines();
  await nonEnglishCharacters();
  await readLargeFile();
  await noExtensionFile();
  await unknownExtensionFile();
})();

// the example from the assignment.
async function main() {
  const reader = new TokenReader("./sample-files/sample.tab");

  console.log(await reader.getNextLineTokens());
  console.log(await reader.getNextLineTokens());
  console.log(await reader.getNextLineTokens());
}

async function blankLines() {
  const reader = new TokenReader("./sample-files/blank-lines-sample.tab");
  console.log(await reader.getNextLineTokens());
  console.log(await reader.getNextLineTokens());
  console.log(await reader.getNextLineTokens());
  console.log(await reader.getNextLineTokens());
}

async function nonEnglishCharacters() {
  const reader = new TokenReader("./sample-files/emoji-sample.tab");
  console.log(await reader.getNextLineTokens());
  console.log(await reader.getNextLineTokens());
}

async function readLargeFile() {
  const reader = new TokenReader("./sample-files/larger-sample.tab");
  let lineCount = 0;
  while ((await reader.getNextLineTokens()) !== null) {
    lineCount++;
  }
  console.log(`Total lines read: ${lineCount}`);
}

async function noExtensionFile() {
  try {
    const reader = new TokenReader("./sample-files/sample-no-ext");
    await reader.getNextLineTokens();
  } catch (error) {
    //swallow the actual error and show a simpler message
    console.error("Error reading file without extension");
    console.error(error);
  }
}

async function unknownExtensionFile() {
  try {
    const reader = new TokenReader("./sample-files/sample.unknown");
    await reader.getNextLineTokens();
  } catch (error) {
    //swallow the actual error and show a simpler message
    console.error("Error reading file with unknown extension");
    console.error(error);
  }
}