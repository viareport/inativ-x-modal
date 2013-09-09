(function(){
    xtag.register('x-modal', {
        lifecycle: {
            created: function created() {
                var modal = this;

                this.titleElement = document.createElement("span");
                this.titleElement.classList.add('x-modal-title-content');

                this.contentElement = document.createElement("div");
                this.contentElement.classList.add("x-modal-content");

                var titleBar = document.createElement("div");
                titleBar.classList.add("x-modal-title");
                var closeElement = document.createElement("span");
                closeElement.classList.add("x-modal-close");
                titleBar.appendChild(this.titleElement);
                titleBar.appendChild(closeElement);

                this.appendChild(titleBar);
                this.appendChild(this.contentElement);

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
            render: function (title, content) {
                this.setTitle(title);
                this.setContent(content);
            },
            show: function(title, content) {
                this.render(title, content);
                this.removeAttribute('hidden');
            },
            setContent: function setContent(content) {
                this.contentElement.innerHTML = content;
            },
            setTitle: function setTitle(title) {
                this.title = title; // Sinon le getTitle() ne sert à rien
                this.titleElement.innerHTML = title;
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
            registerEvent: function(node, eventType, eventHandler) {
                if (typeof this._registeredEvents === 'undefined') {
                    this._registeredEvents = [];
                }
                node.addEventListener(eventType, eventHandler);
                this._registeredEvents.push({
                    node: node,
                    eventType: eventType,
                    listener: eventHandler
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
