const headerNav = document.getElementById("header-navigation");
const headerMenuBtn = document.getElementById("header-menu-btn")

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

loadArticles().then(data => {
    const articles = data.articles;
    if( archivesContainer) {
        renderCards(articles);
    }
});