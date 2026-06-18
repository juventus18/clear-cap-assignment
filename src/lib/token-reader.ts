import * as fs from "fs";
import * as readline from "readline";
import { ITokenParser } from "./token-parser.interface";
import { TokenParserFactory } from "./token-parser-factory";

/**
 * The token reader loads a file and iterates line-by-line (memory safe)
 * to extract tokens
 *
 * @export
 * @class TokenReader
 * @typedef {TokenReader}
 */
export class TokenReader {
  private parser: ITokenParser;
  private fileStream: fs.ReadStream;
  private rl: readline.Interface;
  private iterator: AsyncIterator<string>;

  /**
   * Creates an instance of TokenReader.
   *
   * @constructor
   * @param {string} filePath The relative path for the file to load
   */
  constructor(filePath: string) {
    // use a factory to determine the parse type based on the file extension.
    this.parser = TokenParserFactory.getParser(filePath);

    // create a read stream and readline interface to read the file line by line
    //reads in chunks, memory safe
    this.fileStream = fs.createReadStream(filePath, { encoding: "utf8" });

    this.rl = readline.createInterface({
      input: this.fileStream,
      crlfDelay: Infinity, // handle Win and *nix line endings (\r\n and \n)
    });

    // get the iterator so we can go line by line each time getNextLineTokens()
    // is called
    this.iterator = this.rl[Symbol.asyncIterator]();
  }

  /**
   * Returns an array of tokens from the next line of the currently loaded file
   *
   * @async
   * @returns {Promise<string[] | null>}
   */
  async getNextLineTokens(): Promise<string[] | null> {
    try {
      // get the next line from the iterator.
      const lineResult = await this.iterator.next();

      // we've reached the end of the file. return null per the instructions
      if (lineResult.done) {
        this.close();
        return null;
      }

      //parse the actual tokens using the parser from the factory.
      return this.parser.parse(lineResult.value);
    } catch (error) {
      this.close();
      throw error;
    }
  }

  //close the readline interface and file stream to prevent memory leaks
  close(): void {
    this.rl.close();
    this.fileStream.destroy();
  }
}
