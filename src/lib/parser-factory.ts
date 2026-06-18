import { IParser } from "./parser.interface";
import { TabParser } from "./tab-parser";
import * as path from 'path';

export class ParserFactory {
  static getParser(filePath: string): IParser {
    let basename = path.basename(filePath);
    let ext = path.extname(basename)

    if (!ext) {
      throw new Error("Invalid filetype.")
    }

    switch (ext) {
      case '.tab':
        return new TabParser();
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