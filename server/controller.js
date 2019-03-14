const serverConfig = require('./serverConfig');
const { Pool } = require("pg");
const pool = new Pool(serverConfig);

const uuid = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 3;

const controller = {};

// Middleware Methods

controller.getUserIdByUsername = (req, res, next) =>{
  const username = req.query.username;
  const query ={
    name: 'get-user-id',
    text: 'SELECT user_id from accounts WHERE username = $1',
    values: [username]
  }
  pool.query(query)
    .then((result)=>{
      res.locals.userInfo = result.rows[0];
      next();
    })
}

controller.getAccountInfo = (req, res, next) => {
  const id = req.cookies.user_id
  const query = {
    name: 'get-account-info',
    text: 'SELECT * FROM accounts WHERE user_id = $1',
    values: [id]
  }
  pool.query(query)
    .then((result) => {
      res.locals.userInfo = result.rows[0];
      next();
    })
}

controller.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const query = {
    name: 'verify-user',
    text: `SELECT * FROM accounts WHERE username = $1`,
    values: [username]
  };

  pool.query(query)
    .then(result => {

      const hash = result.rows[0].password;
      bcrypt.compare(password, hash, function (err, judgement) {

        if (judgement) {
          const session_id = uuid();
          res.locals.session_id = session_id;
          res.locals.user_id = result.rows[0].user_id;
          next();
        } else {
          res.status(403).send('wrong pass :(');
        };
      });
    })
    .catch(err => console.error(err.stack));
};

controller.createUser = (req, res, next) => {
  const { fullname, username, email, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    const query = {
      name: 'create-user',
      text: 'INSERT INTO accounts(fullname, username, email, password) VALUES($1, $2, $3, $4) RETURNING user_id;',
      values: [fullname, username, email, hash]
    };

    pool.query(query)
      .then(result => {
        const session_id = uuid();
        res.locals.session_id = session_id;
        res.locals.user_id = result.rows[0].user_id;
        next();
      })
      .catch(err => console.error(err.stack));
  });
};

module.exports = controller;
