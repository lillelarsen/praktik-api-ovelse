document.addEventListener('DOMContentLoaded', () => {

fetch('http://loremricksum.com/api/?paragraphs=1&quotes=1')
.then(function(response) {
    return response.json();
}).then(function (data) {

    document.querySelector('blockquote').innerHTML = data.data[0];


})

});