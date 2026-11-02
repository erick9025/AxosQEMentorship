import type { APIResponse } from "@playwright/test";
import type { CreateReqresUser, ReqresLoginCredentials } from "../models/reqres";
import { ApiClient } from "../client/ApiClient";

export class ReqresService {
	constructor(private readonly client: ApiClient) {}

	getUsers(page = 2): Promise<APIResponse> {
		return this.client.get(`users?page=${page}`);
	}

	getUserById(id: number | string): Promise<APIResponse> {
		return this.client.get(`users/${encodeURIComponent(String(id))}`);
	}

	createUser(user: CreateReqresUser): Promise<APIResponse> {
		return this.client.post("users", user);
	}

	login(credentials: ReqresLoginCredentials): Promise<APIResponse> {
		return this.client.post("login", credentials);
	}
}
