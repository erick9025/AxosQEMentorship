import type { APIRequestContext, APIResponse } from "@playwright/test";
import { RequestManager } from "./RequestManager";
import type { CreateRestfulObject } from "../interfaces/restfulApi";

export class RestfulApiClient {
	private readonly requests: RequestManager;

	constructor(request: APIRequestContext) {
		this.requests = new RequestManager(request, "https://api.restful-api.dev");
	}

	createObject(object: CreateRestfulObject): Promise<APIResponse> {
		return this.requests.post("/objects", object);
	}

	getObjectById(id: string): Promise<APIResponse> {
		return this.requests.get(`/objects/${encodeURIComponent(id)}`);
	}
}
