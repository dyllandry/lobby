import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const dynamodbClient = new DynamoDBClient({
  region: "ca-central-1",
  endpoint: "http://localhost:8000",
});

export const dynamodbDocumentClient =
  DynamoDBDocumentClient.from(dynamodbClient);
