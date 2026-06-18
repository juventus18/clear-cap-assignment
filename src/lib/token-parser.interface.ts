/**
 *
 *
 * @export
 * @interface ITokenParser
 * @typedef {ITokenParser}
 */
export interface ITokenParser {
  parse(line: string): Promise<string[] | null>;
}
