# pan

> Resolve pan.baidu.com download url

---

## Install

```
$ npm install pan -g
```

## Usage

```
$ pan http://pan.baidu.com/share/link?shareid=395290&uk=3224707057
```

## Nodejs

```
var pan = require('pan');
var panUrl = 'http://pan.baidu.com/share/link?shareid=395290&uk=3224707057';
pan(panUrl, function(err, result) {
  result.forEacho(function(url) {
    console.log(url);
  });
});
```
## License

MIT
