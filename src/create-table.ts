import {
  CreateTableCommand,
  DeleteTableCommand,
  DynamoDBClient,
  ListTablesCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "ca-central-1",
  endpoint: "http://localhost:8000",
});

main();

async function main() {
  await listTables();
  await createTable();
  // await deleteTable();
  await listTables();
}

async function createTable() {
  const command = new CreateTableCommand({
    TableName: "Lobby",
    AttributeDefinitions: [
      {
        AttributeName: "LobbyId",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "LobbyId",
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });

  const response = await client.send(command);
  console.log(response);
  return response;
}

async function deleteTable() {
  const command = new DeleteTableCommand({
    TableName: "Lobby",
  });

  const response = await client.send(command);
  console.log(response);
  return response;
}

async function listTables() {
  const command = new ListTablesCommand({});
  const response = await client.send(command);
  console.log(response);
  return response;
}
