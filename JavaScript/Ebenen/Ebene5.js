import { riddleManager } from '../RätselManager.js';

export const Flur400Config = {

    zones: [
        {

        dataArray: Flur400ZonenData, // Symbolarray für Zonen
        tileWidth: 72,
        tileHeight: 72,
        offsetX: -2800,
        offsetY: -1100,
        matchSymbol: 584, // Symbol für Zonen
        ZoneClass: ZoneFlur,
        blockMovement: true,
        transitionCondition: null,
        },
        {
        dataArray: Flur400TürZonen, // Symbolarray für Zonen
        tileWidth: 72,
        tileHeight: 72,
        offsetX: -2800,
        offsetY: -1100,
        matchSymbol: 584, // Symbol für Zonen
        ZoneClass: ZoneFlur,
        blockMovement: false,
        transitionCondition: () => keys.ArrowDown.pressed || movingtouchDown,
        targetLevel: 'Aula'


            
        }


    ],
    dialog: {
        text: "Willkommen auf dem 400er Flur! <br> Gehe nun zur Aula.",
        show: true,
    },
    flur: true, 
    blockMovementUntilContinue: true, 

    backgroundAnchor:  { x: 3350, y: 1400 },

    background: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img2/Flure/Flur400/Flur1.png';
            return image;
        })(),
    }),

    foreground: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img2/Flure/Flur400/FlurVG.png';
            return image;
        })(),
    }),

    
    //transitions: SchulhofTransitions,
    ui: { title: false, interface: false, moving: false },
};



export const AulaConfig = {


    zones: [
        {
    
        dataArray: AulaZonenData, // Symbolarray für Zonen
        tileWidth: 36,
        tileHeight: 36,
        offsetX: 0,
        offsetY: 0,
        matchSymbol: 432, // Symbol für Zonen
        ZoneClass: ZoneRaum,
        blockMovement: true,
        transitionCondition: null,
        targetLevel: null,
        },
        {
        dataArray: AulaRätselZonen, // Symbolarray für Zonen
        tileWidth: 36,
        tileHeight: 36,
        offsetX: 0,
        offsetY: 0,
        matchSymbol: 2801, // Symbol für Zonen
        ZoneClass: ZoneRaum,
    
        blockMovement: () => {
            const riddleName = "ki"; // Name des Rätsels
            if (riddleManager.completedRiddles.has(riddleName)) {
            console.log(`Rätsel "${riddleName}" abgeschlossen. Bewegung blockiert.`);
            return true; // Blockiere Bewegung
            }
            return false; // Bewegung nicht blockieren
        },
        transitionCondition: () => {
            if (!riddleManager) {
                console.error('RätselManager ist nicht initialisiert.');
                return false;
            }
    
            const riddleName = "ki"; // Name des Rätsels
            if (riddleManager.completedRiddles.has(riddleName)) {
                console.log(`Rätsel "${riddleName}" bereits abgeschlossen. Kein erneuter Eintritt möglich.`);
                return false; // Zone blockiert
            }
    
    
    
            if(keys.ArrowUp.pressed || movingtouchUp) {
                                   
                riddleManager.showChat(riddleName);  // Die Flur1-Ebene starten
                return true;  // Bedingung erfüllt, Übergang wird ausgelöst
            }
                return false;
        }
    },
    

    
    ],
    
    riddle: true, 
    blockMovementUntilContinue: true, 
    backgroundAnchor:  { x: 1300, y: 1100 },
    //backgroundAnchorRiddle: {x: 1330, y: 670},
    background: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img2/Räume/Aula/Aula.png';
            return image;
        })(),
    }),
    
    backgroundAfter: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img2/Räume/Aula/Aula.png';
            return image;
        })(),
    }),
    
    
    foreground: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img2/Räume/Aula/AulaVordergrund.png';
            return image;
        })(),
    }),
    
    
    
    dialog: {
        text: "Du hast es in die Aula geschafft. Gehe zur Tafel, um dir deine Urkunde abzuholen!",
        show: true,
    },
    ui: { title: false, interface: false, moving: false },
    };