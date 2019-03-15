const serverConfig = require('./serverConfig');
const { Pool } = require("pg");
const pool = new Pool(serverConfig);

const sessionController = {};

// Middleware Methods

sessionController.setCookie = (req, res, next) => {
  res.cookie('session_id', res.locals.session_id);
  res.cookie('user_id', res.locals.user_id);
  next();
};

sessionController.startSession = (req, res, next) => {
  const query = {
    name: 'create-session',
    text: 'INSERT into sessions ("usersession") values ($1);',
    values: [res.locals.session_id]
  };

  pool.query(query)
    .then(result => {
      res.status(201).send(result);
    });
};

sessionController.endSession= (req, res, next) => {
  const sid = req.cookies.session_id;
  const query = {
    name: 'end-session',
    text: 'DELETE FROM sessions WHERE "usersession"= $1;',
    values: [sid]
  };
  pool.query(query)
    .then(result=>{
      next();
    })
}

sessionController.clearCookies= (req, res, next) => {
  res.clearCookie('session_id');
  res.clearCookie('user_id');
  res.json({loggedout:true})
}

module.exports = sessionController;
