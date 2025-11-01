import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaceService {
  constructor(private readonly httpService: HttpService) {}

  async getData() {
    const url = 'https://api.restful-api.dev/objects';
    // Convert Observable to Promise
    const response = await firstValueFrom(this.httpService.get(url));

    return response.data;
  }

  async postData() {
    const url = 'https://api.restful-api.dev/objects';
    const payload = { title: 'NestJS', body: 'RESTful call example', userId: 1 };

    const response = await firstValueFrom(this.httpService.post(url, payload));

    return response.data;
  }
}
