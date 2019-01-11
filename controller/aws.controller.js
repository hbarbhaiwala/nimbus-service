
const express = require('express');
var aws_routes = express();

var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-west-2'});

aws_routes.get('/list-s3-buckets', function (req, res) {
    console.log ('aws home');

    // Create S3 service object
    s3 = new AWS.S3({apiVersion: '2006-03-01'});
    var bucketNames = [];
    // call S3 to list the buckets
    s3.listBuckets(function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.Buckets);

            res.writeHead(200, "OK", {'Content-Type': 'text/html'});
            res.write('<html><head><title>Learning AWS services 101</title></head><body>');
            res.write('s3 here');
            res.write('<ul>');
            var ctr =0;
            for (b in data.Buckets) {
                console.log("b::" + b);
                console.log(data.Buckets[ctr].Name);
                bucketNames.push(data.Buckets[ctr].Name);
                res.write('<li>'+data.Buckets[ctr].Name+'</li>');
                ctr= ctr+1;
            }

            console.log("::::"+bucketNames)
            res.write('</ul>');
            res.write('</body></html>');
            res.end();
        }
    });

});

aws_routes.get('/list-object', function (req, res) {
    console.log ('aws home');

    // Create S3 service object
    s3 = new AWS.S3({apiVersion: '2006-03-01'});
    var bucketNames = [];

    // Create params for S3.createBucket
    var readParams = {
        Bucket : 'nimbus-service',
        Key : 'shuttle.txt'
    };

    // call S3 to create the bucket
    s3.getObject(readParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);

            res.writeHead(200, "OK", {'Content-Type': 'text/html'});
            res.write('<html><head><title>Learning AWS services 101</title></head><body>');
            res.write('<p>' + data.Body.toString('ascii') + '</p>');
            res.write('</body></html>');
            res.end();

        }
    });

});

exports.routes = aws_routes;