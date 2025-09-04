---
sidebar_position: 6
---

# Configuration

Configuration of your application depends on the type of application you are developing, a web application or a native Android or iOS app.

## Web application

### CentralAuth NPM library

When using the CentralAuth NPM library, you first need to choose between the two available classes: `CentralAuthClass` and `CentralAuthHTTPClass`. Based on your web server, you can choose the class that best fits your needs. When using a [Fetch API server](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (like NextJS), you should use the `CentralAuthClass`. When using an [HTTP server](https://nodejs.org/api/http.html) (like Express), you should use the `CentralAuthHTTPClass`.

#### Class constructor

Every step in the authentication flow is handled by a method in the class. The constructor of the class takes an object with the following properties:
- `clientId`: The organization ID you got from the CentralAuth dashboard. See the [integration page](/admin/dashboard/organization/integration) for more information. 
- `secret`: The secret you got from the CentralAuth dashboard.
- `authBaseUrl`: The base URL of the CentralAuth server. This will either be `https://centralauth.com` or your own [custom domain](/admin/dashboard/organization/settings#custom-domains).
- `callbackUrl`: The URL to redirect to after the user has authenticated. This should be the URL of your application where you want to handle the authentication response.
- `debug`: Optional. If set to `true`, the debug information will be logged to the console.
- `unsafeIncludeUser`: Optional. If set to `true`, the session token will include the user information. This will make it easier and faster to fetch the user information, but will bypass session hijacking and other security measures. This is not recommended for production use.

**Example:**

```typescript
import { CentralAuthClass } from "centralauth/server";

const authClient = new CentralAuthClass({
  clientId: process.env.AUTH_ORGANIZATION_ID,
  secret: process.env.AUTH_SECRET,
  authBaseUrl: process.env.AUTH_BASE_URL,
  callbackUrl: `https://example.com/api/auth/callback`
});
```

### Manual configuration

If you cannot use the NPM library, you can still use CentralAuth by manually configuring the authentication flow. It is recommended to use an OAuth 2.0 library for your programming language to handle the authentication flow. You can find more information about the OAuth 2.0 flow in the docs of the library you choose.

## Native app

### React Native (Expo)

When developing a React Native app with Expo, you can use the `CentralAuthProvider` in the CentralAuth NPM package. Update the wrapper from `centralauth/native` and wrap you entire app with it. 

**Example for Expo Router:**

```tsx
import { CentralAuthProvider } from 'centralauth/native';
import { Stack } from "expo-router";

export default function RootLayout() {
  return <CentralAuthProvider clientId="YOUR_CLIENT_ID" appId="YOUR_APP_ID" deviceId="UNIQUE_DEVICE_ID" authBaseUrl="AUTH_BASE_URL_OR_CUSTOM_DOMAIN" callbackUrl="APP_LINK_WITH_CALLBACK_PATH">
    <Stack />
  </CentralAuthProvider>;
}
```

The `CentralAuthProvider` component takes the following props:
- `clientId`: The client ID you got from the CentralAuth dashboard. See the [integration page](/admin/dashboard/organization/integration) for more information.
- `appId`: The bundle ID / package name for your app. This is set in your app and must match an app registration on the [integration page](/admin/dashboard/organization/integration#native-app-registration).
- `deviceId`: A unique device ID for the user's device. This can be any unique string that identifies the device, such as a UUID or a hash of the device's hardware information and will be used when requesting the user info. This is optional but recommended.
- `authBaseUrl`: The base URL of the CentralAuth server. This will either be `https://centralauth.com` or your own [custom domain](/admin/dashboard/organization/settings#custom-domains).
- `callbackUrl`: The URL to redirect to after the user has authenticated. The callback URL has to be configured as an App Link / Universal Link  and must match an app registration on the [integration page](/admin/dashboard/organization/integration#native-app-registration).

### Manual configuration

If you cannot use the NPM library, you can still use CentralAuth by manually configuring the authentication flow. It is recommended to use an OAuth 2.0 library for your programming language to handle the authentication flow. You can find more information about the OAuth 2.0 flow in the docs of the library you choose.