// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last'); // 存储数据

var mySites = localStorage.getItem('mySites');
var initSites = JSON.parse(mySites);
var hashMap = initSites || [// {
//   url: 'https://ncov.dxy.cn/ncovh5/view/pneumonia?scene=2&clicktime=1579582238&enterid=1579582238&from=groupmessage&isappinstalled=0',
//   logo: '丁'
// },
// {
//   url: 'http://www.people.com.cn/',
//   logo: '人'
// },
// {
//   url: 'http://www.bilibili.com/',
//   logo: 'B'
// }
{
  url: 'https://gzygzy00.github.io/',
  logo: 'B'
}, {
  url: 'https://gzygzy00.github.io/cnode-imitated/dist/#/',
  logo: 'C'
}, {
  url: 'https://gzygzy00.github.io/DrawCUPHEAD/dist/index.html',
  logo: 'D'
}, {
  url: 'https://gzygzy00.github.io/cv/',
  logo: 'D'
}, {
  url: 'https://gzygzy00.github.io/music-player/',
  logo: 'M'
}, {
  url: 'https://github.com/gzygzy00/DB_top250',
  logo: 'T'
}, {
  url: 'https://gzygzy00.github.io/canvas-demo-1/',
  logo: 'C'
}]; // 正则

var simplify = function simplify(str) {
  if (str === 'https://gzygzy00.github.io/') {
    return '个人博客';
  } else if (str.indexOf('https://gzygzy00.github.io/') >= 0 && str !== 'https://gzygzy00.github.io/') {
    return str.replace('https://gzygzy00.github.io/', '').replace(/\/dist\/.*$/, '');
  } else {
    return str.replace('https://', '').replace('http://', '').replace('www.', '').replace(/(\/.*)|(^\.)/, '') // 删除 / 开头和开头是 . 的内容
    .replace(/\.?(?<=\.).*$/, ''); // 删除域名第一个 . 之后的内容
  }
}; // 渲染


var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (obj, i) {
    var $li = $("<li class=\"site\" title=\"".concat(obj.url, "\">\n        <div class=\"logo\">").concat(obj.logo, "</div>\n        <div class=\"link\">").concat(simplify(obj.url), "</div>\n        <div class=\"icon-wrapper\">\n          <svg class=\"icon close\">\n            <use xlink:href=\"#icon-close\"></use>\n          </svg>\n        </div>\n      </li>"));
    $li.insertBefore($lastLi);
    $li.on('click', function () {
      window.open(obj.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation(); // 阻止冒泡

      hashMap.splice(i, 1);
      render();
    });
  });
};

render(); // 新增网页

$('.site.last').on('click', function () {
  var url = window.prompt('请输入网址');

  if (url.indexOf('https://') === -1) {
    url = "https://".concat(url);
  }

  console.log(url);
  console.log(hashMap);
  hashMap.push({
    url: url,
    logo: simplify(url)[0].toUpperCase()
  }); // console.log(hashMap)

  render();
  window.scrollTo(0, 99999);
}); // 保存，刷新或关闭时

window.onbeforeunload = function () {
  localStorage.setItem('mySites', JSON.stringify(hashMap));
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.73d05345.js.map