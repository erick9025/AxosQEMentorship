import { APIResponse } from '@playwright/test';
import { ApiClient } from '../client/apiClient';
import { ObjectModel } from '../models/objectModel';

export class ObjectsService {
    private readonly endpoint = '/objects';

    constructor(private readonly apiClient: ApiClient) { }

    async getAllObjects(): Promise<APIResponse> {
        return this.apiClient.get(this.endpoint);
    }

    async getObjectById(id: string): Promise<APIResponse> {
        return this.apiClient.get(`${this.endpoint}/${id}`);
    }

    async createObject(object: ObjectModel): Promise<APIResponse> {
        return this.apiClient.post(this.endpoint, object);
    }

    async deleteObject(id: string): Promise<APIResponse> {
        return this.apiClient.delete(`${this.endpoint}/${id}`);
    }
}