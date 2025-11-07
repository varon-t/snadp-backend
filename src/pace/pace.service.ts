import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

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

  constructor(private readonly httpService: HttpService) {
    // Use env var if provided, otherwise fallback to the original public API
    this.baseUrl =
      process.env.PACE_API_BASE_URL ?? 'https://api.restful-api.dev';
  }

  async getData(): Promise<PaceObject[]> {
    const url = `${this.baseUrl}/objects`;
    try {
      this.logger.debug(`GET ${url}`);
      const response = await firstValueFrom(
        this.httpService.get<PaceObject[]>(url),
      );
      if (!response || response.status >= 400) {
        this.logger.warn(
          `Unexpected response status ${response?.status} from ${url}`,
        );
        throw new HttpException(
          'Upstream service responded with error',
          HttpStatus.BAD_GATEWAY,
        );
      }

      return response.data ?? [];
    } catch (err) {
      const axiosErr = err as AxiosError;
      const message =
        axiosErr?.message ??
        (err as Error)?.message ??
        'Unknown upstream error';
      const status =
        axiosErr?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
      this.logger.error(`Failed GET ${url}: ${message}`);
      throw new HttpException(message, status);
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
        `POST ${url} payload keys=${Object.keys(body).join(',')}`,
      );
      const response = await firstValueFrom(
        this.httpService.post<PaceObject>(url, body),
      );
      if (!response || response.status >= 400) {
        this.logger.warn(
          `Unexpected response status ${response?.status} from ${url}`,
        );
        throw new HttpException(
          'Upstream service responded with error',
          HttpStatus.BAD_GATEWAY,
        );
      }

      return response.data;
    } catch (err) {
      const axiosErr = err as AxiosError;
      const message =
        axiosErr?.message ??
        (err as Error)?.message ??
        'Unknown upstream error';
      const status =
        axiosErr?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
      this.logger.error(`Failed POST ${url}: ${message}`);
      throw new HttpException(message, status);
    }
  }
}
