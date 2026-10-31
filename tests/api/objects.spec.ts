import { test, expect } from '@playwright/test';
import { ApiClient } from '../../api/client/apiClient';
import { ObjectsService } from '../../api/services/objectsService';
import { BaseAssertions } from '../../utils/assertions/baseAssertions';

test.describe('Objects API', () => {
    let apiClient: ApiClient;
    let objectsService: ObjectsService;

    test.beforeEach('Initialize objects', async ({ request }) => {
        apiClient = new ApiClient(request);
        objectsService = new ObjectsService(apiClient);
    })

    test('Validate retrieve all objects', async () => {
        const response = await objectsService.getAllObjects();
        BaseAssertions.validateStatusCode(response.status(), 200);
        const responseBody = await response.json();
        expect(responseBody.length).toBeGreaterThan(0);
    });

    test('Validate create, retrieve and delete an object', async () => {
        const newObject = {
            name: `Playwright Test Object ${Date.now()}`,
            data: {
                year: 2026,
                price: 1500,
                'CPU model': 'Intel Core i7',
                'Hard disk size': '1 TB'
            }
        };
        let createdId: string;

        // POST - Create object
        const createResponse = await objectsService.createObject(newObject);
        BaseAssertions.validateStatusCode(createResponse.status(), 200);
        const createdObject = await createResponse.json();
        createdId = createdObject.id;
        // GET - Retrieve object by ID
        const getResponse = await objectsService.getObjectById(createdId);
        BaseAssertions.validateStatusCode(getResponse.status(), 200);
        // DELETE - Delete object
        const deleteResponse = await objectsService.deleteObject(createdId);
        BaseAssertions.validateStatusCode(deleteResponse.status(), 200);
    });

});