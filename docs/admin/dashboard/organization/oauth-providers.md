---
sidebar_position: 3
---

# OAuth providers

This tab shows all OAuth providers you have enabled for this organization. 

## Adding a new OAuth provider

Click the `Add OAuth provider` button to add a new OAuth provider. You can choose from the following providers:

- Google
- GitHub
- Microsoft

## OAuth credentials

All OAuth providers work out of the box with the default CentralAuth credentials. Using the default credentials, users see the CentralAuth logo when they log in with an OAuth provider. You can, however, use your own credentials to show your organization's logo instead. 

To use your own credentials, select the `Use your own credentials` option for each OAuth provider you enable and enter the following information:

- **Client ID**: The unique ID for this provider to use in your application.
- **Client Secret**: The secret key for this provider to use in your application.

Both client ID and client secret can be found in the developer console of the respective provider. Please check the provider's documentation for more information:

- [Google Identity docs](https://developers.google.com/identity/protocols/oauth2)
- [Microsoft Entra ID docs](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)
- [GitHub OAuth docs](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

:::warning
OAuth providers using the default CentralAuth credentials only work with the default CentralAuth domain. If you want to use your own custom domain, you have to use your own credentials. Any OAuth provider using the default CentralAuth credentials will not be enabled on the login screen on custom domains.
:::

## Disabling an OAuth provider

To disable an OAuth provider, click the trash icon next to the provider you want to disable.