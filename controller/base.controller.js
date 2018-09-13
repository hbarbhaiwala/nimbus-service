
exports.root = (req, res) => {
    console.log ('home');
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.write('<html><head><title>Creating the Nimbus event</title></head><body>');
    res.write('yoyoyoyoy');
    res.write('</body></html>');
    res.end();
}

exports.foo = (req, res) => {
    retValue = { bar: "haha" }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(retValue));
}

exports.log = (req, res, next) => {
    console.log('doing something here ....');
    next(); // pass control to the next handler
}
