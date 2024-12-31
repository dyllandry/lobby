import { dynamodbDocumentClient } from "./dynamodb-client";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

type Lobby = {
  id: string;
  data: {
    players: Player[];
  };
  createdAt: string;
  updatedAt: string;
};

type Player = {
  id: string;
  name: string | null;
  avatar: string | null;
};

export const addPlayer = async (lobbyId: string): Promise<Player> => {
  const newPlayer: Player = {
    id: createId(),
    name: null,
    avatar: null,
  };
  await dynamodbDocumentClient.send(
    new UpdateCommand({
      TableName: "lobby",
      Key: { id: lobbyId },
      // "data" is a reserved keyword. Using #d as an expression attribute name
      // allows us to use "data" as an attribute name. For more info:
      // <https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ExpressionAttributeNames.html>
      ExpressionAttributeNames: { "#d": "data" },
      ExpressionAttributeValues: {
        ":newPlayer": [newPlayer],
      },
      UpdateExpression: "SET #d.players = list_append(#d.players, :newPlayer)",
    })
  );
  return newPlayer;
};

export const removePlayer = async (lobbyId: string, playerId: string) => {
  const lobbyResponse = await dynamodbDocumentClient.send(
    new GetCommand({ TableName: "lobby", Key: { id: lobbyId } })
  );
  if (!lobbyResponse.Item) {
    throw new Error(
      `Cannot remove player ${playerId} from lobby ${lobbyId}, lobby not found.`
    );
  }
  const lobby = lobbyResponse.Item as Lobby;
  const playerIndex = lobby.data.players.findIndex((p) => p.id === playerId);
  if (playerIndex == -1) {
    throw new Error(
      `Cannot remove player ${playerId} from lobby ${lobbyId}, player not found.`
    );
  }
  await dynamodbDocumentClient.send(
    new UpdateCommand({
      TableName: "lobby",
      Key: { id: lobbyId },
      ExpressionAttributeNames: { "#d": "data" },
      UpdateExpression: `REMOVE #d.players[${playerIndex}]`,
    })
  );
};

export const get = async (id: string): Promise<Lobby | null> => {
  const getCommand = new GetCommand({
    TableName: "lobby",
    Key: { id },
  });
  const response = await dynamodbDocumentClient.send(getCommand);
  return response.Item ? (response.Item as Lobby) : null;
};

export const put = async (): Promise<Lobby> => {
  const lobbyItem = {
    id: createId(),
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
      id,
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
