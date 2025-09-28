/* 
=========================================
Registration Spec File
=========================================
To run, use:
            npm run registration-test
*/

import { test, expect } from "@shared/base";
import { attachScreenshot } from 'shared/helpers';
import users from '../../test-data/users.json';

const REGISTRATION_SUCCESS_SCREENSHOT = 'registration_success_screenshot.png';
const REGISTRATION_FAILURE_SCREENSHOT = 'registration_failure_screenshot.png';


test.describe('Positive Test', { tag: ['@RegressionTesting', '@HappyPath'] }, () => {
    
    users.forEach(user => {
        test.beforeEach(async ({ registrationPage }, testInfo) => {
        await registrationPage.navigateTo();
        await registrationPage.verifyPageLoaded();
        const screenshot = await registrationPage.screenshot();
        testInfo.attach('registration-page-before', { body: screenshot, contentType: 'image/png' });
        });

        test(`Register ${user.name} with unique email`, async ({ registrationPage, page }, testInfo) => {
            const uniqueEmail = `user${Date.now()}@example.com`;

            await test.step('Enter registration details', async () => {
                await registrationPage.enterEmail(uniqueEmail);
                await registrationPage.enterPassword(user.password);
                await registrationPage.enterConfirmPassword(user.password);
            });

            await test.step('Click Register button', async () => {
                await registrationPage.clickRegister();
            });

            await test.step('Verify successful registration ', async () => {
                await registrationPage.verifyRegistrationSuccessful();
                await attachScreenshot(page, testInfo, REGISTRATION_SUCCESS_SCREENSHOT);
            });
        }); // end of test
    }); // end of users.forEach
});


test.describe('Negative Tests', { tag: ['@RegressionTesting', '@NegativePath'] }, () => {

    test.beforeEach(async ({ registrationPage }, testInfo) => {
      await registrationPage.navigateTo();
      await registrationPage.verifyPageLoaded();
      const screenshot = await registrationPage.screenshot();
      testInfo.attach('registration-page-before', { body: screenshot, contentType: 'image/png' });
    });

    test('Cannot register with an already registered email', async ({ registrationPage, page }, testInfo) => {
      
        const existingEmail = users[0].email; // using first user as existing
        const password = users[0].password;
        
        await test.step('Enter registration details', async () => {
            await registrationPage.enterEmail(existingEmail);
            await registrationPage.enterPassword(password);
            await registrationPage.enterConfirmPassword(password);
        });

        await test.step('Click Register button', async () => {
            await registrationPage.clickRegister();
        });

        await test.step('Verify registration failed', async () => {
            await registrationPage.verifyRegistrationFailed();
            await attachScreenshot(page, testInfo, REGISTRATION_FAILURE_SCREENSHOT);
        });
    }); // end of test

    test('Cannot register when password and confirm password do not match', async ({ registrationPage, page }, testInfo) => {
        
        const email = `mismatch${Date.now()}@example.com`;
        const password = 'Password123';
        const confirmPassword = 'Password321';

        await test.step('Enter registration details with mismatched passwords', async () => {
            await registrationPage.enterEmail(email);
            await registrationPage.enterPassword(password);
            await registrationPage.enterConfirmPassword(confirmPassword);
        });

        await test.step('Click Register button', async () => {
            await registrationPage.clickRegister()
        });   

        await test.step('Verify registration failed', async () => {
            await registrationPage.verifyRegistrationFailed();
            await attachScreenshot(page, testInfo, REGISTRATION_FAILURE_SCREENSHOT);
        });
    }); // end of test
}); // end of describe
