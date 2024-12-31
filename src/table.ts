import {
  CreateTableCommand,
  DeleteTableCommand,
  ListTablesCommand,
} from "@aws-sdk/client-dynamodb";
import { dynamodbClient } from "./dynamodb-client";

export const createTable = async () => {
  const command = new CreateTableCommand({
    TableName: "lobby",
    AttributeDefinitions: [
      {
        AttributeName: "lobbyId",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "lobbyId",
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });
  await dynamodbClient.send(command);
};

export const deleteTable = async () => {
  const command = new DeleteTableCommand({
    TableName: "lobby",
  });
  await dynamodbClient.send(command);
};

export const listTables = async () => {
  const command = new ListTablesCommand({});
  const response = await dynamodbClient.send(command);
  return response;
};
