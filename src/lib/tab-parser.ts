import { IParser } from './parser.interface';

export class TabParser implements IParser {
  constructor() {}

  async parse(line: string): Promise<string[] | null> {
    const tokens = line.split("\t");
    return tokens;
  }
}