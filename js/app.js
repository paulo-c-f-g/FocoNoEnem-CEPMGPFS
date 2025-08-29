const headerNav = document.getElementById("header-navigation");
const headerMenuBtn = document.getElementById("header-menu-btn")

const searchBtn = document.getElementById("search-btn");
const search = document.querySelector(".search");
const searchContainer = document.querySelector(".search__container")
const searchInput = document.getElementById("search-input");
const searchResults = document.querySelector(".search__results");

const archivesContainer = document.querySelector(".archives__card-container");

const loadArticles = async () => {
    try {
        const res = await fetch("/js/data/articles.json");
        if(!res.ok) {
            throw new Error(`Http Error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch(error) {
        console.error("Erro ao carregar arquivos:", error);
        return null;
    }
}

const filterArticles =  (articles, filters=[]) => {

    if(articles.length <= 0) {
        return articles;
    }  
    let filteredArticles = articles;

    filters.forEach(filter => {
        filteredArticles = filteredArticles.filter(filter);
    });

    return filteredArticles;
}

const searchArticles = (articles, textTarget) => {
    
    searchResults.innerHTML = "";

    const closeResultsBox = () => searchResults.classList.remove("search__results--active");
    const openResultsBox = () => searchResults.classList.add("search__results--active");

    if(textTarget.trim() == "") {
        closeResultsBox();
        return;
    }

    let found = false;

    const regex = new RegExp(textTarget.toLowerCase());
    
    articles.forEach( article => {
        if(regex.test(article.title.toLowerCase()) || regex.test(article.desc.toLowerCase()) 
            || regex.test(article.subject.discipline.toLowerCase()) || regex.test(article.subject.area.toLowerCase())) {

                const searchCard = document.createElement("div");
                searchCard.classList.add("search__card")
                

                searchCard.innerHTML = `
                    <h2>${article.title}</h2>
                    <p>${article.desc}</p>
                </div>
                `
                searchCard.addEventListener('click', () => {
                    window.location.href = article.href;
                })

                found = true;

                searchResults.appendChild(searchCard);
            }
    })

    if(found) {
        openResultsBox();
        return;
    }
    closeResultsBox();

}

const renderCards = (data) => {
    html = "";

    data.forEach( card => {
        html += ` 
        <div class="archive__card-item">
            <a href="${card.href}" class="archive__card-title">${card.title}</a>
            <p class="archive__card-desc">${card.desc}</p>
            <p class="archive__card-meta">Por ${card.author} — ${card.date} </p>
            <a href="${card.href}" class="archive__card-link">Ver Mais</a>
            <p class="archive__card-subject">${card.subject.discipline} — ${card.subject.area} </p>
            
        </div>
        `
        
    })

    archivesContainer.innerHTML = html;
}

headerMenuBtn.addEventListener( 'click', () => {
    headerNav.classList.toggle("header__nav--active");
    headerMenuBtn.classList.toggle("header__menu-btn--active");
});

searchBtn.addEventListener( 'click', () => {
    search.classList.toggle("search--active");
    searchInput.focus();
    
})

//focusout
document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target) && e.target !== searchBtn) {
        search.classList.remove("search--active");
        searchResults.classList.remove("search__results--active");
        searchInput.value = "";
    }
})

// search.addEventListener('focusout', (e) => {
//     if(!search.contains(e.relatedTarget)) {
//         search.classList.remove("search--active");
//         searchResults.classList.remove("search__results--active");
//         searchInput.value = "";
//     }
// })


loadArticles().then(data => {
    const articles = data.articles;
    if( archivesContainer) {
        renderCards(articles);
    }

    searchInput.addEventListener( 'input', () => {
        searchArticles(articles, searchInput.value);
    })


});