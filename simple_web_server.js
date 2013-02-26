var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

http.createServer(function(req, res) {
  var rurl = req.url;
  if (rurl.indexOf("contact_form.html")>-1) {
	// ignore event part
  	var parts = rurl.split("/");
	if (parts[0]=='') parts.shift();
	parts.shift();
	rurl = parts.join("/");
  }

  var uri = url.parse(rurl).pathname;
  
  var filename = path.join(process.cwd(), unescape(uri));
  var stats;

  try {
    stats = fs.lstatSync(filename); // throws if path doesn't exist
  } catch (e) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found\n');
    res.end();
    return;
  }


  if (stats.isFile()) {
    // path exists, is a file
    var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
    res.writeHead(200, {'Content-Type': mimeType} );

    var fileStream = fs.createReadStream(filename);
    fileStream.pipe(res);
  } else if (stats.isDirectory()) {
    // path exists, is a directory
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Please go to <a href="/123someeventId/contact_form.html">registration form</a>');
    res.write('Index of '+uri+'\n');
    res.write('TODO, show index?\n');
    res.end();
  } else {
    // Symbolic link, other?
    // TODO: follow symlinks?  security?
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.write('500 Internal server error\n');
    res.end();
  }

}).listen(1337);