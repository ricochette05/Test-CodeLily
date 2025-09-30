/* 
Registration Spec File
To run, use:
            npm run login-test
*/

import { test, expect } from "@shared/base";
import { attachScreenshot } from 'shared/helpers';
import users from '../../test-data/users.json';
import invalidUsers from '../../test-data/invalidUsers.json';

const LOGIN_SUCCESS_SCREENSHOT = 'login_success_screenshot.png';
const LOGIN_FAILURE_SCREENSHOT = 'login_failure_screenshot.png';
const LOGIN_FAILURE_invalidEmailAndPassword_SCREENSHOT = 'login_failure_invalidEmailAndPassword_screenshot.png';
const LOGIN_FAILURE_emptyEmailAndPassword_SCREENSHOT = 'login_failure_emptyEmailAndPassword_screenshot.png';
const LOGIN_FAILURE_emptyPassword_SCREENSHOT = 'login_failure_emptyPassword_screenshot.png';
const LOGIN_FAILURE_invalidEmailFormat_SCREENSHOT = 'login_failure_invalidEmailFormat_screenshot.png';

test.describe('Positive Tests', { tag: ['@RegressionTesting', '@HappyPath'] }, () => {
  
 
  test.beforeEach(async ({ loginPage }, testInfo) => {
    await loginPage.navigateTo();
    await loginPage.verifyPageLoaded();

    const screenshot = await loginPage.screenshot();
    testInfo.attach('login-page-before-${user.name}', { body: screenshot, contentType: 'image/png' });
  });

  
  for (const user of users) {
    test(`1. Login with valid credentials as ${user.email}`, async ({ loginPage, page }, testInfo) => {
      
      await test.step('Enter email and password', async () => {
        await loginPage.enterEmail(user.email);
        await loginPage.enterPassword(user.password);
      });

      await test.step('Click Sign In button', async () => {
        await loginPage.clickSignIn();
      });

      await test.step('Verify successful login', async () => {
        await loginPage.verifyLoginSuccessful(); 
      });

      await test.step('Attached Screenshot', async () => {
        await attachScreenshot(page, testInfo, LOGIN_SUCCESS_SCREENSHOT);
      });
    }); // end of test1
  } // end of for loop
}); // end of describe

// NEGATIVE TESTS
test.describe('Negative Tests - Invalid Credentials', () => {

    test.beforeEach(async ({ loginPage }, testInfo) => {
      await loginPage.navigateTo();
      await loginPage.verifyPageLoaded();
    });

    for (const user of invalidUsers) {
      // INVALID email and password
      test(`1. Login fails for ${user.name} with invalid email and password`, async ({ loginPage, page }, testInfo) => {

        await test.step('Enter invalid email/password', async () => {
          await loginPage.enterEmail(user.email);
          await loginPage.enterPassword(user.password);
        });

        await test.step('Click Sign In button', async () => {
          await loginPage.clickSignIn();
        });

        await test.step('Verify login failed', async () => {
          await loginPage.verifyLoginFailed();
        });

        await test.step('Attached Screenshot', async () => {
          await attachScreenshot(page, testInfo, LOGIN_FAILURE_invalidEmailAndPassword_SCREENSHOT);
        });
      }); // end of test
    
      // EMPTY FIELDS - Empty Email and Password
      test('2. Login fails with empty fields', async ({ loginPage, page }, testInfo) => {
        await test.step('Click Sign In Button', async () => {
          await loginPage.clickSignIn();
        });

        await test.step('Verify login failed', async () => {
          
          // Check validation message
          const message = await loginPage.emailInput.evaluate((input: HTMLInputElement) => input.validationMessage);
          expect(message).toBe('Please fill out this field.'); 
        });

        await test.step('Attached Screenshot', async () => {
          await attachScreenshot(page, testInfo, LOGIN_FAILURE_emptyEmailAndPassword_SCREENSHOT);
        });  
      }); // end of test

      // EMPTY FIELDS - Empty Password
      test('3. Login fails with empty password field', async ({ loginPage, page }, testInfo) => {
        await test.step('Enter only email', async () => {
          await loginPage.enterEmail(user.email);
        });    
        await test.step('Verify login failed', async () => {
          await loginPage.clickSignIn();

          // Check validation message
          const message = await loginPage.emailInput.evaluate((input: HTMLInputElement) => input.validationMessage);
          expect(message).toBe('');  
        });

        await test.step('Attached Screenshot', async () => {
          await attachScreenshot(page, testInfo, LOGIN_FAILURE_emptyPassword_SCREENSHOT);
        });  
      }); // end of test
    } // end of for loop

      // INVALID EMAIL FORMAT
      test('4. Login fails with invalid email format', async ({ loginPage, page }, testInfo) => {
        // Enter invalid email format
        await test.step('Enter invalid email format', async () => {
          await loginPage.enterEmail('abc');
          await loginPage.enterPassword('password');
        });
        // Try to submit
        await test.step('Click Sign In button', async () => {
          await loginPage.clickSignIn();
        });

        await test.step('Verify login failed', async () => {
          // Check validation message
          const message = await loginPage.emailInput.evaluate(
            (input: HTMLInputElement) => input.validationMessage
          );
          // No '@' in email should trigger this message
          expect(message).toBe("Please include an '@' in the email address. 'abc' is missing an '@'.");
        });

        await test.step('Attached Screenshot', async () => {
          await attachScreenshot(page, testInfo, LOGIN_FAILURE_invalidEmailFormat_SCREENSHOT);
        }); 
      }); // end of test
    

}); // end of describe


