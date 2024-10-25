import { IPagination } from './../../utils/queries/interface/index';

export enum ResponseTypeEnum {
  SUCCESS = 'success',
  FAILED = 'failed',
}

export class SuccessResponseObject<T> {
  status?: ResponseTypeEnum;
  data: T;
  message?: string;

  constructor(
    data: T,
    message?: string,
    status: ResponseTypeEnum = ResponseTypeEnum.SUCCESS
  ) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}
