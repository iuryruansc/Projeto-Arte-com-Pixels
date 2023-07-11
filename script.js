const randomColors = (event) => {
    const palettes = document.querySelectorAll(".color");
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

window.onload = () => {
    const colors = JSON.parse(localStorage.getItem('colorPalette'));
    const palettes = document.querySelectorAll(".color");
    for (let index = 1; index < palettes.length; index += 1) {
        let cor = colors[index-1];
        palettes[index].style.backgroundColor = cor;
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