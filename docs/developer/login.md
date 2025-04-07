---
sidebar_position: 7
---

# Starting the authentication flow

## CentralAuth NPM library

When using the CentralAuth NPM library, you can start the authentication flow by calling the `login` method on the `CentralAuthClass` instance. This method will redirect the user to the CentralAuth login page. The `login` method takes a `Request` object as an argument and returns a `Response` object. The `Response` object will contain the redirect URL to the CentralAuth login page. The second argument of the `login` method is an optional config object that can be used to customize the login flow. The config object can contain the following properties:

- `returnTo`: The URL to redirect the user to after a successful login. The origin of the URL must match any registered [whitelist domain](/admin/dashboard/organization/settings#whitelist-domains) on the CentralAuth organization. If this property is not set, the user will be redirected any `return_to` query parameter in the URL. If there is no `return_to` query parameter, the user will be redirected to the referrer URL. Lastly, if there is no referrer URL, the user will be redirected to the origin of the current request URL.
- `email`: The email address of the user to log in. Only use this property if you are sure which user is about to log in.
- `state`: A string that will be passed to the callback URL. This string can be used to store any information you want to pass to the callback URL. The `state` parameter is a way to maintain state between the request and callback. It is recommended to use a random but verifiable string for this parameter, unique to this user, to prevent CSRF attacks.
- `errorMessage`: An error message to show at the top of the CentralAuth login page. This way you can inform the user about the error that occurred while starting a new login flow.
- `translations`: An object that contains the translations for the CentralAuth login page. This object can be used to customize the text on the login page. See the [translations page](/developer/translations) section for more information.

:::info
When using the `CentralAuthHTTPClass` subclass, the login method is called `loginHTTP`. This method takes an `IncomingMessage` and `ServerResponse` object. The `loginHTTP` method does not return a `Response` object, but instead sends the redirect response directly to the client.
:::

## Manual integration

If you cannot use the NPM library, you can start the authentication flow by redirecting the user to the CentralAuth login page. The base URL for the login page is `https://centralauth.com/login` or use your own [custom domain](/admin/dashboard/organization/settings#custom-domains), e.g. `https://auth.example.com/login`. 

The login page URL must contain at least the following query parameters:
- `client_id`: The client ID of your application. This is the ID of your organization found on the CentralAuth dashboard. See the [integration](/admin/dashboard/organization/integration) section for more information.
- `response_type`: The type of response you want to receive. This must always be set to `code`.
- `redirect_uri`: The URL to redirect the user to after a successful login. The origin of the URL must match any registered [whitelist domain](/admin/dashboard/organization/settings#whitelist-domains) on the CentralAuth organization. Any `return_to` parameter should be appended as a query parameter of this URL.
- `state`: A string that will be passed to the callback URL. This string can be used to store any information you want to pass to the callback URL. The `state` parameter is a way to maintain state between the request and callback. It is recommended to use a random but verifiable string for this parameter, unique to this user, to prevent CSRF attacks.

The login page URL can also contain the following optional query parameters:
- `email`: The email address of the user to log in. Only use this property if you are sure which user is about to log in.
- `error_message`: An error message to show at the top of the CentralAuth login page. This way you can inform the user about the error that occurred while starting a new login flow.
- `translations`: A base64 stringified JSON object that contains the translations for the CentralAuth login page. This object can be used to customize the text on the login page. See the [translations page](/developer/translations) section for more information.