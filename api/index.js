const { ipcMain } = require('electron');
const fastify = require('fastify')({ logger: true })
const routes = require('./routes');
const DiscordClient = require('../bot/index');
const fetch = require('node-fetch');

//initialise DB
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ projects: [], collections: [], experiments: [], auth: {} }).write();

function generateResponse(event, data, command) {
  const [replyPort] = event.ports
  replyPort.start();
  command(db, data).then(result => {
    replyPort.postMessage(result);
    replyPort.close();
  });
}

var discordPort = null;

function handleDiscordResponse(event, data, route) {

  if (route.name === 'discord:connect-to-bot') {
    console.log('Connecting to MJRW Front-End...');
    [discordPort] = event.ports;
    discordPort.start();

    DiscordClient.messageCallback = function(message) {
      var msg = parseDiscMessage(message);
      discordPort.postMessage(msg);
      //writeToPromptHistory(msg);
    }

    discordPort.postMessage('connected');
    return;
  }

  if (route.name === 'discord:start-experiment') {
    DiscordClient.isExperimenting = true;
  }

  if (route.name === 'discord:stop-experiment') {
    DiscordClient.isExperimenting = false;
  }

  const [replyPort] = event.ports
  replyPort.start();
  route.func(db, data).then(result => {
    replyPort.postMessage(result);
    replyPort.close();
  });
  
}

function parseDiscMessage(msg) {

  let initialPrompt = msg.content;
  let fullPrompt = initialPrompt.split('**')[1];

  let flagCheck = initialPrompt.split('--');
  if (flagCheck.length > 2) {
    //
  }

  var pl = {
    prompt: fullPrompt,
    created: msg.createdTimestamp,
    id: msg.id,
    content: msg.content
  }

  return pl;
}

//api routes for renderer
for (let route of routes) {
  ipcMain.on(route.name, (event, data) => {
    if (route.name.startsWith('discord:')) {
      handleDiscordResponse(event, data, route);
    }
    else {
      generateResponse(event, data, route.func);
    }
  })
};

//api routes for discord bot
fastify.get('/authorise', (request, reply) => {

  var auth_details = db.get('auth').value();
  if (request.query.code) auth_details.code = request.query.code;
  if (request.query.guild_id) auth_details.guild = request.query.guild_id;
  db.set('auth', auth_details).write();

  reply
  .code(200)
  .header('Content-Type', 'application/json; charset=utf-8')
  .send('OK');

  //trigger oauth flow
  exchangeTokens(request.query.code);

});

function exchangeTokens(code) {

  const params = new URLSearchParams();
  params.append('client_id', process.env.CLIENT_ID);
  params.append('client_secret', process.env.CLIENT_SECRET);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'http://localhost:1337/authorise');

  fetch('https://discord.com/api/v10/oauth2/token', {
          method: 'post',
          body:    params,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .then(res =>res.json())
      .then(json => {
        var auth_details = db.get('auth').value();
        if (json.access_token) auth_details.access_token = json.access_token;
        if (json.refresh_token) auth_details.refresh_token = json.refresh_token;
        db.set('auth', auth_details).write();
      });

}

fastify.listen({ port: 1337 });