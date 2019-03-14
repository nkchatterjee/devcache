const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// Import Controllers

const controller = require('./controller.js');
const sessionController = require('./sessionController.js');
const snippetController = require('./snippetController.js');

// Blanket Calls

app.use( (req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", ['X-PINGOTHER', 'Content-Type']);
  res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
  res.setHeader("Access-Control-Allow-Origin", 'http://localhost:8080'); // WILD CARD WILL NOT WORK WHEN POSTING 
  next();
})


app.use(cookieParser());
app.use(bodyParser.json());

// GET Endpoints

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.resolve('./index.html'));
});

app.get('/mysnippets', (req,res)=>{
  res.sendFile(path.resolve('./index.html'))
})

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.resolve('./build/bundle.js'));
});

app.get('/api/user', controller.getAccountInfo, snippetController.getSnippetsByUserId, snippetController.getAllTagsForSnippets, (req, res) => {
  const userDataWithSnippets = {
    userInfo: res.locals.userInfo,
    snippets: res.locals.snippets
  };
  res.json(userDataWithSnippets);
});

app.get('/api/getalltags', snippetController.getAllTags);

app.get('/gettags', snippetController.getAllUserTags);

app.get('/getsnippetsbyuser', controller.getUserIdByUsername, snippetController.getSnippetsByUserId, snippetController.getAllTagsForSnippets, (req, res)=>{
  res.json(res.locals.snippets);
})

app.get('/getsnippetsbytag', snippetController.getSnippetIdsByTag, snippetController.getSnippetsBySnippetIds);

app.get('/deletesnippetbyid', snippetController.deleteSnippet);

// POST Endpoints

app.post('/login', controller.verifyUser, sessionController.setCookie, sessionController.startSession);

app.post('/signup', controller.createUser, sessionController.setCookie, sessionController.startSession);

app.post('/createsnippet', snippetController.createSnippet, snippetController.createTags);

// Server Port

app.listen(3000, () => console.log('Listening on Port: 3000 .-.'));
