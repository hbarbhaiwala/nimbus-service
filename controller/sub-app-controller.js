const express = require('express');

var admin = express();

admin.get('/', function (req, res) {
    console.log(admin.mountpath); // [ '/adm*n', '/manager' ]
    res.send('sub app Homepage');
});

admin.get('/secret', function (req, res) {
    console.log(admin.mountpath); // [ '/adm*n', '/manager' ]
    res.send('sub app secret Homepage');
});

// admin.use('/secr*t', secret); // load the 'secret' router on '/secr*t', on the 'admin' sub app
// app.use(['/adm*n', '/manager'], admin); // load the 'admin' router on '/adm*n' and '/manager', on the parent app


exports.routes = admin;