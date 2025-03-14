---
sidebar_position: 3
---

# OAuth providers

This tab shows all OAuth providers you have enabled for this organization. 

## Adding a new OAuth provider

Click the `Add OAuth provider` button to add a new OAuth provider. You can choose from the following providers:

- Google
- Microsoft
- GitHub

:::tip
More providers will be added in the future. Check back soon for updates.
:::

## OAuth credentials

All OAuth providers work out of the box with the default CentralAuth credentials. Using the default credentials, users see the CentralAuth logo when they log in with an OAuth provider. You can, however, use your own credentials to show your organization's logo instead. 

To use your own credentials, select the `Use your own credentials` option for each OAuth provider you enable and enter the following information:

- **Client ID**: The unique ID for this provider to use in your application.
- **Client Secret**: The secret key for this provider to use in your application.

Both client ID and client secret can be found in the developer console of the respective provider. Please check the provider's documentation for more information:

- [Google Identity docs](https://developers.google.com/identity/protocols/oauth2)
- [Microsoft Entra ID docs](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)
- [GitHub OAuth docs](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

When setting up your own OAuth app, make sure to start the redirect URL to `https://centralauth.com/api/oauth/callback` if you're not using a custom domain. If you are using a custom domain, use that instead. For example, if your custom domain is `login.example.com`, the redirect URL should be `https://login.example.com/api/oauth/callback`.

:::warning
OAuth providers using the default CentralAuth credentials only work with the default CentralAuth domain. If you want to use your own custom domain, you have to use your own credentials. Any OAuth provider using the default CentralAuth credentials will not be enabled on the login screen on custom domains. You can find more details in the [custom domains](/admin/dashboard/organization/settings#custom-domains) section of the settings page.
:::

## Disabling an OAuth provider

To disable an OAuth provider, click the trash icon next to the provider you want to disable.