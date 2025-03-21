

const playerDownImage = new Image();
playerDownImage.src = './img/Spieler/Eule/player2down.png'

const playerUpImage = new Image();
playerUpImage.src = './img/Spieler/Eule/player2up.png'

const playerLeftImage = new Image();
playerLeftImage.src = './img/Spieler/Eule/player2left.png'

const playerRightImage = new Image();
playerRightImage.src = './img/Spieler/Eule/player2right.png'


 
const player = new Sprite({
    position: {
        x: canvas.width / 2 - (192 / 4) / 2, // Koordinaten x-Achse Mitte Haus
        y: canvas.height /2 - 68  / 2 // Koordinaten y-Achse Mitte 
        
       
       
    },
    image: playerDownImage,
    frames: { // wird benötigt um das Zuschneiden zu ermögliche, max kommt aus dem Sprite
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    }
})






let movingtouchUp = false 

let movingtouchRight = false 

let movingtouchLeft = false 

let movingtouchDown = false 

let moving = true

let activeLayer = 'Schulhof'

const keys = {
    ArrowUp: {
        pressed: false 
    },

    ArrowRight: {
        pressed: false 
    },

    ArrowDown: {
        pressed: false 
    },

    ArrowLeft: {
        pressed: false 
    },

    z: {
        pressed: false
    }
}


window.addEventListener('keydown', (e) => { // legt Werte für die Varibalen fest 
    switch (e.key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
        break 

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
        break 

        case 'ArrowDown':
            keys.ArrowDown.pressed = true
        break 

        case 'ArrowRight':
            keys.ArrowRight.pressed = true 
        break 

        case 'w':
            keys.ArrowUp.pressed = true
        break 

        case 'a':
            keys.ArrowLeft.pressed = true
        break 

        case 's':
            keys.ArrowDown.pressed = true
        break 

        case 'd':
            keys.ArrowRight.pressed = true 
        break 

        
      
       

    }
        
})

window.addEventListener('keyup', (e) => { // legt Werte für die Varibalen fest 
    switch (e.key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
        break 

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
        break 

        case 'ArrowDown':
            keys.ArrowDown.pressed = false
        break 

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
        break 
        
        case 'w':
            keys.ArrowUp.pressed = false
        break 

        case 'a':
            keys.ArrowLeft.pressed = false
        break 

        case 's':
            keys.ArrowDown.pressed = false
        break 

        case 'd':
            keys.ArrowRight.pressed = false
        break 
        
       

    }
})     


document.getElementById('Up').addEventListener('touchstart', e => {
    
    movingtouchUp = true 
})

document.getElementById('Up').addEventListener('touchend', e => {
   
   movingtouchUp = false
})

document.getElementById('Right').addEventListener('touchstart', e => {
    
    movingtouchRight = true
})

document.getElementById('Right').addEventListener('touchend', e => {
  
   movingtouchRight = false
})

document.getElementById('Left').addEventListener('touchstart', e => {
    
    movingtouchLeft = true
})

document.getElementById('Left').addEventListener('touchend', e => {
   
   movingtouchLeft = false
})

document.getElementById('Down').addEventListener('touchstart', e => {
   
    movingtouchDown = true
})

document.getElementById('Down').addEventListener('touchend', e => {
   
   movingtouchDown = false
})