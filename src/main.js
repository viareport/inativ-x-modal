(function(){  
    xtag.register('x-modal', {
        lifecycle: {
            created: function created() {
                var modal = this;
                this.onKeyUp = function closeOnKeyUp(e) {
                    if (e.which === 27 && !modal.getAttribute('hidden')) {
                        modal.setAttribute('hidden', '');
                    }
                };
            },
            inserted: function inserted() {
                this.mask = this.parentNode.querySelector('.x-modal-overlay');
                if (this.hasAttribute('overlay')) {
                    this.createOverlay();
                } else {
                    this.setAttribute('hidden', '');
                }
            },
            removed: function removed() {
                this.setAttribute('hidden', '');
                this.removeOverlay();
            },
            attributeChanged: function attributedChanged(attribute) {
                switch (attribute) {
                case 'hidden':
                    if (this.hasAttribute(attribute)) {
                        if (this.mask) {
                            this.mask.setAttribute('hidden', '');
                        }
                        this.removeEvents();
                    } else {
                        this.registerEvent(document, 'keyup', this.onKeyUp);

                        if (this.mask) {
                            this.mask.removeAttribute('hidden');
                        }
                    }
                    break;
                case 'overlay':
                    if (this.hasAttribute(attribute)) {
                        this.createOverlay();
                    } else {
                        this.removeOverlay();
                    }
                    break;
                }
            }
        },
        methods: {
            show: function(title, content) {
                this.title = title;
                this.innerHTML = '<div class="x-modal-title">' + title +
                    '<span class="x-modal-close"/></div><div class="x-modal-content">' +
                    content + '</div>';
                this.removeAttribute('hidden');
            },
            close: function() {
                this.setAttribute('hidden', '');
            },

            isVisible: function() {
                return !this.hasAttribute('hidden');
            },

            createOverlay: function() {
                if (! this.mask) {
                    var mask = document.createElement('div');
                    mask.className += ' x-modal-overlay';
                    mask.setAttribute('hidden', '');
                    this.parentNode.insertBefore(mask, this);
                    this.mask = mask;
                }
            },
            removeOverlay: function() {
                if (this.mask) {
                    this.parentNode.removeChild(this.mask);
                }
            },
            registerEvent: function(node, eventType, listener) {
                if (typeof this._registeredEvents === 'undefined') {
                    this._registeredEvents = [];
                }
                node.addEventListener(eventType, listener);
                this._registeredEvents.push({
                    node: node,
                    eventType: eventType,
                    listener: listener
                });
            },
            removeEvents: function() {
                if (typeof this._registeredEvents !== 'undefined') {
                    this._registeredEvents.forEach(function(evt) {
                        evt.node.removeEventListener(evt.eventType, evt.listener);
                    });
                }
            },
            getTitle: function() {
                 return this.title;
            }
        },
        events: {
            'click:delegate(.x-modal-close)': function(e) {
                var modal = this.parentNode;
                while (modal.nodeName.toLowerCase() !== 'x-modal') {
                    modal = modal.parentNode;
                }
                modal.setAttribute('hidden', '');
            }
        }
    });

})();
