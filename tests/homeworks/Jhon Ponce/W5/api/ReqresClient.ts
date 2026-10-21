import type { APIRequestContext, APIResponse } from "@playwright/test";
import { RequestManager } from "./RequestManager";
import type { CreateReqresUser, ReqresLoginCredentials } from "../interfaces/reqres";

export class ReqresClient {
	private readonly requests: RequestManager;

	constructor(request: APIRequestContext) {
		this.requests = new RequestManager(request, "https://reqres.in/api");
	}

	getUsers(page = 2): Promise<APIResponse> {
		return this.requests.get(`/users?page=${page}`);
	}

	getUserById(id: number | string): Promise<APIResponse> {
		return this.requests.get(`/users/${id}`);
	}

	createUser(user: CreateReqresUser): Promise<APIResponse> {
		return this.requests.post("/users", user);
	}

	login(credentials: ReqresLoginCredentials): Promise<APIResponse> {
		return this.requests.post("/login", credentials);
	}
}
