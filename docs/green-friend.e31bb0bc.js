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
})({"images/icons/1-drop.svg":[function(require,module,exports) {
module.exports = "1-drop.40dea4f5.svg";
},{}],"images/icons/2-drops.svg":[function(require,module,exports) {
module.exports = "2-drops.d9995d47.svg";
},{}],"images/icons/3-drops.svg":[function(require,module,exports) {
module.exports = "3-drops.c412d65e.svg";
},{}],"images/icons/low-sun.svg":[function(require,module,exports) {
module.exports = "low-sun.b84c5a4b.svg";
},{}],"images/icons/no-sun.svg":[function(require,module,exports) {
module.exports = "no-sun.13a7574d.svg";
},{}],"images/icons/pet.svg":[function(require,module,exports) {
module.exports = "pet.227efecc.svg";
},{}],"images/icons/toxic.svg":[function(require,module,exports) {
module.exports = "toxic.7f74c9f9.svg";
},{}],"js/createPlantElements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPlantElements;

var _drop = _interopRequireDefault(require("../images/icons/1-drop.svg"));

var _drops = _interopRequireDefault(require("../images/icons/2-drops.svg"));

var _drops2 = _interopRequireDefault(require("../images/icons/3-drops.svg"));

var _lowSun = _interopRequireDefault(require("../images/icons/low-sun.svg"));

var _noSun = _interopRequireDefault(require("../images/icons/no-sun.svg"));

var _pet = _interopRequireDefault(require("../images/icons/pet.svg"));

var _toxic = _interopRequireDefault(require("../images/icons/toxic.svg"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sunIcons = {
  high: _lowSun.default,
  low: _lowSun.default,
  no: _noSun.default
};
const waterIcons = {
  daily: _drops2.default,
  regularly: _drops.default,
  rarely: _drop.default
};
/**
 *
 * @param {{id: number,
 * name: string,
 * price: number,
 * staff_favorite: boolean,
 * sun: "high" | "low" | "no",
 * toxicity: boolean,
 * url: string,
 * water: "rarely" | "regularly"| "daily"}[]} plantsArray
 */

function createPlantElements(plantsArray) {
  const plantsContainer = document.getElementsByClassName('main--results__container--plants__wrapper--slides')[0];
  plantsArray.forEach((plant, index) => {
    // create elements
    const plantContainer = document.createElement('div');
    const plantImageContainer = document.createElement('div');
    const plantImage = document.createElement('img');
    const plantName = document.createElement('h4');
    const price = document.createElement('span');
    const iconsContainer = document.createElement('div');
    const petIcon = document.createElement('img');
    const sunIcon = document.createElement('img');
    const waterIcon = document.createElement('img'); // append elements

    plantsContainer.append(plantContainer);
    plantContainer.append(plantImageContainer, plantName, price, iconsContainer);
    plantImageContainer.append(plantImage);
    iconsContainer.append(petIcon, sunIcon, waterIcon); // add attribute to elements

    plantContainer.className = 'main--results__container--plants__wrapper--slides__plant';
    if (!index && !(0, _utils.isMobile)()) plantContainer.classList.add('highlightedElement');
    plantImageContainer.className = 'plantImage';
    plantImage.setAttribute('src', plant.url);
    plantName.textContent = plant.name;
    plantName.className = 'plantName';
    price.textContent = '$' + plant.price;
    price.className = 'plantPrice';
    iconsContainer.className = 'plantIcons';
    petIcon.setAttribute('src', plant.toxicity ? _toxic.default : _pet.default);
    sunIcon.setAttribute('src', sunIcons[plant.sun]);
    if (plant.sun === sunIcons.low) sunIcon.setAttribute('height', '10px');
    waterIcon.setAttribute('src', waterIcons[plant.water]);

    if (plant.staff_favorite) {
      const staffFavouriteContainer = document.createElement('div');
      plantContainer.append(staffFavouriteContainer);
      staffFavouriteContainer.textContent = '✨ Staff favorite';

      if (!index && !(0, _utils.isMobile)()) {
        staffFavouriteContainer.className = 'main--results__container--plants__wrapper--slides__plant--staffFavourite__big';
      } else {
        staffFavouriteContainer.className = 'main--results__container--plants__wrapper--slides__plant--staffFavourite__small';
      }
    }
  });
}
},{"../images/icons/1-drop.svg":"images/icons/1-drop.svg","../images/icons/2-drops.svg":"images/icons/2-drops.svg","../images/icons/3-drops.svg":"images/icons/3-drops.svg","../images/icons/low-sun.svg":"images/icons/low-sun.svg","../images/icons/no-sun.svg":"images/icons/no-sun.svg","../images/icons/pet.svg":"images/icons/pet.svg","../images/icons/toxic.svg":"images/icons/toxic.svg","./utils":"js/utils.js"}],"js/plantSlider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = plantSlider;

// solution adapted from https://codepen.io/cconceicao/pen/PBQawy
function plantSlider(wrapper, items) {
  var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = items.getElementsByClassName('main--results__container--plants__wrapper--slides__plant'),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName('main--results__container--plants__wrapper--slides__plant')[0].offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true; // Clone first and last slide

  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add('loaded'); // Mouse events

  items.onmousedown = dragStart; // Touch events

  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction); // Transition events

  items.addEventListener('transitionend', checkIndex);

  function dragStart(event) {
    event = event || window.event;
    event.preventDefault();
    posInitial = items.offsetLeft;

    if (event.type == 'touchstart') {
      posX1 = event.touches[0].clientX;
    } else {
      posX1 = event.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }

    items.style.left = items.offsetLeft - posX2 + 'px';
  }

  function dragEnd() {
    posFinal = items.offsetLeft;

    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = posInitial + 'px';
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(dir, action) {
    items.classList.add('shifting');

    if (allowShift) {
      if (!action) {
        posInitial = items.offsetLeft;
      }

      if (dir == 1) {
        items.style.left = posInitial - slideSize + 'px';
        index++;
      } else if (dir == -1) {
        items.style.left = posInitial + slideSize + 'px';
        index--;
      }
    }

    allowShift = false;
  }

  function checkIndex() {
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + 'px';
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + 'px';
      index = 0;
    }

    allowShift = true;
  }
}
},{}],"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMobile = isMobile;
exports.scrollToTop = scrollToTop;
exports.handleSelectChange = handleSelectChange;

