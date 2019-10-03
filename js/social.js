document.addEventListener('DOMContentLoaded', () => {

fetch('js/social.json')
  .then(function(response) {
      return response.json();
  })
  .then(function(data) {
        for (i = 0; i < data.length; i++) {
            console.table(data);

        }

    const social = document.querySelector('.social');
    const overskrift = document.createElement('h2');
    const liste = document.createElement('ul');
    social.appendChild(overskrift);
    social.appendChild(liste);

    for (let i = 0; i < data.length; i++) {

    let listItem = document.createElement('li');
    let link = document.createElement('a');
    let logoContain = document.createElement('i');
    let li_class = data[i].li_class;
    let webadresse = data[i].webadresse;
    let logo = data[i].logo;
    
    
    liste.appendChild(listItem);
    listItem.setAttribute('class', li_class);
    listItem.appendChild(link);
    link.setAttribute('href', webadresse);
    link.appendChild(logoContain);
    logoContain.setAttribute('class', logo);

    };
});

});