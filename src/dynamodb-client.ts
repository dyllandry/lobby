import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const dynamodbClient = new DynamoDBClient({
  region: "ca-central-1",
  endpoint: "http://localhost:8000",
});
