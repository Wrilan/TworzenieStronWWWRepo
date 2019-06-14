var lastSelectedImage = null;
var locked = false;
var score = 0;
var move = 0;

function start() {
  var board = createBoard();
 showScore();
showMoves();
  setTimeout(() => {
    board.forEach(hideImage);
  }, 2000);
}
window.onload = start;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function imagesAreTheSame(img1, img2) {
  return img1.src === img2.src;
}

function addScore() {
  score++;
}
function addMoves() {
  move++;
if(move > 32) {
     alert("Przegrana, kliknij OK, aby rozpoczac nowa gre.");
location.reload();
return;
   }
}

function showScore() {
  document.getElementById('score').innerHTML = score;
}

function showMoves() {
  document.getElementById('move').innerHTML = move;
}

function showImage(image) {
  image.className = 'visible';
}

function hideImage(image) {
  image.className = 'hidden';
}

function selectImage(image) {
  

  if (!locked && image.className === 'hidden') {
    image.className = 'selected';
    addMoves();
    showMoves();
    if (lastSelectedImage === null) {
      lastSelectedImage = image;
    } else {
    
      if (imagesAreTheSame(lastSelectedImage, image)) {
        addScore();
        showImage(lastSelectedImage);
        showImage(image);
        showScore();
        if(score == 8){
        alert("WYGRANA");
    }
        lastSelectedImage = null;
      } else {
        locked = true;

        setTimeout(() => {
          hideImage(lastSelectedImage);
          hideImage(image);

          locked = false;
          lastSelectedImage = null;
        }, 500);
      }
    }
  }
}

function createBoard() {
  const images = [
    'https://www.w3schools.com/w3css/img_lights.jpg',
    'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://helpx.adobe.com/in/stock/how-to/visual-reverse-image-search/_jcr_content/main-pars/image.img.jpg/visual-reverse-image-search-v2_1000x560.jpg',
    'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'http://news.mit.edu/sites/mit.edu.newsoffice/files/images/2016/MIT-Earth-Dish_0.jpg',
    'https://cdn.pixabay.com/photo/2016/09/01/10/23/image-1635747_960_720.jpg',
    'https://www.wonderplugin.com/videos/demo-image0.jpg',
    'https://images.pexels.com/photos/237018/pexels-photo-237018.jpeg?cs=srgb&dl=asphalt-beauty-colorful-237018.jpg&fm=jpg'
  ];
  const table = document.getElementById('game-board');
  const squares = shuffle(images.concat(images));
  const board = [];

  
  for (let i = 0; i < 4; i++) {
    const row = table.insertRow(i);

    for (let j = 0; j < 4; j++) {
      const square = row.insertCell(j);
      const squareImg = document.createElement('img');

      squareImg.className = 'visible';
      squareImg.src = squares[4 * i + j]; 
      squareImg.onclick = function(event) {
        selectImage(event.target);
      };

      square.appendChild(squareImg);
      board.push(squareImg);
    }
  }

  return board;
}
								