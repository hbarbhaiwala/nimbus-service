/*
Copyright (C) 2017 Expedia Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
MongoDB helper for connecting to the database.
*/

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';

exports.foo = function() {
  console.log("foo created: " + url);
}

exports.insert = function(data, res, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("nimbus-event").insertOne(data, function(err, result) {
      if (err) throw err;
      if (callback != undefined) {
        callback(result, res);
      }
      console.log("Record added as " + result.insertedId);
      console.log("Number of documents inserted: " + result.insertedCount);
      db.close();
    });
  });
}

exports.find = function(query, res, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("nimbus-event").find(query, function(err, result) {
      if (err) throw err;
      console.log('mongoHelper:find:' + result);
      if (callback != undefined) {
        callback(result, res);
      }
      db.close();
    });
  });
}

exports.findOne = function(query, res, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("nimbus-event").findOne(query, function(err, result) {
      if (err) throw err;
      console.log('mongoHelper:findOne:' + result);
      if (callback != undefined) {
        callback(result, res);
      }
      db.close();
    });
  });
}
