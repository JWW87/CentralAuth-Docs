---
sidebar_position: 2
---

# Admins

This tab displays a list of admins on the tenant and pending invitations.

Admins are users who manage tenants and organizations in CentralAuth. Admins can create, update, and delete tenants, manage tenant/organization settings, and invite other users to join the tenant as admin. 

## Active admins
This overview displays a list of active admins on the tenant and allows you to manage their roles and permissions.

:::note
You cannot edit or delete your own admin account or the owner of the tenant.
:::

## Pending invitations
This overview displays a list of pending invitations to join the tenant. You can delete the invitation if it has not been accepted yet.

Click on the `Invite new admin` button to send an invitation. Enter the email address of the user you want to invite and select the role you want to assign to the user. The user will receive an email with a link to accept the invitation and join the tenant.

## Admin roles
There are five admin roles in CentralAuth:
- **Owner**: The owner is the creator of the tenant. The owner has full control over the tenant and can manage all settings and other admins. The owner cannot be deleted from the tenant.
- **Admin**: Admins have full control over the tenant and can manage all settings and other admins.
- **Organization admin**: Organization admins can manage organization settings but cannot manage tenant settings or users.
- **Financial admin**: Financial admins can manage billing and subscription settings but cannot manage tenant settings or users.
- **User admin**: User admins can manage users on the tenant's organizations but cannot manage tenant settings or other admins.