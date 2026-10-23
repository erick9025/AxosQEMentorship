import { test, expect, APIResponse, Locator } from '@playwright/test'

test.describe("Crete a product using API and validate in the UI", () => {

    const baseURL: string = "https://api.restful-api.dev";
    const objectsEndpoint: string = "/objects";
    const payload = {
        "name": "Samsung Galaxy S24",
        "data": {
            "year": 2024,
            "price": 2322.50,
            "color": "Blue",
            "capacity": "254 GB"
        }
    }

    test("Create and object with API and validate it exists in the UI", async ({ request, page }) => {

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

        //Search object created in the UI

        await page.goto(`${baseURL}${objectsEndpoint}/${objectId}`);

        const resposeLocator : Locator = page.locator("pre");


        //Validate object created is in the UI
        await expect(resposeLocator).toContainText(objectId);
        await expect(resposeLocator).toContainText(payload.name);
        await expect(resposeLocator).toContainText(payload.data.year.toString());
        await expect(resposeLocator).toContainText(payload.data.price.toString());
        await expect(resposeLocator).toContainText(payload.data.color);
        await expect(resposeLocator).toContainText(payload.data.capacity);

        
    })
})