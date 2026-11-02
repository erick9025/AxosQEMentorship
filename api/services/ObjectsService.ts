import type { APIResponse } from "@playwright/test";
import type { CreateRestfulObject } from "../models/restfulObject";
import { ApiClient } from "../client/ApiClient";

export class ObjectsService {
	constructor(private readonly client: ApiClient) {}

	createObject(object: CreateRestfulObject): Promise<APIResponse> {
		return this.client.post("objects", object);
	}

	getObjectById(id: string): Promise<APIResponse> {
		return this.client.get(`objects/${encodeURIComponent(id)}`);
	}
}
