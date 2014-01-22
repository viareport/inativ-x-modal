var kb = effroi.keyboard,
    mouse = effroi.mouse;

describe('vr-selectable', function() {
    beforeEach(function() {
        injectHtml('<vr-selectable target="li"><ul><li>toto</li><li>toto</li><li>toto</li></ul></vr-selectable>');
        this.selectable = document.querySelector('vr-selectable');
    });

    it("should highlight the first element", function() {
        expect(this.selectable.getAttribute('highlighted')).to.equal('0');
    });

    it("should add a class to the highlighted item", function() {
        expect(document.querySelector('li').className).to.equal('vr-selectable-highlighted');
    });

    it("should highlight the next item when pressing down key", function() {
        kb.hit(kb.DOWN);
        expect(this.selectable.getAttribute('highlighted')).to.equal('1');
    });

    it("should select the highlighted item when pressing enter key", function() {
        kb.hit(kb.DOWN);
        var highlightedElement = this.selectable.getAttribute('highlighted');
        kb.hit(kb.ENTER);
        expect(this.selectable.getAttribute('selected')).to.equal(highlightedElement);
    });

    it("should select only one item", function() {
        kb.hit(kb.DOWN);
        kb.hit(kb.ENTER);
        kb.hit(kb.DOWN);
        kb.hit(kb.ENTER);
        
        expect(this.selectable.getAttribute('selected')).to.equal('2');
        expect(this.selectable.getAttribute('selected')).to.equal(this.selectable.getAttribute('highlighted'));
    });
    
    it("should highlight the hovered item", function() {
        // given
        expect(this.selectable.getAttribute('highlighted')).to.equal('0');
        mouse.moveTo(this.selectable.querySelector('li:nth-child(1)'));

        // when
        var element = this.selectable.querySelector('li:nth-child(2)');
        mouse.moveTo(element);

        // then
        expect(this.selectable.getAttribute('highlighted')).to.equal('1');
    });

    it("should keep highlight when mouse is moved outside", function() {
        // given
        expect(this.selectable.getAttribute('highlighted')).to.equal('0');
        
        // when
        injectHtml('<div id="somewhere">somewhere</div>');
        mouse.moveTo(document.getElementById('somewhere'));

        // then
        expect(this.selectable.getAttribute('highlighted')).to.equal('0');
    });

    it("should highlight and select the cliked item", function() {
        var element = this.selectable.querySelector('li:nth-child(2)');
        mouse.click(element);
        expect(this.selectable.getAttribute('highlighted')).to.equal('1');
        expect(this.selectable.getAttribute('selected')).to.equal('1');
    });
});