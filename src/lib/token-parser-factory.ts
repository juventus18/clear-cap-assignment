import { ITokenParser } from "./token-parser.interface";
import { TabTokenParser } from "./tab-token-parser";
import * as path from "path";

/**
 * Returns a parser for a given file by extension type
 *
 * @export
 * @class TokenParserFactory
 * @typedef {TokenParserFactory}
 */
export class TokenParserFactory {
  /**
   * Returns a parser for a given file by extension type
   *
   * @static
   * @param {string} filePath The relative path for the file to load
   * @returns {ITokenParser} The parser instance for the given file
   * @throws {Error} If the file extension is not supported or invalid
   */
  static getParser(filePath: string): ITokenParser {
    let basename = path.basename(filePath);
    let ext = path.extname(basename);

    if (!ext) {
      throw new Error("Invalid filetype.");
    }

    switch (ext) {
      case ".tab":
        return new TabTokenParser();
      // we can create other parser types and add them here
      // case '.csv':
      //   return new CsvParser();
      // ...
      // if the extension is not supported, or the file does not have an extension,
      // throw an error
      default:
        throw new Error(`Unknown file extension: ${ext}`);
    }
  }
}
