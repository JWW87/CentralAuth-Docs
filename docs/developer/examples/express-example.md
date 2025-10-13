---
sidebar_position: 3
---

# Express.js

This example shows how to integrate CentralAuth with an Express.js server using the CentralAuth NPM library. We'll create a simple JavaScript web application with authentication, demonstrating login, callback handling, user information retrieval and logout functionality. 

:::note
Note that this example will also work for any other Node.js framework that uses Express-style middleware.
:::

## Step 1: Create a new Express.js project

First, create a new directory and initialize a Node.js project:

```bash
mkdir my-express-auth-app
cd my-express-auth-app
npm init -y
```

## Step 2: Install dependencies

Install Express.js and the CentralAuth library along with other necessary dependencies:

```bash
npm install --save express centralauth dotenv
npm install -D nodemon
```

## Step 3: Set up environment variables

Create a `.env` file in the root of your project:

```env
AUTH_ORGANIZATION_ID=your_organization_id
AUTH_SECRET=your_secret
AUTH_BASE_URL=centralauth_base_url
PORT=3000
```

Replace the example values with:
- `AUTH_ORGANIZATION_ID` and `AUTH_SECRET`: Get these from your [CentralAuth integration page](/admin/dashboard/organization/integration)
- `AUTH_BASE_URL`: Use `https://centralauth.com` or your [custom domain](/admin/dashboard/organization/settings#custom-domains)
- `PORT`: The port your Express.js server will run on (default is 3000)

## Step 4: Create the main server file

Create a file `server.js`:

```javascript
import { CentralAuthHTTPClass } from 'centralauth/src/server.js';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize CentralAuth
const authClient = new CentralAuthHTTPClass({
  clientId: process.env.AUTH_ORGANIZATION_ID,
  secret: process.env.AUTH_SECRET,
  authBaseUrl: process.env.AUTH_BASE_URL,
  callbackUrl: `http://localhost:${PORT}/auth/callback`
});

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>CentralAuth Express Example</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          max-width: 800px; 
          margin: 50px auto; 
          padding: 20px; 
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: #333;
        }
        .container { 
          background: rgba(255, 255, 255, 0.95); 
          padding: 40px; 
          border-radius: 20px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          backdrop-filter: blur(10px);
        }
        h1 {
          color: #4a90e2;
          margin-bottom: 10px;
          font-weight: 300;
          font-size: 2.5em;
        }
        #auth-section {
          margin: 30px 0;
        }
        .btn, button.btn { 
          display: inline-block;
          padding: 12px 24px; 
          background: #007bff; 
          color: white; 
          text-decoration: none; 
          border-radius: 8px; 
          margin: 10px 8px;
          font-weight: 600;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-family: inherit;
        }
        .btn:hover, button.btn:hover { 
          background: #0056b3;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        .btn-success, button.btn-success {
          background: #28a745;
        }
        .btn-success:hover, button.btn-success:hover {
          background: #1e7e34;
        }
        .btn-danger, button.btn-danger {
          background: #dc3545;
        }
        .btn-danger:hover, button.btn-danger:hover {
          background: #c82333;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>CentralAuth Express.js Example</h1>
        <p>Welcome to the CentralAuth integration example using Express.js!</p>
        
        <div id="auth-section">
          <a href="/auth/login" class="btn">Login with CentralAuth</a>
          <a href="/profile" class="btn btn-success">View Profile</a>
          <a href="/auth/logout" class="btn btn-danger">Logout</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Authentication routes
app.get('/auth/login', async (req, res) => {
  try {
    await authClient.loginHTTP(req, res, { returnTo: `http://localhost:${PORT}/profile` });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Authentication failed');
  }
});

app.get('/auth/callback', async (req, res) => {
  try {
    await authClient.callbackHTTP(req, res);
  } catch (error) {
    console.error('Callback error:', error);
    res.status(500).send('Authentication callback failed');
  }
});

app.get('/auth/user', async (req, res) => {
  try {
    await authClient.userHTTP(req, res);
  } catch (error) {
    console.error('User info error:', error);
    res.status(500).json({ error: 'Failed to get user information' });
  }
});

app.get('/auth/logout', async (req, res) => {
  try {
    // Handle logout with CentralAuth
    await authClient.logoutHTTP(req, res, { returnTo: `http://localhost:${PORT}` });
  } catch (error) {
    console.error('Logout error:', error);
    res.redirect('/?error=logout_failed');
  }
});

// Profile page
app.get('/profile', async (req, res) => {
  let user = null;
  try {
    user = await authClient.getUserDataHTTP(req);
  } catch (error) {
    console.log('Could not fetch fresh user data');
    res.redirect('/?error=not_logged_in');
  }

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Profile - CentralAuth Express Example</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          max-width: 800px; 
          margin: 50px auto; 
          padding: 20px;
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: #333;
        }
        .container { 
          background: rgba(255, 255, 255, 0.95); 
          padding: 40px; 
          border-radius: 20px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          backdrop-filter: blur(10px);
        }
        h1 {
          color: #4a90e2;
          margin-bottom: 20px;
          font-weight: 300;
          font-size: 2.2em;
        }
        .btn, button.btn { 
          display: inline-block;
          padding: 12px 24px; 
          background: #007bff; 
          color: white; 
          text-decoration: none; 
          border-radius: 8px; 
          margin: 10px 8px;
          font-weight: 600;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-family: inherit;
        }
        .btn:hover, button.btn:hover { 
          background: #0056b3;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        .btn-success, button.btn-success {
          background: #28a745;
        }
        .btn-success:hover, button.btn-success:hover {
          background: #1e7e34;
        }
        .btn-danger, button.btn-danger {
          background: #dc3545;
        }
        .btn-danger:hover, button.btn-danger:hover {
          background: #c82333;
        }
        .user-info { 
          text-align: center;
          background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); 
          border: 1px solid #c3e6cb;
          color: #155724;
          padding: 25px; 
          border-radius: 15px; 
          margin: 25px 0;
          box-shadow: 0 4px 15px rgba(40, 167, 69, 0.1);
        }
        .user-info h3 {
          margin-bottom: 15px;
          color: #0f5132;
          font-size: 1.4em;
        }
        .success { 
          background: linear-gradient(135deg, #d1ecf1 0%, #b8daff 100%); 
          border: 1px solid #b8daff;
          color: #0c5460; 
          padding: 15px; 
          border-radius: 10px; 
          margin: 15px 0;
          font-weight: 500;
          box-shadow: 0 4px 15px rgba(13, 110, 253, 0.1);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>User Profile</h1>
        
        ${req.query.success ? '<div class="success">Successfully logged in!</div>' : ''}
        
        ${user ? `
          <div class="user-info">
            <h3>Welcome!</h3>
            <img src="${user.gravatar}" alt="User Avatar" style="border-radius: 50%; width: 80px; height: 80px; margin-vertical: 8px;">
            <p><strong>Email:</strong> ${user.email}</p>
          </div>
        ` : `
          <p>You are not logged in.</p>
        `}
        
        <div>
          <a href="/" class="btn">Back to Home</a>
          <button onclick="fetchUserInfo()" class="btn btn-success">Refresh User Info</button>
          <a href="/auth/logout" class="btn btn-danger">Logout</a>
        </div>
      </div>
      
      <script>
        async function fetchUserInfo() {
          try {
            const response = await fetch('/auth/user');
            if (response.ok) {
              const userData = await response.json();
              alert('User info: ' + JSON.stringify(userData, null, 2));
            } else {
              alert('Failed to fetch user info. Please log in.');
            }
          } catch (error) {
            alert('Error fetching user info: ' + error.message);
          }
        }
      </script>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Environment variables loaded:');
  console.log('- AUTH_ORGANIZATION_ID:', process.env.AUTH_ORGANIZATION_ID ? '✓' : '✗');
  console.log('- AUTH_SECRET:', process.env.AUTH_SECRET ? '✓' : '✗');
  console.log('- AUTH_BASE_URL:', process.env.AUTH_BASE_URL || 'Not set');
});

export default app;
```

## Step 5: Add package.json scripts

Update your `package.json` to include the necessary scripts:

```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

## Step 6: Run the application

Start your Express.js application:

```bash
# Start in development mode with auto-reload
npm run dev
# Or to run without auto-reload
npm run start
```

Navigate to `http://localhost:3000` to see your application running.