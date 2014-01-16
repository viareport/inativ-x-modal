// defer start of tests until after WebComponentsReady event
if (window.__karma__) {
  window.__karma__.loaded = function() {
    window.addEventListener('WebComponentsReady', function() {
      window.__karma__.start();
    });
  };
}

function appendComponent(name, attributes, innerHTML, done) {
    var elt = document.createElement(name);
    for (var attr in attributes) {
        elt.setAttribute(attr, attributes[attr]);
    }
    document.body.appendChild(elt);
    elt.innerHTML = innerHTML;
    setTimeout(function() {
        done();
    }, 1000);
    return elt;
}