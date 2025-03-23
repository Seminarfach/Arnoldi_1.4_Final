import { riddleManager } from '../RätselManager.js';



export const schulhofConfig = {

    

    zones: [
        {

        dataArray: SchulhofZonenData, // Symbolarray für Zonen
        tileWidth: 36,
        tileHeight: 36,
        matchSymbol: 2809, // Symbol für Zonen
        ZoneClass: ZoneSchulhof,
        blockMovement: true,
        transitionCondition: null,
        targetLevel: null,
        anchor: { x: 0, y: 0 }, // Fixpunkt für diese Zone
        },
        {
        dataArray: EingangSchulhofData, // Symbolarray für Zonen
        tileWidth: 36,
        tileHeight: 36,
        anchor: { x: 0, y: 0 }, // Fixpunkt für diese Zone
        matchSymbol: 2809, // Symbol für Zonen
        ZoneClass: ZoneSchulhof,
        blockMovement: false,
        transitionCondition: () => keys.ArrowLeft.pressed || movingtouchLeft,
        targetLevel: 'flur0',
       
        }


    ],
    dialog: {
        text: "Willkommen auf dem Schulhof!<br>Begib dich nun zum Haupteingang.",
        show: true,
    },
    blockMovementUntilContinue: true, 
    flur: true,

    backgroundAnchor:  { x: 1550, y: 700 },
 
    background: new Sprite({
        position: { x: 0, 
                    y: 0 
        },
        
        image: (() => {
            const image = new Image();
            image.src = './img/Schulhof/Schulhof.png';
            return image;
        })(),
    }),

    foreground: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img/Schulhof/VordergrundSchulhof.png';
            return image;
        })(),
    }),
    
    
    ui: { title: false, interface: false, moving: false },
    
};

//-------------------------------------------------------------------------------------------------------------------------



export const Flur000Config = {

    zones: [
        {

        dataArray: Flur1ZonenData, // Symbolarray für Zonen
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
        dataArray: EingangRaum1Data, // Symbolarray für Zonen
        tileWidth: 72,
        tileHeight: 72,
        offsetX: -2800,
        offsetY: -1100,
        matchSymbol: 584, // Symbol für Zonen
        ZoneClass: ZoneFlur,
        blockMovement: false,
        transitionCondition: () => keys.ArrowUp.pressed || movingtouchUp,
        targetLevel: 'InformatikRaum'


            
        }


    ],
    dialog: {
        text: "Willkommen auf dem 000er Flur! <br> Gehe nun zum Raum 002.",
        show: true,
    },
    flur: true, 
    blockMovementUntilContinue: true, 

    backgroundAnchor:  { x: 3000, y: 1300 },

    background: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img2/Flure/Flur000/Flur1.png';
            return image;
        })(),
    }),

    foreground: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img2/Flure/Flur000/FlurVG.png';
            return image;
        })(),
    }),

    
    //transitions: SchulhofTransitions,
    ui: { title: false, interface: false, moving: false },
};

// //-------------------------------------------------------------------------------------------------------------------------

export const Flur000DanachConfig = {

    zones: [
        {

        dataArray: Flur1ZonenData, // Symbolarray für Zonen
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
        dataArray: TreppeZonenData, // Symbolarray für Zonen
        tileWidth: 72,
        tileHeight: 72,
        offsetX: -2800,
        offsetY: -1100,
        matchSymbol: 584, // Symbol für Zonen
        ZoneClass: ZoneFlur,
        blockMovement: false,
        transitionCondition: () => keys.ArrowDown.pressed || movingtouchDown,
        targetLevel: 'flur1'


            
        }


    ],
    dialog: {
        text: "Begib dich nun zur Treppe.",
        show: true,
    },
    flur: true, 
    blockMovementUntilContinue: true, 

    backgroundAnchor:  { x: 3080, y: 850 },

    background: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img2/Flure/Flur000/Flur2.png';
            return image;
        })(),
    }),

    foreground: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img2/Flure/Flur000/FlurVG.png';
            return image;
        })(),
    }),

    
    //transitions: SchulhofTransitions,
    ui: { title: false, interface: false, moving: false },
};


// //-------------------------------------------------------------------------------------------------------------------------

export const InformatikRaumConfig = {

zones: [
    {

    dataArray: InformatikRaumZonenData, // Symbolarray für Zonen
    tileWidth: 36,
    tileHeight: 36,
    offsetX: 0,
    offsetY: 0,
    matchSymbol: 2901, // Symbol für Zonen
    ZoneClass: ZoneRaum,
    blockMovement: true,
    transitionCondition: null,
    targetLevel: null,
    },
    {
    dataArray: InformatikZonenTafel, // Symbolarray für Zonen
    tileWidth: 36,
    tileHeight: 36,
    offsetX: 0,
    offsetY: 0,
    matchSymbol: 2901, // Symbol für Zonen
    ZoneClass: ZoneRaum,

    blockMovement: () => {
        const riddleName = "roboter"; // Name des Rätsels
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

        const riddleName = "roboter"; // Name des Rätsels
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
    dataArray: InformatikTürZonen, // Symbolarray für Zonen
    tileWidth: 36,
    tileHeight: 36,
    offsetX: 0,
    offsetY: 0,
    matchSymbol: 2901, // Symbol für Zonen
    ZoneClass: ZoneRaum,
    targetLevel: 'flur0Danach',
    transitionCondition: () => {

        const riddleName = "roboter"; // Name des Rätsels
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
backgroundAnchor:  { x: 1700, y: 1000 },
//backgroundAnchorRiddle: {x: 1330, y: 670},
background: new Sprite({
    position: { x: 0, y: 0 },
    image: (() => {
        const image = new Image();
        image.src = './img2/Räume/Informatik/InfoRaum1.png';
        return image;
    })(),
}),

backgroundAfter: new Sprite({
    position: { x: 0, y: 0 },
    image: (() => {
        const image = new Image();
        image.src = './img2/Räume/Informatik/InfoRaum2.png';
        return image;
    })(),
}),


foreground: new Sprite({
    position: { x: 0, y: 0 },
    image: (() => {
        const image = new Image();
        image.src = './img2/Räume/Informatik/VGInfoRaum.png';
        return image;
    })(),
}),



dialog: {
    text: "Willkommen im Informatik Raum 002! <br> Gehe nun zur Tafel, um das Rätsel zu starten.",
    show: true,
},
ui: { title: false, interface: false, moving: false },
};

// //-------------------------------------------------------------------------------------------------------------------------

