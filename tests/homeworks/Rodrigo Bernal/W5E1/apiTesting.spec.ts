import { test, expect, APIResponse } from '@playwright/test'

test.describe(" API testing", () => {

    const baseURL: string = "https://api.restful-api.dev";
    const objectsEndpoint: string = "/objects";

    test("GET - Cellphones", async ({ request }) => {

        const response: APIResponse<any> = await request.get(`${baseURL}${objectsEndpoint}`);
        const statusCode: number = response.status();
        const responseBody: any = await response.json();

        expect(statusCode).toBe(200);

        console.log(responseBody);
    })
})

