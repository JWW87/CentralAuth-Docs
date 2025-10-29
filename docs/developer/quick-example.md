---
sidebar_position: 4
---

# Quick example

First, we will be showing a quick example of how to use the CentralAuth NPM library in a Next.js application. This will give you a good idea of how to use the library and what it can do. After that, we will go into more detail about the different features and how to use them.

## Step 1: Create a new Next.js application

```bash
npx create-next-app@latest --ts --tailwind --turbopack --yes my-auth-app
cd my-auth-app
```

## Step 2: Install the library

```bash
npm install --save centralauth
```

## Step 3: Create an environment declaration file

Create a new file `environment.d.ts` in the root of your project and add the following code:

```typescript
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_ORGANIZATION_ID: string;
      AUTH_SECRET: string;
      AUTH_BASE_URL: string;
    }
  }
}

export { };
```

## Step 4: Create a new environment file

Create a new file `.env` in the root of your project and add the following environment variables:

```env
AUTH_ORGANIZATION_ID=your_organization_id
AUTH_SECRET=your_secret
AUTH_BASE_URL=https://your_auth_base_url
```
Replace the example values with the values you got from the CentralAuth dashboard. The `AUTH_BASE_URL` is the URL you use to redirect to CentralAuth, which will either be `https://centralauth.com`, a CentralAuth subdomain or your own [custom domain](/admin/dashboard/organization/settings#custom-domains). The `AUTH_ORGANIZATION_ID` and `AUTH_SECRET` are the client ID and secret that are used to authenticate your application with CentralAuth. See the [integration page](/admin/dashboard/organization/integration) for more information.

## Step 5: Update config file

You might need to update your `next.config.js` file to enable the NPM package support in Turbopack. Update the file to look like this:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Other config options...
  transpilePackages: ["centralauth"]
};

module.exports = nextConfig;
```

## Step 6: Create a new API route for authentication

Create the folder `app/api/auth/[action]` and create a new file `route.ts` inside it. This will be the API route that will handle authentication requests.

## Step 7: Add a GET method

```tsx
export async function GET(req: Request, props: { params: Promise<{ action: string }> }) {
  const { action } = await props.params;

  const requestUrl = new URL(req.url);
  const searchParams = requestUrl.searchParams;
}
```

This method will handle requests to the `/api/auth/[action]` route. The `action` parameter will be used to determine what action to take.

## Step 8: Instantiate the CentralAuth class

```tsx
import { CentralAuthClass } from "centralauth/server";

export async function GET(req: Request, props: { params: Promise<{ action: string }> }) {
  const { action } = await props.params;
  
  const requestUrl = new URL(req.url);
  const searchParams = requestUrl.searchParams;

  const authClient = new CentralAuthClass({
    clientId: process.env.AUTH_ORGANIZATION_ID,
    secret: process.env.AUTH_SECRET,
    authBaseUrl: process.env.AUTH_BASE_URL,
    callbackUrl: `${requestUrl.origin}/api/auth/callback`
  });
}
```

## Step 9: Handle the actions

We will make a try-catch block to handle the different actions. The `login` action will redirect the user to the CentralAuth login page, the `callback` action will handle the callback from CentralAuth, the `user` action will return the user information, and the `logout` action will log the user out.

```tsx
import { CentralAuthClass } from "centralauth/server";
import { headers } from "next/headers";

export async function GET(req: Request, props: { params: Promise<{ action: string }> }) {
  const { action } = await props.params;
  const headerList = await headers();
  
  const requestUrl = new URL(req.url);

  const authClient = new CentralAuthClass({
    clientId: process.env.AUTH_ORGANIZATION_ID,
    secret: process.env.AUTH_SECRET,
    authBaseUrl: process.env.AUTH_BASE_URL,
    callbackUrl: `${requestUrl.origin}/api/auth/callback`
  });

  try {
    if (action == "login")
      return await authClient.login(req);
    if (action == "callback")
      return await authClient.callback(req);
    if (action == "user")
      return await authClient.user(headerList);
    if (action == "logout")
      return await authClient.logout(req);
  } catch (error: unknown) {
    console.log(error);
  }
}
```

## Step 10: Create a new page for the login

Edit the existing page file `app/page.tsx` and add the following code:

```tsx
/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useUser } from "centralauth/client";

export default function Home() {
  const { user } = useUser();

  return <div className="min-h-screen flex flex-col justify-center items-center gap-8 p-8 font-[family-name:var(--font-geist-sans)]">
    {!!user && <>
      <p>{`You are logged in as ${user.email}.`}</p>
      <a
        className="rounded-full border border-solid border-gray-600 px-8 py-2"
        href="/api/auth/logout"
      >Log out</a>
    </>}

    {user === null && <a
      className="rounded-full border border-solid border-gray-600 px-8 py-2"
      href="/api/auth/login"
    >Log in</a>}
  </div>
}
```

This page will display the user's email address if the user is logged in, and a login button if the user is not logged in.

## Step 11: Run the application

That's it! You can now run the application using the following command:

```bash
npm run dev
```

Navigate to `http://localhost:3000` to see the login button. When you click the login button, you will be redirected to the CentralAuth login page. After logging in, you will be redirected back to your application and see your email address displayed on the page.

### Next steps

Next, we will go into more detail about the different features of CentralAuth and how to implement them in your application. 