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

    function handleChildListMutations(mutations) {
        mutations.forEach(function(mutation) {
            this.childListChangedCallback(mutation);
        }, this);
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

                    if (this.childListChangedCallback) {
                        var observer = new MutationObserver(handleChildListMutations.bind(this)),
                            config = { attributes: false, childList: true, characterData: false };

                        observer.observe(this, config);
                        // TODO: il faudrait le disconnect à un moment...
                    }
                    
                    var output = created ? created.apply(this, arguments) : null;
                    return output || null;
                }
            };

            var attached = behavior.insertedCallback || behavior.attachedCallback;
            if (attached) 
                propertiesObject.attachedCallback = { enumerable: true, value: attached };
            var detached = behavior.removedCallback || behavior.detachedCallback
            if (detached) 
                propertiesObject.detachedCallback = { enumerable: true, value: detached };

            if (behavior.attributeChanged) {
                propertiesObject.attributeChangedCallback = {
                    enumerable: true,
                    value: function (name, oldValue, newValue) {
                        return behavior.attributeChanged.call(this, name, oldValue, this.getAttribute(name));
                    }
                };
            }

            if (behavior.childListChanged) 
                propertiesObject.childListChangedCallback = { enumerable: true, value: behavior.childListChanged };


            var userlandCallbacks = [
                'readyCallback', 
                'createdCallback',
                'insertedCallback',
                'removedCallback',
                'attributeChanged',
                'childListChanged'
            ];
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