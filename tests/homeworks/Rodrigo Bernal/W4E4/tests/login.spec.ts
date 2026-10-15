import {test, expect} from "@playwright/test"; 
import { LoginPage } from "../pages/loginPage"
import userData from '../dataTest/userData.json'

test.describe("Login with POM and BasePage", () => {

    test("Login with valid credentials", async ({page}) => {
        const loginPage: LoginPage = new LoginPage(page);

        await loginPage.goToLoginPage();
        await loginPage.login(userData.credentials.username, userData.credentials.password);

        await expect(page).toHaveURL(/inventory/);
    })

    test("Login with invalid credentials", async ({page}) => {
        const loginPage: LoginPage = new LoginPage(page);

        await loginPage.goToLoginPage();
        await loginPage.login("wrongUsername", "wrongPassword");

        await expect(page).not.toHaveURL(/inventory/);
    })
})