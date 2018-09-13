/*
Copyright (C) 2017 Expedia Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
MongoDB helper for connecting to the database.
*/

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';

exports.insert = function(data, res, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("nimbus-event").insertOne(data, function(err, result) {
      console.log("Record added as " + result.insertedId);
      console.log("Number of documents inserted: " + result.insertedCount);
      db.close();
      if (callback != undefined) {
        var insertOperationStatus = {
          insertedId: result.insertedId,
          insertedCount: result.insertedCount
        };
        callback(insertOperationStatus, res);
      }
    });
  });
}

exports.find = function(query, res, callback) {
  console.log("mongo query :" + query.toString());
  MongoClient.connect(url, function(err, db) {
    db.collection("nimbus-event").find(query).toArray(function(err, result) {
      db.close();
      callback(result);
    });
  });
}

exports.findOne = function(query, res, callback) {
  console.log("mongo query :" + query.toString());
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

exports.createCollection = function() {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.createCollection("nimbus-event", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
}
