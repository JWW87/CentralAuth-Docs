---
sidebar_position: 12
---

# Translations

:::note
Translation are not available on the **Free** plan.
:::

When starting the login flow, you can pass an object with translations as a query parameter. This allows you to override or translate the default strings on the login pages.

## CentralAuth NPM library

When using the CentralAuth NPM library, you can pass the `translations` object as config parameter to the `login` or `loginHTTP` method, for example:

```typescript
await authClient.login(req, {
  translations: {
    login: "Welcome! Log in to My Website.",
    loginAttemptSuccess: "That's all folks! Close this tab and be on your merry way.",
    loginAttemptError: "Oops! Something went wrong. Please try again.",
    undo: "Undo login at My Website"
  }
});
```

## Manual integration

If you cannot use the NPM library, you can pass the translations object as a base64 stringified JSON object in the `translations` query parameter of the login URL. For example:

```typescript
const translations = {
  login: "Welcome! Log in to My Website.",
  loginAttemptSuccess: "That's all folks! Close this tab and be on your merry way.",
  loginAttemptError: "Oops! Something went wrong. Please try again.",
  undo: "Undo login at My Website"
};

const translationsBase64String = Buffer.from(JSON.stringify(config.translations)).toString("base64");

const loginUrl = `https://centralauth.com/login?translations=${translationsBase64String}&client_id=CLIENT_ID&response_type=code&redirect_uri=REDIRECT_URI&state=STATE`;
```

## Available translations

You can set the following translations:

| Key                                   | Description                                                                                                          | Default value                                                                                                                                                                                                                                                       |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `emailAddress`                        | The label of the email address input field.                                                                          | Email address                                                                                                                                                                                                                                                       |
| `loginPageIntro`                      | The introductory text on the login page.                                                                             | Welcome to `organization name`. How would you like to log in?                                                                                                                                                                                                       |
| `loginPagePasskeyAuthentication`      | The button label for using an existing passkey.                                                                      | Use an existing passkey                                                                                                                                                                                                                                             |
| `loginPagePasskeyRegistration`        | The button label for registering a new passkey.                                                                      | Register a new passkey                                                                                                                                                                                                                                              |
| `loginPagePasskeyIntro`               | The introductory text for passkey login.                                                                             | A passkey is a modern, safe and simple way to log in using an authentication method from your own device, like your fingerprint, Face ID or Windows Hello. Please verify your email address to start registration for a new passkey. You only have to do this once. |
| `loginPagePasskeyOrganizationWarning` | The warning message when a passkey was used for a wrong organization.                                                | This passkey was not registered for this organization. Please register a new passkey.                                                                                                                                                                               |
| `loginPagePasskeyError`               | The error message for a failed passkey login.                                                                        | The authentication failed. Please try again or register a new passkey.                                                                                                                                                                                              |
| `loginPageEmailIntro`                 | The introductory text for email login.                                                                               | Please enter your email address to log in at `organization name`.                                                                                                                                                                                                   |
| `loginPageEmailError`                 | The error message for a failed email login.                                                                          | Please enter a valid email address.                                                                                                                                                                                                                                 |
| `loginPageCaptcha`                    | The label for the Captcha checkbox.                                                                                  | I am a human                                                                                                                                                                                                                                                        |
| `loginPageCaptchaChallengeText`       | The text for the Captcha number challenge.                                                                           | Please click the numbers from lowest to highest.                                                                                                                                                                                                                    |
| `loginPageCaptchaPuzzleText`          | The text for the Captcha puzzle challenge.                                                                           | Please click the only open circle in the image.                                                                                                                                                                                                                     |
| `loginPageCaptchaLockText`            | The text for the Captcha lock rotation challenge.                                                                    | Please align the image with the background. Drag the image or use the buttons to rotate it.                                                                                                                                                                         |
| `loginPageCaptchaError`               | The error message for the Captcha challenge.                                                                         | Please click the checkbox to verify you're a human.                                                                                                                                                                                                                 |
| `suspiciousActivityDetected`          | The error message for the AI bot detection.                                                                          | Suspicious activity detected. Please try again later.                                                                                                                                                                                                               |
| `emailLinkSubject`                    | The email subject for an email containing a login link.                                                              | One-time login link                                                                                                                                                                                                                                                 |
| `emailCodeSubject`                    | The email subject for an email containing a login code.                                                              | One-time login code                                                                                                                                                                                                                                                 |
| `emailLinkBody`                       | The email body for an email containing a login link.                                                                 | Hi! You are receiving this email because you're trying to log in at `organization name`. Click the link below to confirm you want to log in.                                                                                                                        |
| `emailCodeBody`                       | The email body for an email containing a login code.                                                                 | Hi! You are receiving this email because you're trying to log in at `organization name`. Please copy the code below to your browser to log in.                                                                                                                      |
| `emailWaitUntil`                      | The warning message for too many login attempts. A counter will be displayed after this text.                        | Please wait a little longer before trying to log in again:                                                                                                                                                                                                          |
| `emailBodyWarning`                    | The message below the login link and code email.                                                                     | If you didn't try to log in, don't click on the link and just delete this email.                                                                                                                                                                                    |
| `emailChallengeText`                  | The text for the login challenge email.                                                                              | Please click the number you see in your browser:                                                                                                                                                                                                                    |
| `login`                               | The label for the login button, both on the login page and in the email.                                             | Log in at `organization name`                                                                                                                                                                                                                                       |
| `loginWithPasskey`                    | The label for the passkey login button.                                                                              | Log in with a passkey                                                                                                                                                                                                                                               |
| `loginLocal`                          | The label for the local login button when the login method is user choice.                                           | Log in to this device                                                                                                                                                                                                                                               |
| `loginRemote`                         | The label for the remote login button when the login method is user choice.                                          | Log in to your existing session                                                                                                                                                                                                                                     |
| `loginAttemptBody`                    | The text on the login page when an email with a login link was sent.                                                 | A mail has been sent to your email address with the following token. Please keep this tab open and continue to your email.                                                                                                                                          |
| `loginAttemptCodeBody`                | The text on the login page when an email with a login code was sent.                                                 | A mail has been sent to your email address with a one-time login code. Please enter the code here to log in.                                                                                                                                                        |
| `loginAttemptSuccess`                 | The text on the login page when the login attempt was successful, shown in the tab where the login flow was started. | Done! You can now close this tab and return to your session.                                                                                                                                                                                                        |
| `loginAttemptError`                   | The error message on the login page when the login attempt was unsuccessful.                                         | Something went wrong... Please close this tab and try again.                                                                                                                                                                                                        |
| `undo`                                | The label of the undo button.                                                                                        | Undo                                                                                                                                                                                                                                                                |