---
sidebar_position: 5
---

# Settings

This tab allows you to configure the settings of the organization.

## General settings

- **Organization name**: The name of the organization. This name is displayed on the login screen.
- **Logo URL**: The URL of the organization's logo. The logo is displayed on the login screen.
- **Custom domain**: The custom domain of the organization. Setting a custom domain is optional, but recommended. See the [custom domains](#custom-domains) section for more information.

### Custom domains

Custom domains allow you to use your own domain for the CentralAuth login screen. This is useful if you want to use a domain that is easier to remember and more recognizable to your users. Passkeys will also be saved specifically for this domain, meaning users will only have the choice between passkeys for this specific domain.

To set up a custom domain, follow these steps:
- Enter the custom domain in the `Custom domain` field under general settings.
- Add a CNAME record to your domain's DNS settings. Ask your development team or hosting provider for help if you're not sure how to do this. Set the CNAME value to `centralauth.com.`. See the on-screen instructions for more information.
- Wait for the DNS changes to propagate. This can take up to 24 hours.
- Your custom domain will automatically be verified once the DNS changes have propagated. A certificate will be issued for your domain, and the login screen will be available at your custom domain. 
- You should see the confirmation message `Domain is configured correctly` on the settings page.

:::warning
When using a custom domain, any OAuth provider using the default CentralAuth credentials will not be enabled on the login screen. You have to use your own credentials for these providers and set them up to redirect users to your custom domain. See the [OAuth providers](/admin/dashboard/organization/oauth-providers) section for more information.
:::

## Whitelist domains

You can whitelist domains to restrict access to the CentralAuth login screen to users from specific domains. This adds an extra layer of security to your organization's login screen.

To whitelist a domain, click the `Add domain` button and enter the top-level domain you want to whitelist, starting with `https://` and without any subpath. You can whitelist multiple domains by adding them one by one. 

You can use the wildcard character `*` to whitelist all subdomains of a domain. For example, `https://*.example.com` will whitelist all subdomains of `example.com`. Remember that domains using a wildcard character cannot be used for autologin.

To remove a domain from the whitelist, click the trash icon next to the domain you want to remove.

:::caution
If you don't add any domains to the whitelist, all domains are allowed by default. It is recommended to whitelist at least one domain to restrict access to the login screen.
:::

## Organization settings

An organization will inherit the settings of the parent tenant by default. You can override these settings by enabling the `Override tenant settings` option. A new form will appear where you can configure the following settings:

- **Max session time**: The maximum time in seconds a user can stay logged in, regardless if the user is active or not. The session will expire after this time. A value of zero disables this setting.
- **Max inactivity time**: The maximum time in seconds a user can stay logged in without any activity. The session will expire after this time. A value of zero disables this setting.
- **Allow localhost**: When this setting is checked, `localhost` will be allowed as referrer and domain. Only use this if you want to log in at a development environment, otherwise leave this unchecked.
- **Check referrer during login**: When this setting is checked, the referrer of the request is checked against the whitelisted domains. Leave this checked for added security. Only uncheck this when the referrer cannot be forwarded to CentralAuth.
- **Enable autologin**: When this setting is checked, the user will be logged in automatically at all whitelisted domains, except for domains with a wildcard. Remember that the callback paths on all domains must be the same. This setting is only available when there are at least two whitelisted domains on the organization. See the [Whitelist domains](#whitelist-domains) section for more information.
- **Default login type**: A dropdown defining the login type when the user receives an authentication email.
  - **Login link**: a one-time login link the user clicks to log in. This is the fastest login type, but less secure.
  - **Challenge**: the user will be presented with three numbers and has to click the correct number shown on the screen. This is a fast and secure login type.
  - **One-time code**: the user receives an email with a 5-digit code to enter in the browser. This is the most secure login type.
- **Default login method**: A dropdown defining where the user logs in, based on the device that receives the authentication email with a login link. This option is only available when the default login type is set to `Login link`.
  - **Local**: the user will be logged in on the device that receives the authentication email.
  - **Remote**: the user will be logged in on the device on which they start the authentication flow.
  - **User choice**: let the user decide on which device to log in. The email will contain two login links.
- **Use default SMTP server**: When this setting is checked, the default CentralAuth SMTP server will be used for sending authentication emails. If you uncheck this option, you can provide your own SMTP server settings:
  - **SMTP host**: The hostname of the SMTP server, e.g. `smtp.example.com`.
  - **SMTP port**: The port of the SMTP server, e.g. `587`.
  - **SMTP from address**: The email address from which authentication emails will be sent.
  - **SMTP user**: The username to authenticate with the SMTP server.
  - **SMTP password**: The password to authenticate with the SMTP server.

## Delete organization

To delete the organization, click the **Delete this organization** button. You will be prompted to confirm the deletion. Type the confirmation text and click **Delete** to proceed with the deletion. 

:::warning
Deleting an organization will delete all users and data associated with the organization. This action cannot be undone!
:::