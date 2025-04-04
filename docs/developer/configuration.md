---
sidebar_position: 6
---

# Configuration

## CentralAuth NPM library

When using the CentralAuth NPM library, you first need to choose between the two available classes: `CentralAuthClass` and `CentralAuthHTTPClass`. Based on your web server, you can choose the class that best fits your needs. When using a [Fetch API server](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (like NextJS), you should use the `CentralAuthClass`. When using an [HTTP server](https://nodejs.org/api/http.html) (like Express), you should use the `CentralAuthHTTPClass`.

### Class constructor

Every step in the authentication flow is handled by a method in the class. The constructor of the class takes an object with the following properties:
- `clientId`: The organization ID you got from the CentralAuth dashboard.      
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

## Manual configuration

If you cannot use the NPM library, you can still use CentralAuth by manually configuring the authentication flow. It is recommended to use an OAuth 2.0 library for your programming language to handle the authentication flow. You can find more information about the OAuth 2.0 flow in the docs of the library you choose.