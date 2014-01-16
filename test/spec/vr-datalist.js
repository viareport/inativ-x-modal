describe('vr-datalist', function() {
    before(function(done) {
        this.datalist = appendComponent('vr-datalist', {}, '<option value="Toto"><option value="Tata"><option value="Titi">', done);
    });

    after(function() {
        document.body.innerHTML = '';
    });

    it("should have an options property", function() {
        expect(this.datalist).to.have.property('options');
    });
});