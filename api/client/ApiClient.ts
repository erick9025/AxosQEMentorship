import type { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiClient {
	constructor(
		private readonly request: APIRequestContext,
		private readonly baseUrl: string,
	) {}

	get(path: string): Promise<APIResponse> {
		return this.request.get(this.buildUrl(path), {
			headers: { Accept: "application/json" },
		});
	}

	post(path: string, data: unknown): Promise<APIResponse> {
		return this.request.post(this.buildUrl(path), {
			headers: { Accept: "application/json" },
			data,
		});
	}

	private buildUrl(path: string): string {
		const baseUrl = `${this.baseUrl.replace(/\/+$/, "")}/`;
		return new URL(path.replace(/^\/+/, ""), baseUrl).toString();
	}
}
