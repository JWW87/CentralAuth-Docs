---
sidebar_position: 7
---

# Starting the authentication flow

## CentralAuth NPM library

When using the CentralAuth NPM library, you can start the authentication flow by calling the `login` method on the `CentralAuthClass` instance. This method will redirect the user to the CentralAuth login page. The `login` method takes a `Request` object as an argument and returns a `Response` object. The `Response` object will contain the redirect URL to the CentralAuth login page. The second argument of the `login` method is an optional config object that can be used to customize the login flow. The config object can contain the following properties:

- `returnTo`: The URL to redirect the user to after a successful login. The origin of the URL must match any registered [whitelist domain](/admin/dashboard/organization/settings#whitelist-domains) on the CentralAuth organization. If this property is not set, the user will be redirected any `return_to` query parameter in the URL. If there is no `return_to` query parameter, the user will be redirected to the referrer URL. Lastly, if there is no referrer URL, the user will be redirected to the origin of the current request URL.
- `email`: The email address of the user to log in. Only use this property if you are sure which user is about to log in.
- `state`: A string that will be passed to the callback URL. This string can be used to store any information you want to pass to the callback URL. The `state` parameter is a way to maintain state between the request and callback. It is recommended to use a random but verifiable string for this parameter to prevent CSRF attacks.
- `errorMessage`: An error message to show at the top of the CentralAuth login page. This way you can inform the user about the error that occurred while starting a new login flow.
- `translations`: A base64 stringified JSON object that contains the translations for the CentralAuth login page. This object can be used to customize the text on the login page. See the [translations](/developer/translations) section for more information.

:::info
When using the `CentralAuthHTTPClass` subclass, the login method is called `loginHTTP`. This method takes a `HTTPRequest` and `HTTPResponse` object. The `loginHTTP` method does not return a `Response` object, but instead sends the redirect response directly to the client.
:::