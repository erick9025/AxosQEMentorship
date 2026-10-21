import type { APIRequestContext, APIResponse } from "@playwright/test";

export class RequestManager {
	constructor(
		private readonly request: APIRequestContext,
		private readonly baseUrl: string,
	) {}

	get(path: string): Promise<APIResponse> {
		return this.request.get(this.buildUrl(path), {
			headers: { Accept: "application/json" },
		});
	}

	post(path: string, body: unknown): Promise<APIResponse> {
		return this.request.post(this.buildUrl(path), {
			headers: { Accept: "application/json" },
			data: body,
		});
	}

	private buildUrl(path: string): string {
		return `${this.baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
	}
}
