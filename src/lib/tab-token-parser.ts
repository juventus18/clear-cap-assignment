import { ITokenParser } from "./token-parser.interface";

/**
 * Parses a tab separated line into token array
 *
 * @export
 * @class TabTokenParser
 * @typedef {TabTokenParser}
 * @implements {ITokenParser}
 */
export class TabTokenParser implements ITokenParser {
  /**
   * Parses a tab separated line into token array.
   * Blank lines will be returned as an array with a single empty string.
   * Lines with only tabs will be returned as an array of empty strings, one for each tab.
   *
   * @async
   * @param {string} line
   * @returns {Promise<string[] | null>}
   */
  async parse(line: string): Promise<string[] | null> {
    return line.split("\t");
  }
}
