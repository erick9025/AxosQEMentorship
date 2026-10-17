import {test, expect} from "@playwright/test"; 
import { LoginPage } from "../pages/loginPage"
import userData from '../dataTest/userData.json'

test.describe("Login with 3 type of users", () => {

    let loginPage: LoginPage;

    test.beforeEach("Navigate to login Page", ({page}) => {
        loginPage = new LoginPage(page);
        loginPage.goToLoginPage();
    })

    test("Login with valid credentials", async ({page}) => {
        await loginPage.login(userData.credentials.userValid.username, userData.credentials.userValid.password);
        await loginPage.validateLoginSuccesfully();
    })

    test("Login with invalid credentials", async ({page}) => {
        await loginPage.login(userData.credentials.userInvalid.username, userData.credentials.userInvalid.password);
        await loginPage.validateLoginNotSuccesfully(userData.credentials.userInvalid.errorMessage);
    })

    test("Login with locked credentials", async ({page}) => {
        await loginPage.login(userData.credentials.userLocked.username, userData.credentials.userLocked.password);
        await loginPage.validateLoginNotSuccesfully(userData.credentials.userLocked.errorMessage);
    })
})