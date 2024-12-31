import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { dynamodbClient } from "./dynamodb-client";

export const get = async (id: string) => {
  const command = new GetItemCommand({
    TableName: "lobby",
    Key: { lobbyId: { S: id } },
  });
  const response = await dynamodbClient.send(command);
  return response.Item;
};

export const create = async () => {
  const lobbyItem = {
    lobbyId: {
      S: createId(),
    },
    data: {
      M: {
        players: {
          L: [],
        },
      },
    },
    createdAt: {
      S: Date.now().toString(),
    },
    updatedAt: {
      S: Date.now().toString(),
    },
  };
  const command = new PutItemCommand({
    TableName: "lobby",
    Item: lobbyItem,
  });
  await dynamodbClient.send(command);
  return lobbyItem;
};

export const deleteItem = async (id: string) => {
  const command = new DeleteItemCommand({
    TableName: "lobby",
    Key: {
      lobbyId: {
        S: id,
      },
    },
  });
  await dynamodbClient.send(command);
};

const createId = () => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const idLength = 10;
  let id = "";
  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    const randomChar = chars[randomIndex];
    id += randomChar;
  }
  return id;
};
