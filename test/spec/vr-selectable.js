var kb = effroi.keyboard;

describe('vr-selectable', function() {
    before(function(done) {
        this.selectable = appendComponent('vr-selectable', { target: 'li' }, '<ul><li>toto</li><li>toto</li><li>toto</li></ul>', done);
    });

    after(function() {
        document.body.innerHTML = '';
    });

    it("should set the selected attribute to 0", function() {
        expect(this.selectable.getAttribute('selected')).to.equal('0');
    });

    it("should add a class to the selected item", function() {
        expect(document.querySelector('li').className).to.equal('vr-selectable-focus');
    });

    it("should select the next item when pressing down key", function() {
        kb.hit(kb.DOWN);
        expect(this.selectable.getAttribute('selected')).to.equal('1');
    });
});