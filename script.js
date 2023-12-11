/* pega o elemento pelo nome da classe */
const hamburguer = document.querySelector('.hamburguer')
/* pega a barra de navegação  */
const nav = document.querySelector(".nav")

/* adiciona o evento onclick ao botão hamburguer */
hamburguer.addEventListener('click', () => {  /* função arrow */
    nav.classList.toggle("active")
    console.log(nav.classList.value)
})