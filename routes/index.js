const express = require('express');
const router = express.Router();
// const controller = require('../controllers/replyController');

router.post('/fullresponse', async (req, res, next) => {
  console.log(req);
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.AIAPIKEY}`
    },
    body: JSON.stringify({ 
      prompt: `response to this email '${req.body.state.received}'
      with another email addressed to ${req.body.state.recipient} from 
      ${req.body.state.sender} while making sure to say ${req.body.state.coremessage}
      `,
      model: "text-davinci-003",
      max_tokens: 100,
      temperature: 0.2,
    })
  };
  let response = await fetch('https://api.openai.com/v1/completions', requestOptions);
  response = await response.json();
  console.log(response.choices[0].texte);
  return res.json(response.choices[0].text);

});

router.post('/prettify', async (req, res, next) => {
  console.log(req);
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.AIAPIKEY}`
    },
    body: JSON.stringify({ 
      prompt: `please convert '${req.body.state.casual}' to a formal email addressed 
      to ${req.body.state.recipient} from ${req.body.state.sender}
      `,
      model: "text-davinci-003",
      max_tokens: 100,
      temperature: 0,
    })
  };
  let response = await fetch('https://api.openai.com/v1/completions', requestOptions);
  response = await response.json();
  console.log(response.choices[0].texte);
  return res.json(response.choices[0].text);

});

router.get('/', async (req, res, next) => {
  return res.json("This route doesn't do anything anymore.");
});

module.exports = router;
