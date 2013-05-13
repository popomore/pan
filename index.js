var fs = require('fs');
var path = require('path');
var url = require('url');
var http = require('http');

var re1 = /href="(http:\/\/d.pcs.baidu.com.*?)"/;
var re2 = /\/\*<\!\[CDATA\[\*(?:[\s\S]*)\("([^\)]+?)"\);\/\*\]\]>\*\//;
module.exports = function (u, callback) {
  http.get(url.parse(u), function(res) {
    var buffers = [];
    res.on('data', function(buffer) {
        buffers.push(buffer.toString());
    });

    res.on('error', function(err) {
      callback(err);
    });

    res.on('end', function() {
      var matched, html = buffers.join('');

      // one link
      matched = html.match(re1);
      if (matched && matched[1]) {
        callback(null, [matched[1].replace(/&amp;/g, '&')]);
        return;
      }

      // more link
      matched = buffers.join('').match(re2);
      if (matched && matched[1]) {
        var result = JSON.parse(matched[1].replace(/\\/g, ''))
          .map(function(o, i) {
            return o.dlink;
          });
        callback(null, result);
      } else {
        callback(null, []);
      }
    });
  });
};