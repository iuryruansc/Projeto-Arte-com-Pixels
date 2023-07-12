const board = document.querySelector('#pixel-board');
const palettes = document.querySelectorAll(".color");

// função para gerar cores aleatórias para a paleta
const randomColors = () => {
    let newArray = [];
    for (let index = 0; index < palettes.length; index++) {
        if (index > 0) {
            let red = Math.floor(Math.random() *256)
            let green = Math.floor(Math.random() *256)
            let blue = Math.floor(Math.random() *256)
            let color = "rgb(" + red + "," + green + "," + blue + ")";

            palettes[index].style.backgroundColor = color;

            newArray.push(color)
            localStorage.setItem('colorPalette', JSON.stringify(newArray));
        }
    }
}

// função para manter os valores de cor da paleta
const bgColor = () => {
    if (localStorage.getItem('colorPalette') === null) {
        return;
    } else {
        const colors = JSON.parse(localStorage.getItem('colorPalette'));
        const palettes = document.querySelectorAll(".color");
        for (let index = 1; index < palettes.length; index += 1) {
            let cor = colors[index-1];
            palettes[index].style.backgroundColor = cor;
        }
    }
}

// função para criar a matriz de pixels
const criaMatriz = () => {  
    for (let i = 0; i < 5; i += 1) {
        let newCell = document.createElement('div');
        board.appendChild(newCell);
        for (let j = 0; j < 5; j += 1) {
            let newDiv = document.createElement('div');
            newDiv.className = 'pixel';
            newDiv.style.backgroundColor = 'white';
            newCell.appendChild(newDiv);      
        }
    }   
}

// função para resetar os valores de cor e classe iniciais
const initalColor = () => {
    const initalBG = firstColor.style.backgroundColor;
    localStorage.setItem('selectedColor', initalBG)
    firstColor.classList.add('selected');

    for (let index = 1; index < palettes.length; index += 1) {
        palettes[index].classList.remove("selected");
    }
}

// função para adicionar e remover a classe select e armazenar o valor da cor
const colorSelect = (event) => {
    const color = event.target.style.backgroundColor;
    
    for (let index = 0; index < palettes.length; index += 1) {
       if(palettes[index].classList.contains("selected")); {
        palettes[index].classList.remove("selected")
       } 
     event.target.classList.add('selected');
     localStorage.setItem('selectedColor', color);
    }
    
}

// função para mudar a cor dos pixels da matriz
const pixelColor = () => {
    const pixelBoard = document.querySelector('#pixel-board');
    pixelBoard.addEventListener('click', (event) => {
        if (event.target.className === 'pixel') {
            const selected = localStorage.getItem('selectedColor')
            event.target.style.backgroundColor = selected;
        }
    })
}

// adicionando eventos para a paleta de cores
const firstColor = document.querySelector("#color-palette").firstElementChild;
firstColor.style.backgroundColor = 'black';
firstColor.addEventListener('click', colorSelect);

const secondColor = firstColor.nextElementSibling;
secondColor.style.backgroundColor = 'blue';
secondColor.addEventListener('click', colorSelect);

const thirdColor = secondColor.nextElementSibling;
thirdColor.style.backgroundColor = 'red';
thirdColor.addEventListener('click', colorSelect);

const forthColor = thirdColor.nextElementSibling;
forthColor.style.backgroundColor = 'green';
forthColor.addEventListener('click', colorSelect);

// adicionando um evento para o botão de cores
const buttonRandomColor = document.querySelector("#button-random-color");
buttonRandomColor.addEventListener('click', randomColors)

// funções iniciadas ao carregar a página
window.onload = () => {
    pixelColor();
    initalColor();
    criaMatriz();
    bgColor();
}