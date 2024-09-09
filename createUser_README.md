AWS Cognito User Creation Service
================================

## Overview

This service provides a function to create a new user in an AWS Cognito User Pool. The function also adds the newly created user to a specific group.

## Functionality

The `createUser` function takes in the user data, creates a new user in the AWS Cognito User Pool, and adds the user to a specified group.

### User Data Requirements

The `createUser` function requires the following data:

* `email`: the user's email address
* `temporaryPassword`: a temporary password for the user
* `name`: the user's name
* `group`: the group to which the user should be added

### Code Snippets

#### User Creation

```javascript
const user = {
  Username: data.email,
  UserPoolId: process.env.AWS_COGNITO_POOL_ID,
  TemporaryPassword: data.temporaryPassword,
  UserAttributes: [
    {
      Name: "email",
      Value: data.email,
    },
    {
      Name: "name",
      Value: data.name,
    },
  ],
  MessageAction: MessageActionType.SUPPRESS,
  DesiredDeliveryMediums: [DeliveryMediumType.EMAIL],
};
```

This code snippet shows how the user data is structured for the AWS Cognito User Pool.

#### User Creation Command

```javascript
const command = new AdminCreateUserCommand(user);
```

This code snippet shows how the user creation command is initialized using the `AdminCreateUserCommand` class.

#### Adding User to Group

```javascript
const addUserToGroup Params = {
  UserPoolId: process.env.AWS_COGNITO_POOL_ID,
  Username: data.email,
  GroupName: data.group,
};
```

This code snippet shows how the data for adding a user to a group is structured.

## Error Handling

The `createUser` function catches any errors that occur during the process and logs the error. If an error occurs, the function throws a new error.

```javascript
catch (error) {
  logger.error(`Error creating user: ${error}`);
  throw new Error("Error creating user.");
}
```

## Usage

To use the `createUser` function, simply call it with the required user data:

```javascript
const userData = {
  email: 'user@example.com',
  temporaryPassword: 'password',
  name: 'John Doe',
  group: 'example-group',
};

const CreateUserRes = await createUser(userData);
```