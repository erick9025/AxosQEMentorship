import { APIRequestContext } from '@playwright/test';

export class ReqresClient {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // Method to execute a POST request to create a new user
    async createUser(nameValue: string, jobValue: string) {
        const payload = { name: nameValue, job: jobValue };
        const response = await this.request.post('https://reqres.in', {
            data: payload
        });
        return response;
    }

    // Method to execute a GET request using a specific user ID
    async getUserById(userId: string) {
        const response = await this.request.get(`https://reqres.in/${userId}`);
        return response;
    }
}
