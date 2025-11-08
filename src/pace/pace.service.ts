import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';

export interface PaceObject {
  id?: string;
  title?: string;
  body?: string;
  userId?: number;
  [key: string]: unknown;
}

@Injectable()
export class PaceService {
  private readonly logger = new Logger(PaceService.name);
  private readonly baseUrl: string;
  private readonly requestTimeoutMs: number;

  constructor(private readonly httpService: HttpService) {
    // Use env var if provided, otherwise fallback to the original public API
    this.baseUrl =
      process.env.PACE_API_BASE_URL ?? 'https://api.restful-api.dev';

    // Per-request timeout (ms)
    this.requestTimeoutMs =
      Number(process.env.PACE_REQUEST_TIMEOUT_MS) || 5_000; // 5s
  }

  async getData(): Promise<PaceObject[]> {
    const url = `${this.baseUrl}/objects`;
    try {
      this.logger.debug(`GET ${url} (timeout=${this.requestTimeoutMs}ms)`);
      const response = await firstValueFrom(
        this.httpService.get<PaceObject[]>(url, {
          timeout: this.requestTimeoutMs,
        }),
      );

      this.validateResponse(response, url);

      return response.data ?? [];
    } catch (err) {
      this.handleRequestError(err, url);
    }
  }

  async postData(payload?: Partial<PaceObject>): Promise<PaceObject> {
    const url = `${this.baseUrl}/objects`;
    const body = payload ?? {
      title: 'NestJS',
      body: 'RESTful call example',
      userId: 1,
    };

    try {
      this.logger.debug(
        `POST ${url} payload keys=${Object.keys(body).join(',')} (timeout=${this.requestTimeoutMs}ms)`,
      );
      const response = await firstValueFrom(
        this.httpService.post<PaceObject>(url, body, {
          timeout: this.requestTimeoutMs,
        }),
      );

      this.validateResponse(response, url);

      return response.data;
    } catch (err) {
      this.handleRequestError(err, url);
    }
  }

  // Validate the axios response status and throw a 502 if it's not OK
  private validateResponse<T>(
    response: AxiosResponse<T> | null | undefined,
    url: string,
  ): void {
    if (!response || response.status >= 400) {
      this.logger.warn(
        `Unexpected response status ${response?.status} from ${url}`,
      );
      throw new HttpException(
        'Upstream service responded with error',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  // Extracted request error handling: logs, maps timeouts to 504, and throws HttpException
  private handleRequestError(err: unknown, url: string): never {
    const axiosErr = err as AxiosError;

    const isTimeout =
      axiosErr?.code === 'ECONNABORTED' ||
      (axiosErr?.message && axiosErr.message.toLowerCase().includes('timeout'));

    const message =
      axiosErr?.message ?? (err as Error)?.message ?? 'Unknown upstream error';

    const status = isTimeout
      ? HttpStatus.GATEWAY_TIMEOUT
      : (axiosErr?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR);

    this.logger.error(`Failed request to ${url}: ${message}`);
    throw new HttpException(message, status);
  }
}
