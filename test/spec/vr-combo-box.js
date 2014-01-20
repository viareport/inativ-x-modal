var kb = effroi.keyboard;

describe('vr-combo-box', function() {

    it("should not show suggestions without focus", function() {
        var combo = createElement('vr-combo-box', {"list":"data"});
        var ul = combo.querySelector("ul");
        expect(ul).not.to.be.null;
        expect(window.getComputedStyle(ul, null).getPropertyValue('display')).to.be.equals('none');
    });

    it("should show suggestions on focus", function() {
        var combo = createElement('vr-combo-box', {"list":"data"});
        var datalist = createDatalist(['toto', 'titi'], 'data');

        kb.focus(combo);

        var ul = combo.querySelector("ul");
        expect(ul).not.to.be.null;
        expect(window.getComputedStyle(ul ,null).getPropertyValue('display')).not.to.be.equals('none');

        var liCollection = ul.querySelectorAll('li');
        expect(liCollection.length).to.be.equals(datalist.options.length);
    });
});