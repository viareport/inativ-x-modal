var kb = effroi.keyboard;

describe('vr-selectable', function() {
    beforeEach(function() {
        injectHtml('<vr-selectable target="li"><ul><li>toto</li><li>toto</li><li>toto</li></ul></vr-selectable>');
        this.selectable = document.querySelector('vr-selectable');
    });

    it("should set the selected attribute to 0", function() {
        expect(this.selectable.getAttribute('selected')).to.equal('0');
    });

    it("should add a class to the selected item", function() {
        expect(document.querySelector('li').className).to.equal('vr-selectable-selected');
    });

    it("should select the next item when pressing down key", function() {
        kb.hit(kb.DOWN);
        expect(this.selectable.getAttribute('selected')).to.equal('1');
    });
});