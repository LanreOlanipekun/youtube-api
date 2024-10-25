import { ErrorInterface } from './IError';
import { ErrorHandler } from './ErrorHandler';

export class YoutubeErrorHandler extends ErrorHandler {
  constructor(err: ErrorInterface) {
    super(err);
  }
}
