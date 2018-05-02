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

  if (guessNum == 'welcome')
    speech = 'you have a free schedule this evening.';
  else if (guessNum == 'offer')
    speech = 'OK. Your Infinia creditcard entitles you to a 1+1 offer at Vision Kitchen in Phoenix Mall. Shall I connect you to the concierge to make a booking? ';
  else if (guessNum == 'connect') {
    speech = 'Ok, connecting now.';
    request('http://resulticks.biz:81/Home/RegisterBank?id=hare_ram_end', { json: true }, (err, res, body) => { });
  }
  else if (guessNum == 'thanks')
    speech = 'Good bye';
  else
    speech = "I cant understand that, please repeat";

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

  var speech = guessNum;


  if (guessNum == 'welcome')
    speech = 'OK. Multichannel marketing is being covered by Michael Lehmann and Max Russell.';
  else if (guessNum == 'report')
    speech = 'The most recent report is the MQ from April 2017. Would you like the report summary?';
  else if (guessNum == 'readreport')
    speech = "Ok, here it is. Marketing leaders will find a host of new vendors in this year''s Magic Quadrant for multichannel campaign management. Vendors are focused on integrating machine learning, personalization and ad tech capabilities into big data foundations for deeper customer engagement.";
  else if (guessNum == 'sendemail') {
    request('http://resulticks.biz:81/Home/SendReport?id=gg', { json: true }, (err, res, body) => { });
    speech = 'Sure, report has been emailed.';
  }
  else if (guessNum == 'schedule')
    speech = 'Ok, I have matched your schedules. Best time slots available are next Wednesday 10am or next Friday 4pm with Max Russell. Michael Lehman is not available week after next. Do you want to book an appointment?';
  else if (guessNum == 'meeting') {
    request('http://resulticks.biz:81/Home/SendInvite?id=gg', { json: true }, (err, res, body) => { });
    speech = 'Meeting request has been sent.';
  }
  else if (guessNum == 'thanks')
    speech = 'Good bye';
  else
    speech = "I cant understand that, please repeat";

  var type = 0;





  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});



restService.post("/echo", function (req, res) {

  var guessNum = req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
    ? req.body.result.parameters.echoText
    : "Seems like some problem. Speak again.";

   
    var speech = guessNum.toLowerCase();
  

  if (guessNum == 'campaign1') {
    //can you check if this weekends thanksgiving campaign has been triggered on resulticks
    //type = 0;
    speech = 'Yes, campaign triggered at 12pm on Wednesday, It is open till 30th January 2018. The performance reportis available. Would you like to read it?';
  } else if (guessNum == 'campaign2') {
    //type = 1;
    speech ='Yes, campaign ended on December 30th at 5pm. The performance report has been updated and is available. Would you like to read it?';
  } else if (guessNum == 'read') {
    if (type == 0)
    speech ='Current status is Warming Up. Primary target is 10% achieved. Average reach rate is 43%. Average engagement rate is 1.5%. Average conversion rate is 0.05%. Would you like to read the recommendations';
    else
    speech ='Status is Achieved. Primary target achieved is 120%. Average reach rate is 36%. Average engagement rate is 9%. Average conversion rate is 3%. Would you like to read the recommendations?';
  } else if (guessNum == 'recommentations') {
    if (type == 0)
    speech = 'Ok, here it is. The engagement rate has been low in comparison to the goal set. The campaign was blasted at 12pm Wednesday. But best practices indicate Friday evening to be best time for this campaign type.';
    else
    speech ='Ok, here it is. The engagement rate has been low in comparison to the goal set. The campaign was blasted at 12pm Friday. But best practices indicate Thursday evening to be best time for this campaign type. Since the engagement rate was not achieved but the performance is better than industry standards we recommend making indicated changes during next campaign for better performance.';
  } else if (guessNum == 'report') {
    if (type == 0) {
      request('http://resulticks.biz:81/Home/SendResulticksReport?camtype=camp_1', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
       
      });
      speech = 'Sure, report has been emailed.';
    } else {
      request('http://resulticks.biz:81/Home/SendResulticksReport?camtype=camp_2', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
      
      });
      speech = 'Sure, report has been emailed.';
    }
  } else if (factCategory == 'thanks') {
      speech = 'Good bye!';
    }else {
      speech = 'I cant understand that, please repeat';
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
