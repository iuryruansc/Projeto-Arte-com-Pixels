const board = document.querySelector('#pixel-board');
const palettes = document.querySelectorAll(".color");
const pixelBoard = document.getElementsByClassName('pixel');
let pixelRGB = [];

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
        for (let index = 1; index < palettes.length; index += 1) {
            let cor = colors[index-1];
            palettes[index].style.backgroundColor = cor;
        }
    }
}

// função para criar a matriz de pixels
const criaMatriz = () => {
    if (localStorage.getItem('boardSize') === null) {  
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
    } else {
        saveNewBoard();
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

const saveBoard = () => {
    for (let index = 0; index < pixelRGB.length; index += 1) {
        const color = pixelBoard[index].style.backgroundColor;
        pixelRGB[index] = color;
    }
    localStorage.setItem('pixelBoard', JSON.stringify(pixelRGB));
}

// função para mudar a cor dos pixels da matriz
const pixelColor = () => {
    board.addEventListener('click', (event) => {
        const pixelBoard = document.getElementsByClassName('pixel');
        if (event.target.className === 'pixel') {
            const selected = localStorage.getItem('selectedColor')
            event.target.style.backgroundColor = selected;
        }
        saveBoard();
        })
}

// função para resetar as cores
const resetColor = () => {
    for (let index = 0; index < pixelBoard.length; index += 1) {
        pixelBoard[index].style.backgroundColor = 'white';
        pixelRGB[index] = 'white';
    }
    localStorage.setItem('pixelBoard', JSON.stringify(pixelRGB));

}

// função para salvar o desenho atual
const saveDrawing = () => {
    pixelRGB.length = pixelBoard.length;
    if (localStorage.getItem('pixelBoard') === null) {
        return;
    } else {
        const pixelBG = JSON.parse(localStorage.getItem('pixelBoard'));
        for (let index = 0; index < pixelRGB.length; index += 1) {
          const bg = pixelBG[index];
          pixelBoard[index].style.backgroundColor = bg;  
        }
    }
}

// função para preencher novo quadro 
const newBoard = () => {
    let boardSize = parseInt(document.querySelector('#board-size').value);
    boardSize = boardLimit(boardSize);
    const currentBoard = board.childNodes.length;
    if (isNaN(boardSize) || boardSize <= 0) {
        alert('Board inválido')
    } else {
        for (let index = 0; index < currentBoard; index += 1) {
            const row = board.firstElementChild;
            board.removeChild(row);
        }
        for (let i = 0; i < boardSize; i += 1) {
            let newCell = document.createElement('div');
            board.appendChild(newCell);
            for (let j = 0; j < boardSize; j += 1) {
                let newDiv = document.createElement('div');
                newDiv.className = 'pixel';
                newDiv.style.backgroundColor = 'white';
                newCell.appendChild(newDiv);      
            }
        }   
    }
    localStorage.setItem('boardSize', boardSize);
    novaMatriz();
}

// função para limitar o tamanho do board
const boardLimit = (event) => {
    if (event < 5) {
        event = 5; 
    } else if (event > 50) {
        event = 50;
    }
    return event;
}

// função para salvar o novo board
const saveNewBoard = () => {
    const newSize= localStorage.getItem('boardSize');
    for (let i = 0; i < newSize; i += 1) {
        let newCell = document.createElement('div');
        board.appendChild(newCell);
        for (let j = 0; j < newSize; j += 1) {
            let newDiv = document.createElement('div');
            newDiv.className = 'pixel';
            newDiv.style.backgroundColor = 'white';
            newCell.appendChild(newDiv);      
        }
    }   
}

const novaMatriz = () => {
    console.log(pixelBoard.length);
    pixelRGB.length = pixelBoard.length;
    localStorage.setItem('pixelBoard', JSON.stringify(pixelRGB));
    resetColor();
}

// adicionando eventos para os elementos 
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

const buttonResetColor = document.querySelector('#clear-board');
buttonResetColor.addEventListener('click', resetColor);

const buttonRandomColor = document.querySelector("#button-random-color");
buttonRandomColor.addEventListener('click', randomColors);

const buttonNewBoard = document.querySelector('#generate-board');
buttonNewBoard.addEventListener('click', newBoard);

// funções iniciadas ao carregar a página
window.onload = () => {
    criaMatriz();
    pixelColor();
    initalColor();
    bgColor();
    saveDrawing();
}