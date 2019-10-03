HTMLElement.prototype.clear = function () {
    while(this.firstChild) {
        this.removeChild(this.firstChild);
    }
    return this;
};

const characterLoader = function (data) {

    const main = document.querySelector('main');
    const article = document.createElement('article');
    article.setAttribute('class', 'personLoad');
    const frame = document.createElement('img');
    frame.setAttribute('src', `${data.image}`);
    const h1 = document.createElement('h1');
    const pSpecies = document.createElement('p');
    const pStatus = document.createElement('p');
    const pGender = document.createElement('p');
    const pHome = document.createElement('p');
    const navn = document.createTextNode(data.name);
    const species = document.createTextNode('Art: ' + data.species);
    const status = document.createTextNode('Status: ' + data.status);
    const gender = document.createTextNode('Køn: ' + data.gender);
    const home = document.createTextNode('Bor: ' + data.origin.name);
    
    main.appendChild(article);
    article.appendChild(frame);
    article.appendChild(h1);
    article.appendChild(pSpecies);
    article.appendChild(pStatus);
    article.appendChild(pGender);
    article.appendChild(pHome);
    pHome.appendChild(home);
    h1.appendChild(navn);
    pSpecies.appendChild(species);
    pStatus.appendChild(status);
    pGender.appendChild(gender);

    return article;
};

const locationLoader = function (data) {
    const main = document.querySelector('main');
    const article = document.createElement('article');
    article.setAttribute('class', 'locationLoad');
    const h1 = document.createElement('h1');
    const pType = document.createElement('p');
    const pDimension = document.createElement('p');
    const navn = document.createTextNode(data.name);
    const type = document.createTextNode('Type: ' + data.type);
    const dimension = document.createTextNode('Dimension: ' + data.dimension);

    main.appendChild(article);
    article.appendChild(h1);
    article.appendChild(pType);
    article.appendChild(pDimension);
    h1.appendChild(navn);
    pType.appendChild(type);
    pDimension.appendChild(dimension);

    return article;
};

const episodeLoader = function (data) {
    const main = document.querySelector('main');
    const article = document.createElement('article');
    article.setAttribute('class', 'episodeLoad');
    const h1 = document.createElement('h1');
    const pAirDate = document.createElement('p');
    const pEpisode = document.createElement('p');
    const navn = document.createTextNode(data.name);
    const airDate = document.createTextNode('Air date: ' + data.air_date);
    const episode = document.createTextNode('Sæson/Episode: ' + data.episode);

    main.appendChild(article);
    article.appendChild(h1);
    article.appendChild(pAirDate);
    article.appendChild(pEpisode);
    h1.appendChild(navn);
    pAirDate.appendChild(airDate);
    pEpisode.appendChild(episode);

    return article;
};

const buildList = function (data) {
    const article = document.createElement('article');
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'buildList');
    const pagination = document.createElement('div');
    pagination.setAttribute('class', 'pagination');
    
    

    if (data.info.prev) {
        const previous = document.createElement('a');
        previous.setAttribute('class', 'paginationButton');
        const prevText = document.createTextNode('Previous');
        previous.appendChild(prevText);
        pagination.appendChild(previous);
        const urlString = data.info.prev.replace('https://rickandmortyapi.com/api/', '');
        const type = urlString.split('/')[0];
        const page = urlString.split('/')[1].replace('?page=', '');

        previous.setAttribute('href', `?type=${type}&page=${page}`);
        
    }

    if (data.info.next) {
        const next = document.createElement('a');
        next.setAttribute('class', 'paginationButton');
        const nextText = document.createTextNode('Next');
        next.appendChild(nextText);
        pagination.appendChild(next);
        article.appendChild(pagination);
        const urlString = data.info.next.replace('https://rickandmortyapi.com/api/', '');
        const type = urlString.split('/')[0];
        const page = urlString.split('/')[1].replace('?page=', '');

        next.setAttribute('href', `?type=${type}&page=${page}`);
    }

    for (let i = 0; i < data.results.length; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.setAttribute('class', 'listItem');
        const text = document.createTextNode(data.results[i].name);
        li.appendChild(a);
        a.appendChild(text);
        ul.appendChild(li);

        const urlString = data.results[i].url.replace('https://rickandmortyapi.com/api/', '');

        const type = urlString.split('/')[0];
        const id = urlString.split('/')[1];

        a.setAttribute('href', `?type=${type}&id=${id}`);
    };

    article.appendChild(pagination);
    article.appendChild(ul);

    return article; 
};


