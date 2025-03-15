---
sidebar_position: 6
---

# Users

This tab shows the list of all users in this organization. Expand the filter tab for additional options:

- **Search**: Search for users by email address.
- **Users per page**: Select the number of users to display per page.
- **Sort by**: Sort users by email address or date added.

Click on a user's email address to view their profile.

## User Profile

The user profile page shows all data for this user.

- **User ID**: The unique ID of this user.
- **Email**: The email address of this user.
- **Gravatar**: The Gravatar image associated with this email address.
- **Connections**: Every connection this user has used to log in to this organization.
- **Passkeys**: The number of passkeys this user has created.
- **Email authentications**: The total number of email authentications this user has completed.
- **Session total**: The total number of sessions this user has had.
- **Verified**: Whether this user has verified their email address.
- **Blocked**: Whether this user has been blocked from this organization.

:::info
Note that a blocked user can still log in to your application. The blocked flag will be available in the user's object, allowing you to decide the implications for a blocked user in your application.
:::

### Sessions

This is an overview of all sessions for this user, including the date and time of the session, the IP address, the user agent and whether the session is still active. If a session is still active, you can terminate it remotely by clicking the `Log out` button. If you want to log out all sessions, click the `Log out all sessions` button at the top of the list. This button is only visible if the user has at least one active session.