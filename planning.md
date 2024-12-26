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
1. learn dynamodb lobby#123 notation
1. setup local dynamodb
1. setup db models
1. write tests for models
1. write functions api with tests
