import { riddleManager } from '../RätselManager.js';


export const Flur100Config = {

    zones: [
        {

        dataArray: Flur100ZonenData, // Symbolarray für Zonen
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
        dataArray: Flur100TürZonen, // Symbolarray für Zonen
        tileWidth: 72,
        tileHeight: 72,
        offsetX: -2800,
        offsetY: -1100,
        matchSymbol: 584, // Symbol für Zonen
        ZoneClass: ZoneFlur,
        blockMovement: false,
        transitionCondition: () => keys.ArrowUp.pressed || movingtouchUp,
        targetLevel: 'EnglischRaum'


            
        }


    ],
    dialog: {
        text: "Willkommen auf dem 100er Flur! <br> Gehe nun zum Raum 102.",
        show: true,
    },
    flur: true, 
    blockMovementUntilContinue: true, 

    backgroundAnchor:  { x: 3450, y: 1350 },

    background: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img2/Flure/Flur100/Flur1.png';
            return image;
        })(),
    }),

    foreground: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img2/Flure/Flur100/FlurVG.png';
            return image;
        })(),
    }),

    
    //transitions: SchulhofTransitions,
    ui: { title: false, interface: false, moving: false },
};

export const Flur100DanachConfig = {

    zones: [
        {

        dataArray: Flur100ZonenData, // Symbolarray für Zonen
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
        dataArray: Flur100TreppeZonen, // Symbolarray für Zonen
        tileWidth: 72,
        tileHeight: 72,
        offsetX: -2800,
        offsetY: -1100,
        matchSymbol: 584, // Symbol für Zonen
        ZoneClass: ZoneFlur,
        blockMovement: false,
        transitionCondition: () => keys.ArrowRight.pressed || movingtouchRight,
        targetLevel: 'flur2'


            
        }


    ],
    dialog: {
        text: "Begib dich nun zur Treppe.",
        show: true,
    },
    flur: true, 
    blockMovementUntilContinue: true, 

    backgroundAnchor:  { x: 3062, y: 850 },

    background: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img2/Flure/Flur100/Flur2.png';
            return image;
        })(),
    }),

    foreground: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img2/Flure/Flur100/FlurVG.png';
            return image;
        })(),
    }),

    
    //transitions: SchulhofTransitions,
    ui: { title: false, interface: false, moving: false },
};



export const EnglischRaumConfig = {

zones: [
    {

    dataArray: EnglischRaumZonenData, // Symbolarray für Zonen
    tileWidth: 36,
    tileHeight: 36,
    offsetX: 0,
    offsetY: 0,
    matchSymbol: 3909, // Symbol für Zonen
    ZoneClass: ZoneRaum,
    blockMovement: true,
    transitionCondition: null,
    targetLevel: null,
    },
    {
    dataArray: RätselZonenData, // Symbolarray für Zonen
    tileWidth: 36,
    tileHeight: 36,
    offsetX: 0,
    offsetY: 0,
    matchSymbol: 3909, // Symbol für Zonen
    ZoneClass: ZoneRaum,

    blockMovement: () => {
        const riddleName = "scratch"; // Name des Rätsels
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

        const riddleName = "scratch"; // Name des Rätsels
        if (riddleManager.completedRiddles.has(riddleName)) {
            console.log(`Rätsel "${riddleName}" bereits abgeschlossen. Kein erneuter Eintritt möglich.`);
            return false; // Zone blockiert
        }



        if(keys.ArrowUp.pressed || movingtouchUp) {
                               
            riddleManager.showGuide(riddleName);  // Die Flur1-Ebene starten
            return true;  // Bedingung erfüllt, Übergang wird ausgelöst
        }
            return false;
    }
},
{
    dataArray: TürZonenData, // Symbolarray für Zonen
    tileWidth: 36,
    tileHeight: 36,
    offsetX: 0,
    offsetY: 0,
    matchSymbol: 3909, // Symbol für Zonen
    ZoneClass: ZoneRaum,
    targetLevel: 'flur1Danach',
    transitionCondition: () => {

        const riddleName = "scratch"; // Name des Rätsels
        if (!riddleManager.completedRiddles.has(riddleName)) {
            console.log(`Rätsel "${riddleName}" bereits abgeschlossen. Kein erneuter Eintritt möglich.`);
            return false; // Zone blockiert
        }
        
        if(keys.ArrowRight.pressed || movingtouchRight) {
                               
           
            return true;  // Bedingung erfüllt, Übergang wird ausgelöst
        }
            return false;
    }


}




],

riddle: true, 
blockMovementUntilContinue: true, 
backgroundAnchor:  { x: 1300, y: 1100 },
//backgroundAnchorRiddle: {x: 1330, y: 670},
background: new Sprite({
    position: { x: 0, y: 0 },
    image: (() => {
        const image = new Image();
        image.src = './img2/Räume/Englisch/Englischraum1.png';
        return image;
    })(),
}),

backgroundAfter: new Sprite({
    position: { x: 0, y: 0 },
    image: (() => {
        const image = new Image();
        image.src = './img2/Räume/Englisch/Englischraum2.png';
        return image;
    })(),
}),


foreground: new Sprite({
    position: { x: 0, y: 0 },
    image: (() => {
        const image = new Image();
        image.src = './img2/Räume/Englisch/VGEnglischraum.png';
        return image;
    })(),
}),



dialog: {
    text: "Willkommen im Englischraum 102! <br> Gehe nun zur Tafel, um das Rätsel zu starten.",
    show: true,
},
ui: { title: false, interface: false, moving: false },
};