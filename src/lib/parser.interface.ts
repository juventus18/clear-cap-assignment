export interface IParser {
  parse(line: string): Promise<string[] | null>
}