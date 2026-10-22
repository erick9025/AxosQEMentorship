import { test, expect, APIResponse } from '@playwright/test'

test.describe("API testing validations", () => {

    const baseURL: string = "https://api.restful-api.dev";
    const objectsEndpoint: string = "/objects";
    const payload = {
        "name": "Apple iPhone 14",
        "data": {
            "year": 2021,
            "price": 2345.98,
            "Color": "Black",
            "Capacity": "254 GB"
        }
    }

    test("Create and object and validate it exists", async ({ request }) => {

        const response: APIResponse<any> = await request.post(`${baseURL}${objectsEndpoint}`, {
            data: payload
        });
        const statusCode: number = response.status();
        const responseContentType: string = response.headers()['content-type'];
        const responseBody: any = await response.json();

        //Validate Status code 200
        expect(statusCode).toBe(200);
        //Validate Content-type
        expect(responseContentType).toContain("application/json");
        //Validate properties
        expect(responseBody).toHaveProperty("id");
        expect(responseBody.id).toBeTruthy();
        //Validate name
        expect(responseBody.name).toBe(payload.name);
        //Validate data created
        expect(responseBody.data).toMatchObject(payload.data);

        console.log(responseContentType);
        console.log(responseBody);

        const objectId: any = responseBody.id;
        console.log(`Object created with the ID: ${objectId}`);

        //Search object created with GET method

        const getResponse = await request.get(`${baseURL}${objectsEndpoint}/${objectId}`);

        const getStatusCode: number = getResponse.status();
        const getResponseContentType: string = getResponse.headers()['content-type'];
        const getResponseBody: any = await getResponse.json();

        //Validate Status code 200
        expect(getStatusCode).toBe(200);
        //Validate Content-type
        expect(getResponseContentType).toContain("application/json");
        //Validate properties
        expect(getResponseBody).toHaveProperty("id");
        expect(getResponseBody.id).toBeTruthy();
        //Validate Id is the object created
        expect(getResponseBody.id).toBe(objectId);
        //Validate name
        expect(getResponseBody.name).toBe(payload.name);
        //Validate data created
        expect(getResponseBody.data).toMatchObject(payload.data);

        console.log(getResponseContentType);
        console.log(getResponseBody);


    })
})