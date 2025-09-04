---
sidebar_position: 3
---

# Direct authentication

Direct authentication is a method of authenticating users by sending their email address to the CentralAuth API. This method is useful for applications that want to authenticate users without redirecting them to the CentralAuth login page. When using this method, an email will be sent with a one-time login link. The user can click on the link to log in to the application.

:::info
Using this method, the login type is set to `login link` and the login method is set to `local`, irrespective of the setting on your organization.
:::

:::caution
This method is not recommended for most applications, as it does not support all authentication methods and does not provide protection against suspicious activity. It is important to implement security measures to protect against suspicious activity and form spam when using this method.
:::

:::note
Direct authentication is only available on the **Pro** and **Enterprise** plans and only for web applications.
:::

## CentralAuth NPM library

When using the CentralAuth NPM library, you can start the direct authentication by calling the `authenticateDirect` method on the `CentralAuthClass` instance. The `authenticateDirect` method takes a `Request` object as an argument and returns a login attempt object. The second argument of the `authenticateDirect` method is a config object that can contain the following properties:

- `email`: The email address of the user to authenticate. This property is required.
- `returnTo`: The URL to redirect the user to after a successful login. The origin of the URL must match any registered [whitelist domain](/admin/dashboard/organization/settings#whitelist-domains) on the CentralAuth organization. If this property is not set, the user will be redirected any `return_to` query parameter in the URL. If there is no `return_to` query parameter, the user will be redirected to the referrer URL. Lastly, if there is no referrer URL, the user will be redirected to the origin of the current request URL.
- `state`: A string that will be passed to the callback URL. This string can be used to store any information you want to pass to the callback URL. The `state` parameter is a way to maintain state between the request and callback. It is recommended to use a random but verifiable string for this parameter, unique to this user, to prevent CSRF attacks.
- `translations`: An object that contains the translations for the CentralAuth login page. This object can be used to customize the text on the login page. See the [translations page](/developer/translations) section for more information.

:::info
When using the `CentralAuthHTTPClass` subclass, the login method is called `authenticateDirectHTTP`. This method takes an `IncomingMessage` and the config object described above.
:::

## Manual integration

If you cannot use the NPM library, you can start the direct authentication by making a POST request to the CentralAuth API. The base URL for the direct authentication endpoint is `https://centralauth.com/api/v1/authenticate_direct`. The POST body can contain the following parameters:

- `email`: The email address of the user to authenticate. This parameter is required.
- `redirect_uri`: The URL to redirect the user to after a successful login. The origin of the URL must match any registered [whitelist domain](/admin/dashboard/organization/settings#whitelist-domains) on the CentralAuth organization. This parameter is required.
- `state`: A string that will be passed to the callback URL. This string can be used to store any information you want to pass to the callback URL. The `state` parameter is a way to maintain state between the request and callback. It is recommended to use a random but verifiable string for this parameter, unique to this user, to prevent CSRF attacks. This parameter is required.
- `translations`: An object that contains the translations for the email containing the login link. See the [translations page](/developer/translations) section for more information. This parameter is optional.

Set the `Authorization` header of the request to a base64 encoded string of the client ID and client secret of your application, separated by a colon. The client ID and client secret can be found on the CentralAuth dashboard. The format of the header is `Basic base64(client_id:client_secret)`. The `client_id` and `client_secret` can be found on the [integration](/admin/dashboard/organization/integration) page of the CentralAuth dashboard.

<details>
<summary>CURL example</summary>

Replace `CLIENT_ID`, `CLIENT_SECRET`, `EMAIL_ADDRESS`, `YOUR_CALLBACK_URL`, `YOUR_STATE_VALUE`, and `TRANSLATIONS_OBJECT` with the appropriate values.

```bash
# Create the Authorization header by base64 encoding "CLIENT_ID:CLIENT_SECRET"
AUTH_HEADER=$(echo -n "CLIENT_ID:CLIENT_SECRET" | base64)

curl -X POST https://centralauth.com/api/v1/authenticate_direct \
  -H "Authorization: Basic $AUTH_HEADER" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "EMAIL_ADDRESS",
    "redirect_uri": "YOUR_CALLBACK_URL",
    "state": "YOUR_STATE_VALUE",
    "translations": "TRANSLATIONS_OBJECT"
  }'
```
</details>

The response of the request will contain a login attempt object in JSON format.

## The login attempt object

The `authenticateDirect` method returns a login attempt object. This object contains the following optional properties:
- `loginAttemptId`: The ID of the login attempt when it was created successfully. This ID can be used to track the status of the login attempt.
- `token`: A hashed token for this login attempt when it was created successfully.
- `sentence`: This sentence is generated by the CentralAuth API and is unique to this login attempt. It is recommended to display this sentence to the user to help them identify the login attempt.
- `allowedDate`: An ISO date string of the date when the user is allowed to log in using this email address. This date is set to an increasing value each time the user attempts to log in to prevent brute forcing and spam to this email address. Be sure to handle this date appropriately in your application.

## Next step

After the user has logged in, they will be redirected to the callback URL specified. See the [Handling the callback](/developer/callback) section for more information.