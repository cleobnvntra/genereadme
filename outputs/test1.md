# createUser

## Overview
The `createUser` function is an asynchronous function used to create a new user in an AWS Cognito user pool. It takes in a `data` object that contains the user's email, temporary password, name, and group.

## Function Parameters
```javascript
{
  "email": string,
  "temporaryPassword": string,
  "name": string,
  "group": string
}
```

## User Creation Process
The function creates a new user object with the provided data and uses the `AdminCreateUserCommand` to send the request to AWS Cognito.

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

## Adding User to Group
After creating the user, the function adds the user to the specified group using the `AdminAddUserToGroupCommand`.

```javascript
const addUserToGroupParams = {
  UserPoolId: process.env.AWS_COGNITO_POOL_ID,
  Username: data.email,
  GroupName: data.group,
};

const addUserToGroupCommand = new AdminAddUserToGroupCommand(addUserToGroupParams);
```

## Error Handling
The function catches any errors that occur during the user creation process and logs the error before throwing a new error.

```javascript
catch (error) {
  logger.error(`Error creating user: ${error}`);
  throw new Error("Error creating user.");
}
```

