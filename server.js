console.log("✅ server.js loaded");

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve CSS, images, etc. from root folder

const fs = require('fs');

app.post('/contact', (req, res) => {
  const contactData = `Name: ${req.body.name}, Email: ${req.body.email}, Message: ${req.body.message}\n`;
  fs.appendFile('contacts.txt', contactData, err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving contact data');
    }
    res.send('Thank you! Your message has been received.');
  });
});

app.use(express.urlencoded({ extended: true }));

app.post('/join', (req, res) => {
  const joinData = `Name: ${req.body.name}, Email: ${req.body.email}\n`;
  fs.appendFile('members.txt', joinData, err => {
    if (err) {
      return res.status(500).send('Error saving data');
    }
    res.send('🎉 Thank you for joining Fit N Fine!');
  });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'gym.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
