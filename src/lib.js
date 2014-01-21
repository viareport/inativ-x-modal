(function() {
    function createFragment(template) {
        var fragment = document.createDocumentFragment(),
            tmp = document.createElement('body'),
            child;

        tmp.innerHTML = template;
        while (child = tmp.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }

    function inflateFragment(fragment, elementNode) {
        var fragClone = fragment.cloneNode(true);
        var insertionPoints = fragClone.querySelectorAll('content');
        for (var i = 0; i <= insertionPoints.length - 1; i++) {
            var node = insertionPoints[i], selector = node.getAttribute('select') || '*';
            if (selector !== '*') {
                var pt = elementNode.querySelector(selector);
                if (pt) {
                    node.parentNode.replaceChild(pt, node);
                }
            } else {
                while (elementNode.children.length > 0) {
                    node.parentNode.insertBefore(elementNode.children[0], node);
                }
                node.parentNode.removeChild(node);
            }
        }
        return fragClone;
    }

    var VRComponents = {
        registerElement: function(name, template, behavior) {
            var propertiesObject = {};
            propertiesObject.template = {
                value: template
            };
            
            var created = behavior.createdCallback || behavior.readyCallback;
            propertiesObject.createdCallback = {
                enumerable: true,
                value: function () {
                    this.appendChild(inflateFragment(createFragment(this.template), this));
                    var output = created ? created.apply(this, arguments) : null;
                    return output || null;
                }
            };

            if (behavior.insertedCallback) 
                propertiesObject.enteredDocumentCallback = { enumerable: true, value: behavior.insertedCallback };
            if (behavior.removedCallback) 
                propertiesObject.leftDocumentCallback = { enumerable: true, value: behavior.removedCallback };

            if (behavior.attributeChanged) {
                propertiesObject.attributeChangedCallback = {
                    enumerable: true,
                    value: function (name, oldValue, newValue) {
                        return behavior.attributeChanged.call(this, name, oldValue, this.getAttribute(name));
                    }
                };
            }


            var userlandCallbacks = ['readyCallback', 'createdCallback', 'insertedCallback', 'removedCallback', 'attributeChanged'];
            Object.getOwnPropertyNames(behavior).forEach(function(key) {
                if (userlandCallbacks.indexOf(key) === -1) {
                    var descriptor = Object.getOwnPropertyDescriptor(behavior, key);
                    propertiesObject[key] = {
                        enumerable: true
                    };
                    if (descriptor.hasOwnProperty('value')) {
                        propertiesObject[key].value = descriptor.value;
                    }
                    if (descriptor.hasOwnProperty('get')) {
                        propertiesObject[key].get = descriptor.get;
                    }
                    if (descriptor.hasOwnProperty('set')) {
                        propertiesObject[key].set = descriptor.set;
                    }
                }
            });

            document.register(name, {
                prototype: Object.create(HTMLElement.prototype, propertiesObject)
            });
        }
    };

    window.VRComponents = VRComponents;
}());