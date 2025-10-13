---
sidebar_position: 4
---

# Embedded login flow (experimental)

The embedded login flow allows you to embed the CentralAuth login page in an iframe on your website. This flow is useful if you want to provide a seamless login experience for your users without redirecting them to a different page.

:::warning
The embedded login flow is an experimental feature that may not be compatible with all browsers and devices. It is recommended to test the flow on different browsers and devices before using it in production.
:::

:::note 
The embedded login flow is only available on the **Pro** and **Enterprise** plans and only for web applications.
:::

## CentralAuth NPM library

When using the CentralAuth NPM library, you can start the embedded login flow by calling the `getEmbedScript` method on the `CentralAuthClass` instance. The `getEmbedScript` method returns a script tag that you can embed in your HTML to initiate the login flow. The script tag will automatically create an iframe on your page that contains the CentralAuth login page. The `getEmbedScript` method takes a `loginPath` and `returnPath` as arguments. The `loginPath` is your path to the CentralAuth login page, and the `returnPath` is the path to redirect the user to after a successful login. Both paths are relative to the origin of the callback URL with which the `CentralAuthClass` was initialized and start with a leading `/`. 

Steps to follow:
- Call the `getEmbedScript` method on the `CentralAuthClass` instance to get the script.
- Create a `<div>` element with the ID `centralauth-login-form` in the desired location on your page. This is where the iframe will be embedded.
- Create a `<script>` element in your HTML and set its content to the script returned by the `getEmbedScript` method.

:::tip
If you are working with a framework like Next.js, you probably have to use a different component to create the script tag. For example, in Next.js you can use the `Script` component from `next/script` to create the script tag.

```javascript	
const embedScript = authClient.getEmbedScript("/api/auth/login", "/");

return (
  <div>
    <div id="centralauth-login-form" />
    <Script id="centralauth-embed-script">{embedScript}</Script>
  </div>
);
```
:::

## Manual integration

If you cannot use the NPM library, you can embed the CentralAuth login page in an iframe on your website manually. Create an iframe element and set its `src` attribute to the login path of your application. Be sure to add an `embed` query parameter to the URL to indicate that the login page is being embedded in an iframe. The `embed` parameter should be set to `1`. You can also set the `return_to` query parameter to specify the absolute URL encoded path to redirect the user to after a successful login. Then, set an event listener on the iframe to listen for the `message` event. When the height of the embedded page changes, it will send a message to the parent window with the new height. You can then set the height of the iframe to match the height of the embedded page.

Set the `referrerpolicy` attribute to `origin` to ensure that the iframe sends the origin of the parent page as the referrer when making requests to the CentralAuth server. The referrer must be included in the [whitelist domains](/admin/dashboard/organization/settings#whitelist-domains) of the organization to allow the login page to be embedded in an iframe on your website.

Set the `allow` attribute to `publickey-credentials-get *; publickey-credentials-create *` to allow the iframe to use the WebAuthn API. Without this attribute, the iframe will not be able to use the WebAuthn API, and users will not be able to log in using passkeys.

**Example:**

Replace the source with the login URL of your application and the return URL with the URL to redirect the user to after a successful login.

```html
<iframe
  id="centralauth-embedded-login"
  src="https://example.com/api/auth/login?embed=1&return_to=https%3A%2F%2Fexample.com"
  scrolling="no"
  referrerpolicy="origin"
  allow="publickey-credentials-get *; publickey-credentials-create *"
  style="width:420px;outline:none;border:none"
></iframe>

<script>window.addEventListener("message", ({data}) => document.getElementById("centralauth-embedded-login").style.height = data + "px");</script>
```

## Next step

After the user has logged in, they will be redirected to the callback URL specified. See the [Handling the callback](/developer/callback) section for more information.