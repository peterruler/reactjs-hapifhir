"use strict";
require('dotenv').config();
const nodemailer = require('nodemailer');
const cors = require('cors');
const express = require('express');
const path = require('path');


const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/sendmail', (req, res) => {
  res.send('Message sent!');
  sendWarning(req);
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at localhost:${port}`)
})

let sendWarning = (req) => {

  // needs activation of twofactor auth & additional app password!

  const mailerConfig = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user: process.env.GMAILUSER,
      pass: process.env.GMAIL_SAVE_PASS //App password needed when using twofactor auth
    }
  };
  
  const transporter = nodemailer.createTransport(mailerConfig);

  let mailOptions = {
    from: 'peter.strossler@gmail.com',
    to: req.query.email,
    subject: "Covid Warnung  - Fake for testing purpose",
    html: "<doctype html><html><head><meta charset='utf-8'/><title>Covid Warnung - Fake for testing purpose</title></head><body><h4>Fake for testing purpose - Covid Warnung</h4><b>Aufgrund der von Ihnen angegebenen Daten bitten wir Sie sich baldmöglichst testen zu lassen!</b><b>Absender: https://ps-hapifhir.vercel.app/ Keine Haftung, bei Misbrauch des Dienstes.</b></body></html>", // html body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}