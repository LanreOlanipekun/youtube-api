import config from '../../config';

import { LoggerDecorator, LoggerInterface } from '../logger';
import { ErrorHandler, CommonErrorHandler } from '../exceptions';
import got from 'got';

type GotRequestOptionsType = got.GotBodyOptions<string>;

export type HttpResponseType<T = any> = Promise<T>;

export class Http {
  @LoggerDecorator('Http')
  private log: LoggerInterface;
  public readonly got: got.GotInstance<got.GotBodyFn<string>>;

  private createDefaultException(
    url: string,
    err: Record<string, number | string | any>,
    request: GotRequestOptionsType = {},
    service: string,
    method: string = ''
  ): ErrorHandler {
    if (
      Number.isNaN(err.statusCode) ||
      !err.body ||
      !err.statusMessage ||
      typeof err.statusMessage !== 'string'
    ) {
      return new CommonErrorHandler(CommonErrorHandler.Fatal);
    }

    let code: string = CommonErrorHandler.Fatal.code;
    let message: string = CommonErrorHandler.Fatal.message;

    code = err.statusMessage.replace(/\s/g, '_').toUpperCase();
    let errObject: { [key: string]: any } = {};
    if (typeof err.body === 'string') {
      try {
        errObject = JSON.parse(err.body);
        message =
          errObject?.data?.Reason ||
          errObject?.Exception ||
          errObject?.message ||
          errObject?.responseText ||
          errObject?.error_description ||
          errObject?.remark ||
          errObject?.error?.message ||
          message;
      } catch {
        message = err.body;
      }
    }

    return new ErrorHandler({
      code,
      message,
      status: +err.statusCode,
    });
  }

  constructor(baseUrl: string) {
    try {
      this.got = got.extend({
        baseUrl,
        timeout: config.got.timeout,
        headers: {
          'Content-Type': 'application/json',
        },
        hooks: {
          beforeError: [
            (err: got.GotError): got.GotError => {
              return err;
            },
          ],
        },
      });
    } catch (err) {
      this.log.error(`${baseUrl} error: `, err);
    }
  }

  public async get(
    url: string = '',
    options: GotRequestOptionsType = {},
    service: string
  ): HttpResponseType {
    try {
      const response = await this.got.get(url, options);

      return this.jsonResponse(options, response, url, service);
    } catch (err) {
      this.log.error(
        `Failure from service: ${service}, ${url}, method: GET error: ${JSON.stringify(
          err
        )}`
      );
      throw this.createDefaultException(url, err, options, service, 'GET');
    }
  }

  public async post(
    url: string = '',
    options: GotRequestOptionsType = {},
    service: string
  ): HttpResponseType {
    try {
      const response = await this.got.post(url, options);
      return this.jsonResponse(options, response, url, service);
    } catch (err) {
      this.log.error(
        `Failure from service: ${service}, method: POST error: ${JSON.stringify(
          err
        )}`
      );
      throw this.createDefaultException(url, err, options, service, 'POST');
    }
  }

  public async patch(
    url: string = '',
    options: GotRequestOptionsType = {},
    service: string
  ): HttpResponseType {
    try {
      const response = await this.got.patch(url, options);
      return this.jsonResponse(options, response, url, service);
    } catch (err) {
      this.log.error(
        `Failure from service: ${service}, method: PATCH error: ${JSON.stringify(
          err
        )}`
      );

      throw this.createDefaultException(url, err, options, service, 'PATCH');
    }
  }

  public async delete(
    url: string = '',
    options: GotRequestOptionsType = {},
    service: string
  ): HttpResponseType {
    try {
      const response = await this.got.delete(url, options);
      return this.jsonResponse(options, response, url, service);
    } catch (err) {
      this.log.error(
        `Failure from service: ${service}, ${url}, method: DELETE error: ${JSON.stringify(
          err
        )}`
      );

      throw this.createDefaultException(url, err, options, service, 'DELETE');
    }
  }

  private jsonResponse(
    request: GotRequestOptionsType = {},
    response: any,
    url: string,
    service: string
  ) {
    const jsonResponse = JSON.parse(response.body);

    return jsonResponse;
  }
}