const hent = function (type, id) {
    const main = document.querySelector('main');
    const spinner = document.createElement('i');
    spinner.setAttribute('class', 'fa fa-spinner fa-spin');
    main.appendChild(spinner);
        
    fetch(`https://rickandmortyapi.com/api/${type}/${id}`)
      .then(response => response.json())
      .then(data => { 
        let sheet;
        switch (type) {
            case 'character':
                sheet = characterLoader(data);
                break;
            case 'location':
                sheet = locationLoader(data);
                break;
            case 'episode':
                sheet = episodeLoader(data);
                break;
            default:
                sheet = characterLoader(data);
        }
        document
            .querySelector('main')
            .clear()
            .appendChild(sheet);
    });

    changeLayout();

};

const hentListe = function (type, page) {
    const main = document.querySelector('main');
    const spinner = document.createElement('i');
    spinner.setAttribute('class', 'fa fa-spinner fa-spin');
    main.appendChild(spinner);
    
    fetch(`https://rickandmortyapi.com/api/${type}/?page=${page}`)
      .then(response => response.json())
      .then(data => { 
        
        document
            .querySelector('main')
            .clear()
            .appendChild(buildList(data));
    });
    
    changeLayout();

};

const changeLayout = function () {
    const main = document.querySelector('main');
    const aside = document.querySelector('aside');
    const nav = document.querySelector('nav');
    const categories = document.querySelector('.categories');
    const categoryList = document.querySelector('.categoryList');
    const headlineCategories = document.querySelector('.headlineCategories');
    const social = document.querySelector('.social');
    const footer = document.querySelector('footer');
    aside.setAttribute('class', 'hide');
    nav.setAttribute('class', 'topNavigation');
    categories.setAttribute('class', 'topCategories');
    categoryList.setAttribute('class', 'rowCategory');
    headlineCategories.setAttribute('class', 'hide');
    social.setAttribute('class', 'topSocial');
    main.setAttribute('class', 'mainScreen');
    footer.setAttribute('class', 'allScreen');
 
};

document.addEventListener('DOMContentLoaded', () => {
    
    const pageLoad = document.querySelectorAll('listItem');

    pageLoad.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();

            const urlString = new URL(link.href);
            let type = urlString.searchParams.get('type');
            let page = urlString.searchParams.get('page');
            let id = urlString.searchParams.get('id');

            if (page) {
                hentListe(type, page);
                history.pushState({}, '', `index.html?type=${type}&page=${page}`);
            } else if (id) {
                hent(type, id);
                history.pushState({}, '', `index.html?type=${type}?id=${id}`);
            }

        });
    });   

    const urlString = new URL(window.location.href);
    let type = urlString.searchParams.get('type');
    let page = urlString.searchParams.get('page');
    let id = urlString.searchParams.get('id');
    if (page) {
        hentListe(type, page);
        history.pushState({}, '', `index.html?type=${type}&page=${page}`);
    } else if (id) {
        hent(type, id);
        history.pushState({}, '', `index.html?type=${type}?id=${id}`);
    } 

    const links = document.querySelectorAll('.primaryNavigation__navigationItem a');
  
    for (let i = 0; i < links.length; i++) {
            
            links[i].addEventListener('click', function(event) {
            event.preventDefault();
            fetch(this.href)
                .then(Response => Response.text())
                .then(data => {
                    document.querySelector('main').innerHTML = data;
                    changeLayout();
                }
            
            );
        
        });

    };
    
});

