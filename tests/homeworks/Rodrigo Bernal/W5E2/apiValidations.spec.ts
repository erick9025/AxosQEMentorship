import { test, expect, APIResponse } from '@playwright/test'

test.describe("API testing validations", () => {

    const baseURL: string = "https://api.restful-api.dev";
    const objectsEndpoint: string = "/objects";

    test("GET - List Cellphones with more validations", async ({ request }) => {

        const response: APIResponse<any> = await request.get(`${baseURL}${objectsEndpoint}`, { ignoreHTTPSErrors: true });
        const statusCode: number = response.status();
        const responseContentType: string = response.headers()['content-type'];
        const responseBody = await response.json();

        //Validate Status code 200
        expect(statusCode).toBe(200);
        //Validate Content-type
        expect(responseContentType).toContain("application/json");
        //Validate response is an array
        expect(Array.isArray(responseBody)).toBe(true);
        //Validate response has data
        expect(responseBody.length).toBeGreaterThan(0);
        //Validate properties
        expect(responseBody[0]).toHaveProperty("id");
        expect(responseBody[0]).toHaveProperty("name");


        console.log(responseContentType);
        console.log(responseBody.length);
        console.log(responseBody[0]);
        console.log(responseBody);
    })
})