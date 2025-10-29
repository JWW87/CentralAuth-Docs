---
sidebar_position: 2
---

# PHP

This example shows how to use CentralAuth in a PHP application. It demonstrates how to start the authentication flow, handle the callback, and log out the user. We will be using the League OAuth2 client library with the CentralAuth provider library.

## Installation

First, install the required dependencies using Composer:

```bash
composer require league/oauth2-client centralauth/oauth2-centralauth
```

## Step-by-step Implementation

### Step 1: Create the OAuth2 Provider

```php
<?php
session_start();
require_once 'vendor/autoload.php';

use League\OAuth2\Client\Provider\GenericProvider;
use CentralAuth\OAuth2\Client\Provider\CentralAuth;

// Function to create and return the CentralAuth provider instance
function get_provider()
{
  return new CentralAuth([
    'clientId'          => 'your-client-id',
    'clientSecret'      => 'your-client-secret',
    'redirectUri'       => 'https://your-app.com/callback',
    'urlAuthorize'      => 'https://centralauth.com/login', // or your custom domain or CentralAuth subdomain
    'urlAccessToken'    => 'https://centralauth.com/api/v1/verify', 
    'urlResourceOwnerDetails' => 'https://centralauth.com/api/v1/userinfo', 
  ]);
}

$provider = get_provider();
```

:::caution
It is recommended to store sensitive information like `clientId` and `clientSecret` in environment variables or a secure configuration file, not directly in the code.
:::

### Step 2: Start Authentication Flow

```php
// Generate authorization URL
$authorizationUrl = $provider->getAuthorizationUrl();

// Store the state parameter for CSRF protection
$_SESSION['oauth2state'] = $provider->getState();

// Redirect user to authorization URL
header('Location: ' . $authorizationUrl);
exit;
```

### Step 3: Handle the Callback

```php
// Verify state parameter
if (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {
  unset($_SESSION['oauth2state']);
  exit('Invalid state');
}

try {
  // Get access token
  $accessToken = $provider->getAccessToken('authorization_code', [
    'code' => $_GET['code']
  ]);

  // Store access token in session
  $_SESSION['access_token'] = $accessToken->getToken();

} catch (Exception $e) {
  exit('Error: ' . $e->getMessage());
}
```

### Step 4: Get user info

```php
if (!empty($_SESSION['access_token'])) {
  // Get the user info if we have an access token
  $provider = get_provider();
  $accessToken = new AccessToken(['access_token' => $_SESSION['access_token']]);
  $resourceOwner = $provider->getResourceOwner($accessToken);
  return $resourceOwner->toArray();
}
```

## Conclusion

This example is a basic implementation of CentralAuth in a PHP application. For more information, check out the [PHP example repository](https://github.com/CentralAuth/CentralAuth-PHP-Example) and the [PHP Auth2 library repository](https://github.com/CentralAuth/CentralAuth-PHP-Library).