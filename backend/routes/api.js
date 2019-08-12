let express = require('express');
let router = express.Router();
const fetch = require("node-fetch");
const crypto = require("crypto");
require('dotenv').config()

let requests = {}
router.post('/complete', async (req, res, next) => {
  const user = req.signedCookies.u;
  if(!user) req.connection.end();

  if (requests[user])
    requests[user].connection.end();

  requests[user] = req;

  let response = await fetch(process.env.AUTOCOMPLETE_PATH, {
    method: 'POST',
    // mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'client',
    body: JSON.stringify(req.body)
  })

  response = await response.json();

  res.send(response);
  delete requests[user];
});

module.exports = router;
