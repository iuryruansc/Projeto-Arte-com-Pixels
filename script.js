const board = document.querySelector('#pixel-board')
const palettes = document.querySelectorAll(".color");


const randomColors = (event) => {
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

const firstColor = document.querySelector("#color-palette").firstElementChild;
firstColor.style.backgroundColor = 'black';

const secondColor = firstColor.nextElementSibling;
secondColor.style.backgroundColor = 'blue';

const thirdColor = secondColor.nextElementSibling;
thirdColor.style.backgroundColor = 'red';

const forthColor = thirdColor.nextElementSibling;
forthColor.style.backgroundColor = 'green';

const buttonRandomColor = document.querySelector("#button-random-color");
buttonRandomColor.addEventListener('click', randomColors)

window.onload = () => {
    criaMatriz();
    bgColor();
}
