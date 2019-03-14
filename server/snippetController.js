const serverConfig = require('./serverConfig');
const { Pool } = require("pg");
const pool = new Pool(serverConfig);

const snippetController = {};

// Middleware Methods

snippetController.createSnippet = (req, res, next) => {
  const { snippet, comments, project } = req.body;
  const user_id = req.cookies.user_id;
  const date = new Date();
  const snippetQuery = {
    name: 'create-snippet',
    text: 'INSERT into snippets (snippet, comments, project, date, user_id) values ($1, $2, $3, $4, $5) RETURNING id;',
    values: [snippet, comments, project, date, user_id]
  };

  pool.query(snippetQuery)
    .then(result => {
      res.locals.snippet_id = result.rows[0].id
      next();
    })
    .catch(err => console.log(err.stack));
};

snippetController.createTags = (req, res) => {
  const promises = [];
  const snippet_id = res.locals.snippet_id;
  const tags = req.body.tags.split(", ");
  tags.forEach(tag => {
    const tagQuery = {
      name: 'create-tags',
      text: 'INSERT into tags (tag, snippet_id) values ($1, $2);',
      values: [tag, snippet_id]
    };

    promises.push(tagQuery);
  });

  Promise.all(promises)
    .then(values => {
      values.forEach(tagQuery => pool.query(tagQuery));
      res.status(201).send('Tags added.');
    })
    .catch(err => console.log(err.message));
}

snippetController.getAllUserTags = (req, res) => {
  const user_id = req.cookies.user_id;
  const query = {
    name: 'get-all-tags-for-user',
    text: 'SELECT tags.tag FROM tags INNER JOIN snippets ON snippets.id = tags.snippet_id WHERE snippets.user_id = $1;',
    values: [user_id]
  };

  pool.query(query)
    .then(result => {
      const tags = [];
      result.rows.forEach(obj => tags.push(obj.tag));
      res.json(tags);
    });
};

snippetController.getAllTags = (req, res) => {
  const query = {
    name: 'get-all-tags',
    text: 'SELECT DISTINCT tag FROM tags'
  };

  pool.query(query)
    .then(result => {
      console.log('result.rows', result.rows)
      res.json(result.rows);
    });
};

snippetController.getAllTagsForSnippets = (req, res, next) => {
  const promises = [];
  res.locals.snippets.forEach((snip) => {
    const query = {
      name: 'get-tags-for-snip',
      text: 'SELECT tag FROM tags WHERE snippet_id = $1',
      values: [snip.id]
    }
    promises.push(pool.query(query));
  })
  Promise.all(promises)
    .then(vals => {
      vals.forEach((tagArr, i) => {
        res.locals.snippets[i].tags = tagArr.rows;
      })
      next()
    })
}

snippetController.getSnippetIdsByTag = (req, res, next) => {
  const tag = req.query.tag;
  const IdQuery = {
    name: 'getSnippetIdsByTag',
    text: 'SELECT snippet_id FROM tags WHERE tags.tag = $1;',
    values: [tag]
  };

  pool.query(IdQuery)
    .then(result => {
      const resultArr = [];
      result.rows.forEach(row => resultArr.push(row.snippet_id));
      res.locals.snippets = resultArr;
      // it's an array and it looks good
      next();
    })
    .catch(err => console.error(err.stack));
};

snippetController.getSnippetsByUserId = (req, res, next) => {
  // const uid = res.locals.userInfo.user_id;
  const uid = req.cookies.user_id;
  const query = {
    name: 'get-snippets-by-user-id',
    text: 'SELECT * from snippets where user_id = $1',
    values: [uid]
  };

  pool.query(query)
    .then(result => {
      res.locals.snippets = result.rows;
      next();
    })
}

snippetController.getSnippetsBySnippetIds = (req, res) => {
  const snippetIds = res.locals.snippets;
  const userId = req.cookies.user_id;
  const promises = [];

  snippetIds.forEach(id => {
    const query = {
      name: 'getSnippetsBySnippetId',
      text: 'SELECT * FROM snippets WHERE snippets.id = $1 AND snippets.user_id = $2;',
      values: [id, userId]
    };

    promises.push(query);
  });

  Promise.all(promises)
    .then(snippetQuery => {
      const resultsArr = [];

      snippetQuery.forEach((x, y) => {
        if (y < 2) resultsArr.push(pool.query(x));
      });

      Promise.all(resultsArr)
        .then(snippets => {
          let arr = [];
          snippets.forEach(obj => arr = arr.concat(obj.rows));
          res.json(arr);
        })
        .catch(err => console.error(err.stack));
    });
};

snippetController.deleteSnippet = (req, res) => {
  const id = req.query.id;
  const deleteQuery = {
    name: 'delete-snippet',
    text: 'DELETE FROM snippets WHERE snippets.id = $1;',
    values: [id]
  };

  pool.query(deleteQuery)
    .then(data => {
      res.status(200).send('ok')
    });
};

module.exports = snippetController;