var _createPlantElements = _interopRequireDefault(require("./createPlantElements"));

var _plantSlider = _interopRequireDefault(require("./plantSlider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isMobile() {
  return window.innerWidth < 600;
}

function scrollToTop() {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
}

function removePlantsContainerElements() {
  const plantsContainer = document.getElementsByClassName('main--results__container--plants__wrapper--slides')[0];
  plantsContainer.innerHTML = '';
}

async function handleSelectChange(requestParams) {
  const {
    sun,
    water,
    pets
  } = requestParams;

  if (sun && water && pets) {
    const plantsResponse = await fetchPlantResults(requestParams);
    toggleResults(plantsResponse);
    removePlantsContainerElements();
    (0, _createPlantElements.default)(plantsResponse);
    const slider = document.getElementsByClassName('main--results__container--plants')[0],
          sliderItems = document.getElementsByClassName('main--results__container--plants__wrapper--slides')[0];
    if (isMobile()) (0, _plantSlider.default)(slider, sliderItems);
  } else {
    removePlantsContainerElements();
    toggleResults([]);
  }
}

function toggleResults(plantsArray) {
  const noResultsText = document.getElementsByClassName('main--results__noResultText')[0];
  const noResultsIllustration = document.getElementsByClassName('main--results__noResultIllustration')[0];
  const resultsContainer = document.getElementsByClassName('main--results__container')[0];

  if (plantsArray.length) {
    noResultsText.style.display = 'none';
    noResultsIllustration.style.display = 'none';
    resultsContainer.style.display = 'block';
  } else {
    noResultsText.style.display = 'block';
    noResultsIllustration.style.display = 'block';
    resultsContainer.style.display = 'none';
  }
}

async function fetchPlantResults(requestParams) {
  const {
    sun,
    water,
    pets
  } = requestParams;
  let result;
  await fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pets}`).then(response => response.json()).then(data => result = data);
  return result;
}
},{"./createPlantElements":"js/createPlantElements.js","./plantSlider":"js/plantSlider.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _utils = require("./js/utils");

document.addEventListener('DOMContentLoaded', function () {
  const requestParams = {
    sun: '',
    water: '',
    pets: ''
  };
  let form = document.getElementsByClassName('main--searchFilters__form')[0];
  form.addEventListener('submit', event => event.preventDefault());
  const scrollToTopBtn = document.getElementsByClassName('main--results__container--scrollToTopBtn')[0];
  scrollToTopBtn.addEventListener('click', () => (0, _utils.scrollToTop)());
  const elementsArray = Object.keys(requestParams);
  elementsArray.forEach(element => {
    const node = document.getElementsByClassName(`main--searchFilters__form--${element}__select`)[0];
    node.addEventListener('change', event => {
      requestParams[element] = event.target.value;
      (0, _utils.handleSelectChange)(requestParams);
    });
  });
});
},{"./js/utils":"js/utils.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63823" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=green-friend.e31bb0bc.js.map