const request = require('request');

if(process.env.NODE_ENV === 'dev'){
  require('dotenv').config(); 
}

const REQUIRED_ENV_VARS = [
  'SLACK_TOKEN',
  'SLACK_MESSAGE',
];

REQUIRED_ENV_VARS.forEach(name => {
  if(!process.env[name] || !process.env[name].length){
    console.error(`Missing required enviroment variable ${name}`)
  }
});

const slackUrl = `https://hooks.slack.com/services/${process.env.SLACK_TOKEN}`;
const text = process.env.SLACK_MESSAGE;

request.post(slackUrl, {
    json: { text }
});
