import { test, expect, APIResponse } from '@playwright/test'

test.describe("API POST testing validations", () => {

    const baseURL: string = "https://api.restful-api.dev";
    const objectsEndpoint: string = "/objects";
    const payload = {
        "name": "Apple MacBook Pro 16",
        "data": {
            "year": 2019,
            "price": 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB"
        }
    }

    test("POST - Create a new object", async ({ request }) => {

        const response: APIResponse<any> = await request.post(`${baseURL}${objectsEndpoint}`, {
            data: payload
        });
        const statusCode: number = response.status();
        const responseContentType: string = response.headers()['content-type'];
        const responseBody = await response.json();

        //Validate Status code 200
        expect(statusCode).toBe(200);
        //Validate Content-type
        expect(responseContentType).toContain("application/json");
        //Validate properties
        expect(responseBody).toHaveProperty("id");
        expect(responseBody.id).toBeTruthy();
        //Validate name
        expect(responseBody.name).toBe(payload.name);
        //Validate dta created
        expect(responseBody.data).toMatchObject(payload.data);


        console.log(responseContentType);
        console.log(responseBody);
    })
})