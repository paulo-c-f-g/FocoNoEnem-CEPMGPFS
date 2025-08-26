const headerNav = document.getElementById("header-navigation");
const headerMenuBtn = document.getElementById("header-menu-btn")

headerMenuBtn.addEventListener( 'click', () => {
    headerNav.classList.toggle("header__nav--active");
    headerMenuBtn.classList.toggle("header__menu-btn--active");
});