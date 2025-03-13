---
sidebar_position: 2
---

# Email authentication

Email authentication is a simple and secure way to log in to the organization's website. When you log in with your email address, you will receive a one-time link or code that you can use to verify your identity. The link or code expires after fifteen minutes for security reasons. After this period, you will need to request a new link or code to log in.

The exact email you will receive depends on the organization's settings. It may contain a link that you can click to log in, or a code that you can enter on the login screen. The different options are described below.

## How it works

<img src="/img/LoginScreen.png" alt="CentralAuth login screen" width="50%" height="50%" />

- When you start the CentralAuth login flow, click on the `Email` button.

<img src="/img/EmailAuthenticationScreen.png" alt="Email authentication screen" width="50%" height="50%" />

- Enter your email address and click the `Log in` button.

## Login options

<details>
<summary>One-time link</summary>

- You will receive an email with a login link. You can verify the email by checking that the token corresponds with the token displayed in your browser.
- After clicking the link, you will be automatically logged into your account.
- If the link expires, you may need to request a new one.
- Make sure to check your spam folder if you do not see the email.

:::info
You may see two login links in the email, based on the organization's settings. You can use either link to log in. The first link logs you in on the device you are using to open the email, while the second link logs you in on the device you used to start the login flow. If you experience any issues, please reach out to your organization's support team for assistance.
:::

</details>

<details>
<summary>Challenge</summary>

- You will receive an email with three numbers. One will correspond with the token displayed on the login screen. 
- Click the correct number in the email to log in.
- If you click the wrong number, you will be asked to try again.
- Make sure to check your spam folder if you do not see the email.

:::info
You will be logged in on the device you used to start the login flow.
:::

</details>

<details>
<summary>One-time code</summary>

- You will receive an email with a 5-digit number.
- Copy the number to the input field in your browser to log in.
- If you input the wrong number, you will be asked to try again.
- Make sure to check your spam folder if you do not see the email.

</details>

## Undo a login attempt
When you use a one-time login link or a challenge, you may see the option to undo a login attempt when returning to your browser. If you made a mistake or do not trust the login attempt, you can click the `Undo` button to cancel the session.