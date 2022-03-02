# chess-websocket
Socket.io websocket connection for multiplayer chess app

This has been deployed to Heroku at the URL: "https://chessyem-websocket.herokuapp.com"

# Contents
This websocket is designed to handle the chat and online multiplayer functionality of the online chess app found at https://hardcore-kepler-5bee6e.netlify.app/

# Prompts
The socket receives a variety of prompts from the frontend for varying functions
```
"new message"
```
Receives a message from a client and then broadcasts that message to all clients excluding the sender.
```
"new move"
```
Receives a move in a chess game and then broadcasts that move to the other player.
```
"join room"
```
Happens whenever someone joins the chess/chat room. It adds the player to a saved list of players, and then sends that player list to the frontend.
```
"leave room"
```
Happens whenever someone leaves the chess/chat room. It removes that player from the player list, and then sends the updated player list back to the frontend.


# To run locally
This websocket can be run locally too, on port 4000, to run this locally, you first have to initialise npm
```
npm init --yes
```
and then install express and socket.io
```
yarn add express socket.io
```
It is also recommended to install nodemon when running locally so that the websocket reloads anytime changes are made to the code
```
npm i -g nodemon
```

To run the websocket use the command 
```
nodemon chat.js



