---
sidebar_position: 5
---

# Logs

The Logs page provides a view of audit logs, mail logs and API requests. 

## Audit Logs

Audit logs provide a record of actions taken by users within the system. This includes actions such as user logins and changes to settings. Each log entry includes the following information:

- **Status**: Indicates whether the action was successful or failed.
- **IP Address**: The IP address from which the action was performed.
- **Details**: the details associated with the action.
- **Data**: Data about which user performed what action and when.

You can filter audit logs by actor type, actor Id, action type, target type, target Id, status and IP address. 

You can download audit logs as a CSV file by clicking the "Download CSV" button.

## Mail Logs

Mail logs provide a record of email communications sent from the system. Each log entry includes the following information:

- **Status**: Indicates whether the email was successfully sent or failed.
- **Details**: The details for the email.
- **Mail content**: The content of the email.
- **Sent at**: The date and time when the email was sent.
- **Recipient**: The email address of the recipient.
- **Subject**: The subject line of the email.

You can filter mail logs by organization, recipient, subject and status.

:::note
Mail content is only available for emails sent more than 15 minutes ago.
:::

## API Requests

API request logs provide a record of API requests made to the system. Each log entry includes the following information:

- **Date**: The date and time when the API request was made.
- **Endpoint**: The endpoint path of the API request.

You can filter API request logs by endpoint.