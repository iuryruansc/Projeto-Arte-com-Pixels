const firstColor = document.querySelector("#color-palette").firstElementChild;
firstColor.style.backgroundColor = 'black';

const secondColor = firstColor.nextElementSibling;
secondColor.style.backgroundColor = 'blue';

const thirdColor = secondColor.nextElementSibling;
thirdColor.style.backgroundColor = 'red';

const forthColor = thirdColor.nextElementSibling;
forthColor.style.backgroundColor = 'green';