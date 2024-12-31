import { dynamodbDocumentClient } from "./dynamodb-client";
import { DeleteCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

type Lobby = {
  lobbyId: string;
  data: {
    players: Player[];
  };
  createdAt: string;
  updatedAt: string;
};

type Player = {
  name: string;
  avatar: string;
};

export const get = async (id: string): Promise<Lobby | null> => {
  const getCommand = new GetCommand({
    TableName: "lobby",
    Key: { lobbyId: id },
  });
  const response = await dynamodbDocumentClient.send(getCommand);
  return response.Item ? (response.Item as Lobby) : null;
};

export const put = async (): Promise<Lobby> => {
  const lobbyItem = {
    lobbyId: createId(),
    data: {
      players: [],
    },
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  };
  const createCommand = new PutCommand({ TableName: "lobby", Item: lobbyItem });
  await dynamodbDocumentClient.send(createCommand);
  return lobbyItem;
};

export const remove = async (id: string) => {
  const command = new DeleteCommand({
    TableName: "lobby",
    Key: {
      lobbyId: id,
    },
  });
  await dynamodbDocumentClient.send(command);
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
