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
        //GIVEN
        this.selectable.focus();

        //WHEN
        kb.hit(kb.DOWN);

        //THEN
        expect(this.selectable.getAttribute('highlighted')).to.equal('1');
    });

    it("should select the highlighted item when pressing enter key", function() {
        //GIVEN
        this.selectable.focus();
        kb.hit(kb.DOWN);
        var highlightedIndex = this.selectable.getAttribute('highlighted');

        //WHEN
        kb.hit(kb.ENTER);

        //THEN
        var selectedIndex = this.selectable.getAttribute('selected');
        expect(selectedIndex).to.equal(highlightedIndex);
        expect(this.selectable.getItem(selectedIndex).classList.contains('vr-selectable-selected')).to.be.true;
    });

    it("should select only one item", function() {
        //GIVEN 
        this.selectable.focus();
        //Select fist item
        kb.hit(kb.DOWN);
        kb.hit(kb.ENTER);

        //WHEN
        //Select Next
        kb.hit(kb.DOWN);
        kb.hit(kb.ENTER);
        
        //THEN
        expect(this.selectable.getAttribute('selected')).to.equal('2');
        expect(this.selectable.getAttribute('selected')).to.equal(this.selectable.getAttribute('highlighted'));
    });
    
    it("should highlight the hovered item", function() {
        // given
        expect(this.selectable.getAttribute('highlighted')).to.equal('0');
        //FIXME use getItem
        mouse.moveTo(this.selectable.querySelector('li:nth-child(1)'));

        // when
        //FIXME use getItem
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
        //GIVEN

        //WHEN
        var element = this.selectable.querySelector('li:nth-child(2)');
        mouse.click(element);

        //THEN
        expect(this.selectable.getAttribute('highlighted')).to.equal('1');
        expect(this.selectable.getAttribute('selected')).to.equal('1');

    });

    it("should get focus when hovered item", function() {
        // given
        expect(this.selectable.getAttribute('highlighted')).to.equal('0');
        mouse.moveTo(this.selectable.querySelector('li:nth-child(1)'));

        // when
        var element = this.selectable.querySelector('li:nth-child(2)');
        mouse.moveTo(element);

        // then
        expect(document.activeElement).not.to.be.equal(this.selectable);
    });

    it("should highlight on keypress only if focused", function() {
        //GIVEN
        this.selectable.blur();
        
        //WHEN
        kb.hit(kb.DOWN);

        //THEN
        expect(document.activeElement).not.to.be.equal(this.selectable);
        expect(this.selectable.hasAttribute('highlighted')).to.be.false;
    });

    it("should remove highlight on blur", function() {
        //GIVEN
        //One item highlighted
        kb.hit(kb.DOWN);

        //WHEN
        this.selectable.blur();

        //THEN
        expect(this.selectable.hasAttribute('highlighted')).to.be.false;
    });

    it("should keep selected item on blur", function() {
        //GIVEN
        //One item highlighted
        kb.hit(kb.DOWN);

        //WHEN
        this.selectable.blur();

        //THEN
        expect(this.selectable.hasAttribute('highlighted')).to.be.false;
    });
});