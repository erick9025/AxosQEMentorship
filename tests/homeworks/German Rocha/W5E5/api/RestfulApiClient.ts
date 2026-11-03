import { APIRequestContext } from '@playwright/test';

export class RestfulApiClient {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // Execution of a POST request to persist an object record
    async createObject(payload: object) {
        return await this.request.post('https://api.restful-api.dev/objects', {
            data: payload
        });
    }

    // Execution of a GET request to retrieve a persisted object record by ID
    async getObjectById(objectId: string) {
        return await this.request.get(`https://api.restful-api.dev/objects/${objectId}`);
    }
}
