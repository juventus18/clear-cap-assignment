import * as fs from 'fs';
import * as readline from 'readline';
import { IParser } from './parser.interface';
import { ParserFactory } from './parser-factory';

export class TokenReader {
  private parser: IParser;
  private fileStream: fs.ReadStream;
  private rl: readline.Interface;
  private iterator: AsyncIterator<string>;

  constructor(filePath: string) {
    // use a factory to determine the parse type based on the file extension.
    this.parser = ParserFactory.getParser(filePath);

    // create a read stream and readline interface to read the file line by line
    this.fileStream = fs.createReadStream(filePath, { encoding: 'utf8' });

    this.rl = readline.createInterface({
      input: this.fileStream,
      crlfDelay: Infinity, // handle Win and *nix line endings (\r\n and \n)
    });

    // get the iterator so we can go line by line each time getNextLineTokens()
    // is called
    this.iterator = this.rl[Symbol.asyncIterator]();
  }

  // read the next line from the file and return the parsed tokens.
  async getNextLineTokens(): Promise<string[] | null> {
    try {
      const lineResult = await this.iterator.next();

      // we've' reached the end of the file. return null per the instructions
      if (lineResult.done) {
        this.close();
        return null;
      }

      //parse the actual tokens using the parser from the factory.
      return this.parser.parse(lineResult.value);
    } catch (error) {
      this.close();
      console.error("Error reading file:", error);
      throw error;
    }
  }

  //close the readline interface and file stream to prevent memory leaks
  close(): void {
    this.rl.close();
    this.fileStream.destroy();
  }
}