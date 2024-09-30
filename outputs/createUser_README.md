# createUser

## Overview
The createUser function is an asynchronous function that creates a new user in an AWS Cognito user pool. The function takes a data object as an argument, which includes the user's email, temporary password, name, and group.

## Functionality

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

The function first constructs a user object with the required attributes, including the username, user pool ID, temporary password, email, and name.

## Creating the User

```javascript
const command = new AdminCreateUserCommand(user);
try {
  const createRes = await cognitoClient.send(command);
  logger.info(`Created user: [${JSON.stringify(createRes)}]`);
```

The function then creates a new AdminCreateUserCommand with the user object and sends it to the Cognito client. If the creation is successful, it logs the response.

## Adding the User to a Group

```javascript
const addUserToGroupParams = {
  UserPoolId: process.env.AWS_COGNITO_POOL_ID,
  Username: data.email,
  GroupName: data.group,
};

const addUserToGroupCommand = new AdminAddUserToGroupCommand(addUserToGroupParams);
const addRes = await cognitoClient.send(addUserToGroupCommand);
logger.info(`Added user to group: [${JSON.stringify(addRes)}]`);
```

After creating the user, the function adds the user to a group specified in the data object. It creates a new AdminAddUserToGroupCommand with the required parameters and sends it to the Cognito client. If the addition is successful, it logs the response.

## Error Handling

```javascript
catch (error) {
  logger.error(`Error creating user: ${error}`);
  throw new Error("Error creating user.");
}
```

If any error occurs during the creation or addition process, the function catches the error, logs it, and throws a new error.