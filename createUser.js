export async function createUser(data) {
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
  
    const command = new AdminCreateUserCommand(user);
    try {
      const createRes = await cognitoClient.send(command);
      logger.info(`Created user: [${JSON.stringify(createRes)}]`);
  
      const addUserToGroupParams = {
        UserPoolId: process.env.AWS_COGNITO_POOL_ID,
        Username: data.email,
        GroupName: data.group,
      };
  
      const addUserToGroupCommand = new AdminAddUserToGroupCommand(addUserToGroupParams);
      const addRes = await cognitoClient.send(addUserToGroupCommand);
      logger.info(`Added user to group: [${JSON.stringify(addRes)}]`);
    } catch (error) {
      logger.error(`Error creating user: ${error}`);
      throw new Error("Error creating user.");
    }
  }