"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const request = require('request');
const restService = express();


restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/schedule", function (req, res) {

  var guessNum = req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
    ? req.body.result.parameters.echoText
    : "Seems like some problem. Speak again.";

  var speech = guessNum.toLowerCase();

 
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});








restService.post("/gartner", function (req, res) {

  var guessNum = req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
    ? req.body.result.parameters.echoText
    : "Seems like some problem. Speak again.";

 var speech = guessNum.toLowerCase();

  


  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});



restService.post("/echo", function (req, res) {

  var factCategory = req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
    ? req.body.result.parameters.echoText
    : "Seems like some problem. Speak again.";

  var speech = factCategory.toLowerCase();



  if (factCategory == 'hot day' || factCategory == 'hot today' || factCategory == 'hot' || factCategory == 'today was hot' || factCategory == 'it was a hot day'
    || factCategory == 'it was so hot today' || factCategory == 'it was hot today' || factCategory == 'it was a hot day today'
    || factCategory == 'it was a hard day' || factCategory == 'it was so hard today' || factCategory == 'it was hard today' || factCategory == 'it was a hard day today'
    || factCategory == 'hard day' || factCategory == 'hard today' || factCategory == 'hard' || factCategory == 'today was hard') {

    speech = 'Yes indeed. Todays temperature reached a record high of 62.6 degrees outdoors, The temperature in this room is 59.59 degrees. Would you like me to adjust the airconditioning?';

  }
  else if (factCategory == 'aircon'
    || factCategory == 'swicth on the'
    || factCategory == 'switch on the aircon' || factCategory == 'turn on' || factCategory == 'switch it on please'
    || factCategory == 'switch it on' || factCategory == 'turn it on' || factCategory == 'turn it on please'
    || factCategory == 'yes, switch it on' || factCategory == 'switch on'
    || factCategory == 'switch on the aircon') {
    speech = 'I have set the temperature to 72 degree. Do you want to change that?';

  }
  else if (factCategory == 'no leave it' || factCategory == 'no let it be' || factCategory == 'no need' || factCategory == 'do not change it'
    || factCategory == 'no thats just right' || factCategory == 'no thats right' || factCategory == "no that�s just right") {
    speech = 'Its time to replace your air conditioner filter. Vision H.V.A.C.has a 20 percent discount on filters for the next two weeks. Would you like to place an order now?';

  }
  else if (factCategory == 'will it be hot next month' || factCategory == 'how hot is it next month' || factCategory == 'is it hot next month too' || factCategory == 'will it stay hot very long'
    || factCategory == 'will it be hard next month' || factCategory == 'how hard is it next month' || factCategory == 'is it hard next month too' || factCategory == 'is it hot next month to'
    || factCategory == 'is it hard next month to') {
    speech = 'Yes, I checked.The heat wave will continue through next month, would you like to order the replacement filters?';

  }
  else if (factCategory == 'yes order it' || factCategory == 'yes order it please' || factCategory == 'please proceed' || factCategory == 'ok proceed'
    || factCategory == 'ok sure proceed' || factCategory == 'sure proceed' || factCategory == 'yes please' || factCategory == 'order it please') {
    speech = 'Ok. I have placed the order. Please check for the details on your email and mobile app to complete payment. ';

  }
  else if (factCategory == 'thanks' || factCategory == 'ok thanks' || factCategory == 'quit' || factCategory == 'thank you') {

    request('http://resulticks.biz:81/Home/Register?id=125gh', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      console.log(body.url);
      console.log(body.explanation);
    });

    speech = 'Good bye!';

  }

  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/audio", function (req, res) {
  var speech = "";
  switch (req.body.result.parameters.AudioSample.toLowerCase()) {
    //Speech Synthesis Markup Language 
    case "music one":
      speech =
        '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music two":
      speech =
        '<speak><audio clipBegin="1s" clipEnd="3s" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music three":
      speech =
        '<speak><audio repeatCount="2" soundLevel="-15db" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music four":
      speech =
        '<speak><audio speed="200%" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music five":
      speech =
        '<audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio>';
      break;
    case "delay":
      speech =
        '<speak>Let me take a break for 3 seconds. <break time="3s"/> I am back again.</speak>';
      break;
    //https://www.w3.org/TR/speech-synthesis/#S3.2.3
    case "cardinal":
      speech = '<speak><say-as interpret-as="cardinal">12345</say-as></speak>';
      break;
    case "ordinal":
      speech =
        '<speak>I stood <say-as interpret-as="ordinal">10</say-as> in the class exams.</speak>';
      break;
    case "characters":
      speech =
        '<speak>Hello is spelled as <say-as interpret-as="characters">Hello</say-as></speak>';
      break;
    case "fraction":
      speech =
        '<speak>Rather than saying 24+3/4, I should say <say-as interpret-as="fraction">24+3/4</say-as></speak>';
      break;
    case "bleep":
      speech =
        '<speak>I do not want to say <say-as interpret-as="bleep">F&%$#</say-as> word</speak>';
      break;
    case "unit":
      speech =
        '<speak>This road is <say-as interpret-as="unit">50 foot</say-as> wide</speak>';
      break;
    case "verbatim":
      speech =
        '<speak>You spell HELLO as <say-as interpret-as="verbatim">hello</say-as></speak>';
      break;
    case "date one":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="yyyymmdd" detail="1">2017-12-16</say-as></speak>';
      break;
    case "date two":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="dm" detail="1">16-12</say-as></speak>';
      break;
    case "date three":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="dmy" detail="1">16-12-2017</say-as></speak>';
      break;
    case "time":
      speech =
        '<speak>It is <say-as interpret-as="time" format="hms12">2:30pm</say-as> now</speak>';
      break;
    case "telephone one":
      speech =
        '<speak><say-as interpret-as="telephone" format="91">09012345678</say-as> </speak>';
      break;
    case "telephone two":
      speech =
        '<speak><say-as interpret-as="telephone" format="1">(781) 771-7777</say-as> </speak>';
      break;
    // https://www.w3.org/TR/2005/NOTE-ssml-sayas-20050526/#S3.3
    case "alternate":
      speech =
        '<speak>IPL stands for <sub alias="indian premier league">IPL</sub></speak>';
      break;
  }
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/video", function (req, res) {
  return res.json({
    speech:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    displayText:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    source: "webhook-echo-sample"
  });
});

restService.post("/slack-test", function (req, res) {
  var slack_message = {
    text: "Details of JIRA board for Browse and Commerce",
    attachments: [
      {
        title: "JIRA Board",
        title_link: "http://www.google.com",
        color: "#36a64f",

        fields: [
          {
            title: "Epic Count",
            value: "50",
            short: "false"
          },
          {
            title: "Story Count",
            value: "40",
            short: "false"
          }
        ],

        thumb_url:
          "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
      },
      {
        title: "Story status count",
        title_link: "http://www.google.com",
        color: "#f49e42",

        fields: [
          {
            title: "Not started",
            value: "50",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          }
        ]
      }
    ]
  };
  return res.json({
    speech: "speech",
    displayText: "speech",
    source: "webhook-echo-sample",
    data: {
      slack: slack_message
    }
  });
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
