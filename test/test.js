var TestSuite = require('spatester').TestSuite;

var testSuite = new TestSuite("Modal test", {});

Testem.useCustomAdapter(function(socket) {
    testSuite.setSocket(socket);
});

testSuite.addTest("Display test", function(scenario, asserter) {

    asserter.assertTrue(function() {
        return document.querySelector('x-modal').hasAttribute('hidden');
    }, 'Au début, la modale ne doit pas être visible');

    scenario
        .exec(function() {
            var modal = document.getElementById('modal');
            modal.show("Titre de la modale", "Contenu de la modale<br/>Clic sur x pour la fermer.");
        });

    asserter.assertTrue(function() {
        return document.querySelectorAll('.x-modal-content').length === 1;
    }, 'La modale doit être visible');

    asserter.assertTrue(function() {
        return ! document.querySelector('x-modal').hasAttribute('hidden');
    }, 'La modale doit être visible (attr hidden)');

    scenario.click('.x-modal-close');

    // TODO il attendre que la modale disparaisse, cependant les wait utilisent un selector, ici il faudrait une fonction

    // asserter.assertTrue(function() {
    //     return document.querySelectorAll('.x-modal-content').length === 0;
    // }, 'Après un click sur X, la modale ne doit pas être visible');
});

document.addEventListener('DOMComponentsLoaded', function(){
    testSuite.run();
});