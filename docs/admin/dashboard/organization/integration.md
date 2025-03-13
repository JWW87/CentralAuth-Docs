---
sidebar_position: 2
---

# Integration

This tab shows all the information needed to integrate CentralAuth with your application. You can find the following information:

- **Domain**: The domain to which you can redirect users to log in. This is centralauth.com by default, but you can change it to your own custom domain. See the [organization settings tab](/admin/dashboard/organization/settings) for more information.
- **Client ID**: The unique ID for this organization to use in your application.
- **Client Secret**: The secret key for this organization to use in your application.

:::tip
To integrate CentralAuth with your application, you require some technical knowledge. If you need help, contact your development team or check the [developer documentation](/category/developers).
:::

## Generating a new client secret

You need a client secret to connect your application to CentralAuth. You cannot retrieve the client secret after it has been generated. When you create a new organization, you have to generate a new client secret.

To generate a new client secret:
- Click on the `Generate new secret` button.
- A popup will appear with the new client secret. Copy the client secret and set it in your application. You will not be able to retrieve it again.

:::caution
Please ensure that you save the client secret in a secure place. Treat it like a password and do not share it with anyone outside your team.
:::

- When the secret has been generated, it will not be activated immediately. You can activate it by clicking on the `Activate now` button.
- If you are not in the position to activate the secret immediately, you can activate it later by clicking on the `Activate later` button. This is useful if you cannot redeploy your application immediately.

:::note
If you choose to activate the secret later, you can activate it by clicking on the `Activate secret` button on the bottom of the page. You will be asked to enter the generated secret to activate it.
:::

- Once the secret is activated, any old secrets will be invalidated and cannot be used anymore. You can only have one active secret at a time. Any application using the old secret will stop working.

:::caution
If you lose the client secret, you will have to generate a new one. The old secret will be invalidated and cannot be used anymore.
:::