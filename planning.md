This would be a lobby system I can use to host multiplayer games with friends.

features
- admin login
- admin create lobby
- user join & leave lobby
- user enter name & pick avatar
- see other users in lobby

technical stuff
- web client
    - admin authentication
    - lobby view components
    - client disconnect & reconnect logic
- functions api
    - lobby api
        - create lobby
            - requires admin auth
        - join lobby
        - get lobby info
- dynamodb
    - lobby#123, lobby#123#players

steps
1. dynamodb
1. functions api
1. web client

dev steps
1. refresh on dynamodb, model lobby data structure
1. setup local dynamodb
1. setup db models
1. write tests for models
1. write functions api with tests

# dynamodb

Item Collection: group of items that share the same partition key value

lobby table
PK: lobby1234
Attributes
    - data: json
        ```
        {
            "players": [{
                "name": "dylan",
                "avatar": "green-dragon"
            },{
                "name": "vicky",
                "avatar": "blue-turtle"
            }]
        }
        ```
    - created-at: unix time
    - updated-at: unix time

- [ ] Let's try using the highlevel api next to see if it abstracts away the marshaling with lobbyId: { S: "abc" } to just lobbyId: "abc"