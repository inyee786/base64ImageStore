const mongo = require('../config/dbconnection');
const request = require('request');
//const async = require('async');
const express = require('express');

// var fs = require('fs');
const router = express.Router();

const contributorSchema = new mongo.Schema({
  login: String,
  githubID: {
    type: Number,
    required: true,
    unique: true
  },
  contentType: String,
  image: {
    base64: String,
    imageFormat: String
  }
});

const Contributor = mongo.model('contributors', contributorSchema);


/* Get all contributors */
router.get('/contributors', (req, res) => {
  Contributor.find({}, 'login githubID image.base64 image.contentType -_id', (err, users) => {
    if (err) res.status(500).send(err)
    res.status(200).json(users);
  });
});



let baseUrl = "https://api.github.com/";

function getListOfContibutors() {
  let options = {
    url: `${baseUrl}repos/openebs/openebs/contributors?per_page=100`,
    headers: {
      'User-Agent': 'request'
    }
  };
  return new Promise(function (resolve, reject) {
    request.get(options, function (err, resp, body) {

      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    })
  })
}

function getimagetype(avtarurl) {
  const options = {
    url: `${avtarurl}&&s=100`,
    encoding: 'base64'
  };
  return new Promise(function (resolve, reject) {
    request.get(options, function (err, resp, body) {
      if (err) {
        reject(err);
      } else {
        const userDetails = {
          contentType: resp.headers['content-type'],
          image: {
            imageFormat: resp.headers['content-type'].split('/')[1],
            base64: resp.body
          }
        }
        resolve(userDetails);
      }
    })
  })
}

async function main() {
  const listOfContributors = JSON.parse(await getListOfContibutors());
  const userDetailsPromise = listOfContributors.map(async (user) => {
    const getImageDetails = await getimagetype(user.avatar_url);
    return {
      login: user.login,
      githubID: user.id,
      ...getImageDetails
    }
  })

  const userDetails = await Promise.all(userDetailsPromise);

  Contributor.insertMany(userDetails)
    .then(function (docs) {
      console.log("Data inserted successfully")
    })
    .catch(function (err) {
      console.log(err)
    });
}




main();

module.exports = router;
