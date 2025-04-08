---
sidebar_position: 9
---

# Getting the user info

## CentralAuth NPM library

When using the CentralAuth NPM library, there are two ways to get the user info.

- `getUserData`: The first way is to use the `getUserData` method on the `CentralAuthClass` instance. This method takes a `Headers` object of the current request as an argument. It will return an object that contains the user info of the currently logged in user.
- `user`: The second way is to use the `user` method on the `CentralAuthClass` instance. This method takes the `Request` object of the current request as an argument. It will return a `Response` JSON object with the user info of the currently logged in user. When the user is not logged in, the `Response` object will contain `null`. If there was an error while getting the user info, the `Response` object will contain null and any access token stored in the user's cookies will be deleted.

When requesting the user info, the library will contact the CentralAuth API to get the user info. The library will use the access token stored in the user's cookies to authenticate the request. If the user's session is still valid, the object with user info will be returned.

:::caution
If you have enabled the `unsafeIncludeUser` option, the user info will be retrieved directly from the JWE token stored in the user's cookies. This option will bypass the checks on the CentralAuth server and is not recommended for production use. Only use this option if you have minimized the risk of session hijacking and you need to get the user info without the overhead of contacting the CentralAuth API. The `unsafeIncludeUser` option is disabled by default.
:::

:::tip
You can also pass a user's access token in the Authorization header of the request instead of using cookies. This is useful if you want to set up a proxy server that will forward the request to the CentralAuth API. Set the access token in the Authorization header as `Bearer <access_token>`. The library will use this access token to authenticate the request.
:::

:::note
When using the CentralAuthHTTPClass subclass, you can use the `getUserDataHTTP` and `userHTTP` methods. Both methods take an `IncomingMessage` as the first argument and the `userHTTP` method takes a `ServerResponse` object as the second argument. The `userHTTP` method does not return a `Response` object, but instead sends the redirect response directly to the client.
:::

## Manual integration

If you cannot use the NPM library, you can get the user info manually. 

Make a POST request to the CentralAuth user info endpoint. The base URL for the user info endpoint is `https://centralauth.com/api/v1/userinfo`. The POST body must contain the user's access token as plain text.

Set a `domain` query parameter to the domain of your application that the user is logged in to. The domain must match any registered [whitelist domain](/admin/dashboard/organization/settings#whitelist-domains) on the CentralAuth organization. The domain is used to verify that the user has enabled the session for that domain. If the domain does not match, the request will be rejected.

Set the `Authorization` header of the request to a base64 encoded string of the client ID and client secret of your application, separated by a colon. The client ID and client secret can be found on the CentralAuth dashboard. The format of the header is `Basic base64(client_id:client_secret)`. The `client_id` and `client_secret` can be found on the [integration](/admin/dashboard/organization/integration) page of the CentralAuth dashboard.

<details>
<summary>CURL example</summary>

Replace `CLIENT_ID`, `CLIENT_SECRET`, `YOUR_DOMAIN` and `ACCESS_TOKEN` with the values of your application and the user's session. 

```bash
# Create the Authorization header by base64 encoding "CLIENT_ID:CLIENT_SECRET"
AUTH_HEADER=$(echo -n "CLIENT_ID:CLIENT_SECRET" | base64)

curl -X POST https://centralauth.com/api/v1/userinfo?domain=YOUR_DOMAIN \
  -H "Authorization: Basic $AUTH_HEADER" \
  -H "Content-Type: text/plain" \
  -d "ACCESS_TOKEN"
```
</details>

The response of the request will contain the user's info in JSON format.

## The user info object

The user info object will contain the following properties:
- `id`: The unique ID of the user.
- `email`: The email address of the user. This is the email address that was used to log in to CentralAuth.
- `gravatar`: The [gravatar](https://www.gravatar.com) URL of the user. This URL can be used to display the user's profile picture.
- `verified`: A boolean value that indicates whether the user's email address has been verified. This value is set to `true` if the user has verified their email address, otherwise it is set to `false`.
- `blocked`: A boolean value that indicates whether the user is blocked. This value is set to `true` if the user is blocked, otherwise it is set to `false`. Keep in mind that a blocked user can still log in to CentralAuth. Your can decide the implications for a blocked user in your application.
- `organizationId`: The ID of the organization that the user belongs to.
- `created`: The date and time when the user was created.
- `updated`: The date and time when the user was last updated.