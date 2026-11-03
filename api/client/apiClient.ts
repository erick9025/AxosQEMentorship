import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {

    constructor(private readonly request: APIRequestContext) { }

    public async get(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
        return this.request.get(endpoint, { headers });
    }

    public async post(endpoint: string, data: unknown, headers?: Record<string, string>): Promise<APIResponse> {
        return this.request.post(endpoint, { data, headers });
    }

    public async delete(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
        return this.request.delete(endpoint, { headers });
    }
}