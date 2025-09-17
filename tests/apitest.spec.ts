import { test, expect, request } from '@playwright/test';
import { APIHelper } from '../utils/api-helper';
import { testData } from '../utils/test-data';  

test.describe('Buggy Cars API Automation', () => {
    let apiHelper: APIHelper;       
    let token: string;

    test.beforeAll(async ({ request: req }) => {
        apiHelper = new APIHelper(req);
        token = await apiHelper.getToken('reg56', 'XtUsksxbWDA.3Ax');
    });

    test('OAuth Token generated successfully', async () => {
        expect(token).toBeTruthy();
    });

    test('Get Current User Info', async () => {
        const response = await apiHelper.getCurrentUser(token);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('username');
    });

    test('Get User Profile', async () => {
        const response = await apiHelper.getProfile(token);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('firstName');
    });

    test('Update User Profile', async () => {
        const profileData = {
            firstName: "Jane",
            lastName: "Smith",
            gender: "Female",
            age: 28,
            address: "456 Elm Street",
            phone: 1234567890,
            hobby: "Cycling",
            language: "French"
        };
        const response = await apiHelper.updateProfile(token, profileData);
        expect(response.status()).toBe(200);
    });

    test('Get Dashboard Data', async () => {
        const response = await apiHelper.getDashboard(token);
        expect(response.status()).toBe(200);
    });

    test('Get Model Details', async () => {
        const response = await apiHelper.getModelDetails(token, 'ckl2phsabijs71623vk0|ckl2phsabijs71623vqg');
        expect(response.status()).toBe(200);
    });

    test('Vote for a Model', async () => {
        const response = await apiHelper.voteModel(token, 'ckl2phsabijs71623vk0|ckl2phsabijs71623vsg', 'Excellent performance and design!');
        expect(response.status()).toBe(400); // according to Postman test
    });

    test('Get Make Details – Page 1', async () => {
        const response = await apiHelper.getMakeDetails(token, 'ckl2phsabijs71623vk0', 1);
        expect(response.status()).toBe(200);
    });

    test('Get Make Details – Page 2 Random Order', async () => {
        const response = await apiHelper.getMakeDetails(token, 'ckl2phsabijs71623vk0', 2, 'random');
        expect(response.status()).toBe(200);
    });

    test('Create New User', async () => {
        const response = await apiHelper.createUser({
            username: `testuser66668_${Math.floor(Math.random()*1000)}`,
            firstName: "test77878",
            lastName: "rtst",
            password: "Test@1234",
            confirmPassword: "Test@1234"
        });
        expect(response.status()).toBe(201);
    });

});
