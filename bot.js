if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');
var os = require('os');
var fs = require('fs');

var bird_stuff = JSON.parse(fs.readFileSync('bird_stuff.json'));

var controller = Botkit.slackbot({
    debug: true,
    port: process.env.PORT || '5432'
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

controller.setupWebserver(process.env.PORT,function(err,webserver) {
  controller.createWebhookEndpoints(controller.webserver);
});


var scawks = ["BRRAK!", "SCRAAAAAW", "RAAAAAARRRK", "REEEEEEEEEEE"];


controller.hears(['(.*)'],'direct_message,direct_mention,mention',function(bot, message) {
  var scawk = scawks[Math.floor(Math.random()*scawks.length)];


  bot.reply(message, scawk);
});


controller.hears(['uptime','identify yourself','who are you','what is your name'],'direct_message,direct_mention,mention',function(bot, message) {
  bot.reply(message,"SCRAAWK!");
});

controller.hears(['fact'], ['direct_message','direct_mention','mention','ambient'], function(bot, message){
  var facts = bird_stuff["facts"];
  var fact = facts[Math.floor(Math.random()*facts.length)];

  bot.reply(message, "BirdFact: " + fact);
});

