// defer start of tests until after WebComponentsReady event
if (window.__karma__) {
    window.__karma__.loaded = function() {
        window.addEventListener('WebComponentsReady', function() {
            window.__karma__.start();
        });
    };
}

// Mocha hook, called after each test
afterEach(function() {
    document.body.innerHTML = '';
});

function then(fn) {
  setTimeout(function() {
    fn();
  }, 0);

  return {
    then: function(next) {
      return then(next);
    }
  };
}

function createElement(name, attributes) {
    var elt = document.createElement(name);
    for (var attr in attributes) {
        elt.setAttribute(attr, attributes[attr]);
    }
    document.body.appendChild(elt);
    forceElementsUpgrade();
    return elt;
}

function injectHtml(html) {
    var fragment = document.createDocumentFragment();
    var tmp = document.createElement('body'), child;
    
    tmp.innerHTML = html;
    while (child = tmp.firstChild) {
        fragment.appendChild(child);
    }

    var node = fragment.cloneNode(true);
    document.body.appendChild(node);
    forceElementsUpgrade();
}

// FIXME: vérifier si on ne peut pas s'en passer...
function forceElementsUpgrade() {
    CustomElements.takeRecords();
}

if (!window.requestAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}