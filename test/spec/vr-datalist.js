// This is the only option to force IE9 to have <option>s in something other than <optgroup> or <select>
// You just can't do: document.body.innerHTML = '<vr-datalist><option value="test"></vr-datalist>'
function addDatalistOption(datalist, value) {
    var opt = document.createElement('option');
    opt.setAttribute('value', value);
    datalist.appendChild(opt);
}

function createDatalist(options, id) {
    var datalist = document.createElement('vr-datalist');
    if (id) {
        datalist.setAttribute('id', id);
    }
    if (options) {
        options.forEach(function(value) {
            addDatalistOption(datalist, value);
        });
    }
    document.body.appendChild(datalist);
    return datalist;
}

describe('vr-datalist', function() {

    it("may be created without options", function(done) {
        var datalist = createDatalist();
        expect(datalist).to.have.property('options');
        expect(datalist.options.length).to.equal(0);
        done();
    });

    it("may be created with options", function(done) {
        var datalist = createDatalist(['toto', 'titi']);
        then(function() {
            expect(datalist).to.have.property('options');
            expect(datalist.options.length).to.equal(2);
            done();
        });
    });

    it("should update its options property when options are added", function(done) {
        var datalist = createDatalist(['toto', 'titi']);
        addDatalistOption(datalist, 'tata');
        then(function() {
            expect(datalist.options.length).to.equal(3);
            done();
        });
    });
});