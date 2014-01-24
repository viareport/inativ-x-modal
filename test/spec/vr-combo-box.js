var kb = effroi.keyboard,
    mouse = effroi.mouse;

describe('vr-combo-box', function() {

    it("should not show suggestions without focus", function() {
        var datalist = createDatalist(['toto', 'titi'], 'data');
        var combo = createElement('vr-combo-box', {"list":"data"});
        var ul = combo.querySelector("ul");
        expect(ul).not.to.be.null;
        expect(window.getComputedStyle(ul, null).getPropertyValue('display')).to.be.equals('none');
    });

    it("should show suggestions on focus", function() {
        var datalist = createDatalist(['toto', 'titi'], 'data');
        var combo = createElement('vr-combo-box', {"list":"data"});

        combo.focus();

        var ul = combo.querySelector("ul");
        expect(ul).not.to.be.null;
        expect(window.getComputedStyle(ul, null).getPropertyValue('display')).not.to.be.equals('none');
    });

    it("should feed suggestions on focus", function(done) {
        var datalist = createDatalist(['toto', 'titi'], 'data');
        var combo = createElement('vr-combo-box', {"list":"data"});

       
        then(function() {
            // Ce qu'on souhaiterait faire avec EffroiJS 
            //kb.focus(combo.querySelector('input'));
            // ... mais on fait avec ce qu'on a :-(
            combo.focus();

            var ul = combo.querySelector("ul");
            var liCollection = ul.querySelectorAll('li');
            expect(liCollection.length).not.to.be.equals(0);
            expect(liCollection.length).to.be.equals(datalist.options.length);
            done();
        });
    });

    it("should feed once suggestions on focus", function(done) {
        var datalist = createDatalist(['toto', 'titi'], 'data');

        then(function() {

            var combo = createElement('vr-combo-box', {"list":"data"});
            combo.focus();
            combo.blur();
            combo.focus();
              
            var ul = combo.querySelector("ul");
            var liCollection = ul.querySelectorAll('li');
            expect(liCollection.length).not.to.be.equals(0);
            expect(liCollection.length).to.be.equals(datalist.options.length);
            done();
        });
    });

    it("should hide suggestions on click outside", function() {
        var datalist = createDatalist(['tato', 'titi'], 'data');
        var combo = createElement('vr-combo-box', {"list":"data"});

        var elsewhere = document.createElement('div');
        elsewhere.innerHTML = 'elsewhere';
        document.body.insertBefore(elsewhere, combo);

        combo.focus();

        mouse.click(elsewhere);

        var ul = combo.querySelector("ul");
        expect(ul).not.to.be.null;
        //expect(window.getComputedStyle(ul, null).getPropertyValue('display')).to.be.equals('none');
        expect(ul.getAttribute('visible')).to.be.null;
    });

    /*it("should hide suggestions on TAB key", function(done) {
        var datalist = createDatalist(['tato', 'titi'], 'data');
        var combo = createElement('vr-combo-box', {"list":"data"});

        combo.focus();
        then(function() {            
            //kb.tab();
           
            then(function() {
                var ul = combo.querySelector("ul");
                expect(ul).not.to.be.null;
                //expect(window.getComputedStyle(ul, null).getPropertyValue('display')).to.be.equals('none');
                expect(ul.getAttribute('visible')).to.be.null;
                done();
            });            
        });
    });*/
});