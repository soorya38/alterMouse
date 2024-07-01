const WebSocket = require('ws');
const express = require('express');
const path = require('path');
const robot = require('robotjs');

const app = express();
const server = app.listen(8080, '0.0.0.0', () => {
  console.log('Server is listening on port 8080');
});
const wss = new WebSocket.Server({ server });

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let startx = 0, starty = 0;

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    if(message == 'clicked') {
      robot.mouseClick('left', false);
    } else {
      const touchData = JSON.parse(message);
  
      if (touchData.s === 'e') {
        const deltaX = (touchData.x - startx) * 1;
        const deltaY = (touchData.y - starty) * 1;
        
        robot.moveMouse(robot.getMousePos().x + deltaX, robot.getMousePos().y + deltaY);
        startx = touchData.x;
        starty = touchData.y;
      } else {
        startx = touchData.x;
        starty = touchData.y;
      }    
    }
  });
});
