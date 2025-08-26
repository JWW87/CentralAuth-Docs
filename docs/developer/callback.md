---
sidebar_position: 8
---

# Handling the callback

## CentralAuth NPM library

When using the CentralAuth NPM library, you can handle the callback by calling the `callback` method on the `CentralAuthClass` instance. This method will handle the callback when a successfully authenticated user returns to your application from CentralAuth. The `callback` method takes a `Request` object as an argument and returns a `Response` object. The `Response` object will contain the return URL to redirect the user to your application. The second argument of the `callback` method is an optional config object that can be used to hook into the callback flow. The config object can contain the following properties:

- `onStateReceived`: A method that will be called with the `state` parameter from the callback URL. This callback can be used to verify the state and perform any additional actions you want to take when the state is received. This method takes two arguments: the request object that was passed to the `callback` method and the state parameter from the callback URL. Return `true` to continue the callback flow or `false` to abort.
- `onAfterCallback`: A method that can be used to perform any additional actions you want to take after the callback flow is completed. This method takes three arguments: the request object that was passed to the `callback` method, the response object that will be returned from the `callback` method and the user object of the currently logged in user. You can use this method to perform any additional actions you want to take after the callback flow is completed, such as redirecting the user to a different page. The callback should return a `Response` object or `null` to return the original response object.

:::note
When using the `CentralAuthHTTPClass` subclass, the callback method is called `callbackHTTP`. This method takes an `IncomingMessage` and `ServerResponse` object. The `callbackHTTP` method does not return a `Response` object, but instead sends the redirect response directly to the client.
:::

:::note
When using the `CentralAuthHTTPClass` subclass, the `onAfterCallback` method takes four arguments: the request object that was passed to the `callbackHTTP` method, the response object that will be returned from the `callbackHTTP` method, the `Response` object constructed in the callback method and the user object. If you want to alter the response from the callback, use the `Response` object for this. It will later be converted to the `ServerResponse` object.
:::

### Handling the callback

Your callback URL will be called with a `code` and `state` query parameter. 

The `state` parameter is the same string that was passed to the login method. This string can be used to store any information you want to pass to the callback URL. The `state` parameter is a way to maintain state between the request and callback. You can verify the state using the `onStateReceived` callback. 

:::warning
If you have enabled autologin, the `state` parameter will be checked multiple times. Be sure to be able to verify the state for every whitelist domain on your organization.
:::

The `code` parameter is a short-lived code that can be exchanged for a long-lived access token. This exchange will be handled automatically by the library.

The long-lived access token will be stored in a cookie in the user's browser. This cookie will be used to authenticate the user on subsequent requests. The cookie will be set with the `HttpOnly` and `Secure` flags, which means that it cannot be accessed by JavaScript and will only be sent over HTTPS connections.

## Manual integration

If you cannot use the NPM library, you can handle the callback manually. The callback URL will be called with a `code` and `state` query parameter.

The `state` parameter is the same string that was passed to the login URL. Verify that this string is the same as the one you passed to the login URL, otherwise the request might be a CSRF attack. Abort the callback flow if the state does not match.

:::warning
If you have enabled autologin, the `state` parameter will be checked multiple times. Be sure to be able to verify the state for every whitelist domain on your organization.
:::

The `code` parameter is a short-lived code that can be exchanged for a long-lived access token. Your OAuth library should handle this exchange automatically by using a `getToken` method or similar. 

If you have to handle this manually, you have to make a POST request to the CentralAuth token verification endpoint. The base URL for the token endpoint is `https://centralauth.com/api/v1/verify`. The POST body must contain the following parameters:
- `code`: The code that was returned in the callback URL.
- `redirect_uri`: The callback URL of your application. This URL must match the `redirect_uri` parameter that was passed to the login URL.
- `code_verifier`: Optional. The code verifier that was used to create the code challenge. This value must match the original code verifier that was generated during the login flow. When using a client secret, the code verifier can be omitted.

When using a client secret, set the `Authorization` header of the request to a base64 encoded string of the client ID and client secret of your application, separated by a colon. The client ID and client secret can be found on the CentralAuth dashboard. The format of the header is `Basic base64(client_id:client_secret)`. The `client_id` and `client_secret` can be found on the [integration](/admin/dashboard/organization/integration) page of the CentralAuth dashboard.

<details>
<summary>CURL example (with client secret)</summary>

Replace `CLIENT_ID`, `CLIENT_SECRET`, `RECEIVED_CODE` and `REDIRECT_URI` with the values of your application. 

```bash
# Create the Authorization header by base64 encoding "CLIENT_ID:CLIENT_SECRET"
AUTH_HEADER=$(echo -n "CLIENT_ID:CLIENT_SECRET" | base64)

curl -X POST https://centralauth.com/api/v1/verify \
  -H "Authorization: Basic $AUTH_HEADER" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "code=RECEIVED_CODE" \
  -d "redirect_uri=REDIRECT_URI"
```
</details>

<details>
<summary>CURL example (with code verifier)</summary>

Replace `RECEIVED_CODE`, `REDIRECT_URI` and `CODE_VERIFIER` with the values of your application. 

```bash
curl -X POST https://centralauth.com/api/v1/verify \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "code=RECEIVED_CODE" \
  -d "redirect_uri=REDIRECT_URI" \
  -d "code_verifier=CODE_VERIFIER"
```
</details>

The response of the request will contain the following parameters:
- `access_token`: The long-lived access token that can be used to authenticate the user on subsequent requests. It does not contain the user information, but can be be used to request the user information from the CentralAuth server.
- `id_token`: The ID token is an access token that also contains the user information. This token is a JWE token that can be decoded using your client secret for direct access to the user information. Please note that while this is a faster way to retrieve the user information, it is also less secure. See the [getting the user info](/developer/userinfo) section for more information.
- `expires_in`: The time in seconds until the access token expires. 
- `expires_at`: The datetime when the access token expires.

## Error handling

If something went wrong during the authentication process, the callback URL will be called with an `error_code` and `error_message` query parameter. The error code is an enum that can be used to identify the error. The error message is a human readable string that describes the error. The error message can be used to display an error message to the user. See the [error handling](/developer/error-handling) section for more information on how to handle errors.