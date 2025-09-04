---
sidebar_position: 2
---

# Integration

This tab shows all the information needed to integrate CentralAuth with your application. You can find the following information:

- **Domain**: The domain to which you can redirect users to log in. This is centralauth.com by default, but you can change it to your own custom domain. See the [organization settings tab](/admin/dashboard/organization/settings) for more information.
- **Client ID**: The unique ID for this organization to use in your application.
- **Client Secret**: The secret key for this organization to use in your application.

:::tip
To integrate CentralAuth with your application, you require some technical knowledge. If you need help, contact your development team or check the [developer documentation](/category/developers).
:::

## Generating a new client secret

You need a client secret to connect your application to CentralAuth. You cannot retrieve the client secret after it has been generated. When you create a new organization, you have to generate a new client secret.

To generate a new client secret:
- Click on the `Generate new secret` button.
- A popup will appear with the new client secret. Copy the client secret and set it in your application. You will not be able to retrieve it again.

:::caution
Please ensure that you save the client secret in a secure place. Treat it like a password and do not share it with anyone outside your team.
:::

- When the secret has been generated, it will not be activated immediately. You can activate it by clicking on the `Activate now` button.
- If you are not in the position to activate the secret immediately, you can activate it later by clicking on the `Activate later` button. This is useful if you cannot redeploy your application immediately.

:::note
If you choose to activate the secret later, you can activate it by clicking on the `Activate secret` button on the bottom of the page. You will be asked to enter the generated secret to activate it.
:::

- Once the secret is activated, any old secrets will be invalidated and cannot be used anymore. You can only have one active secret at a time. Any application using the old secret will stop working.

:::caution
If you lose the client secret, you will have to generate a new one. The old secret will be invalidated and cannot be used anymore.
:::

## Native app registration

:::tip
Setting up CentralAuth with a native app requires technical knowledge. If you need help, contact your development team or check the [developer documentation](/category/developers).
:::

When integrating CentralAuth with web applications, you can use a backend server to store secrets and perform actions. When integrating CentralAuth with native apps, this works a little bit differently. You have to register your app's bundle ID / package name and App Link / Universal Link to establish a two-way trust between your app and CentralAuth. Because it is not possible to safely store a client secret in a native app, we have to perform the login flow with PKCE (Proof Key for Code Exchange). See the [OAuth documentation](https://www.oauth.com/oauth2-servers/oauth-native-apps) for more information.

To add a new native app registration:
- Click on the `Add app` button.
- Fill in the required fields, including the app's name, bundle ID / package name, and App Link / Universal Link.
- Click on the `Save` button to create the new app registration.

The App Link / Universal Link is the website hosting the `apple-app-site-association` and `assetlinks.json` file. This file is used to verify that you own the domain and that you are allowed to open the app from this domain. See the [Apple documentation](https://developer.apple.com/documentation/xcode/supporting-associated-domains) and [Google documentation](https://developer.android.com/training/app-links/verify-site-associations) for more information. If you are using Expo, check out their [documentation](https://docs.expo.dev/guides/linking) for more information. The App Link / Universal Link must be a valid HTTPS URL that can be opened in a web browser, but should not be the same as your main website. For example, if your website is `https://example.com`, your App Link / Universal Link could be `https://app.example.com`.

### Why custom schemes are not allowed

CentralAuth does not support custom URL schemes (like `myapp://`) for native app integrations. Custom schemes are easier to spoof than App Links / Universal Links because:

- Any app can register the same custom scheme, potentially intercepting authentication flows
- There's no verification mechanism to prove ownership of a custom scheme
- Multiple apps can claim the same scheme, leading to security vulnerabilities

App Links (Android) and Universal Links (iOS) provide cryptographic verification that you own both the domain and the app, making them significantly more secure for authentication purposes.