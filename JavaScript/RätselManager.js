
import { riddleConfig } from "./Ebenen/Rätsel.js";
import { levelManager } from "./EbenenModul.js";
import { PDFDocument, rgb } from 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm';






function umsortierenButtons() {
    const Antworten = document.getElementById('Answers');
    const buttons = Array.from(Antworten.children);

    // Speichere Button-Elemente UND deren ursprünglichen Text- und Index-Werte
    const buttonData = buttons.map((button) => ({
        button,
        text: button.textContent.trim(),  // Der sichtbare Text
        originalIndex: parseInt(button.getAttribute('data-index')), // Ursprünglicher Index
    }));

    // Mische das Array **ohne den Zusammenhang zwischen Button und Text zu verlieren**
    for (let i = buttonData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [buttonData[i], buttonData[j]] = [buttonData[j], buttonData[i]];
    }

    // **Setze die Buttons im DOM neu**, aber behalte ihre Originalwerte
    Antworten.innerHTML = ""; // Entferne alte Buttons aus dem DOM
    buttonData.forEach(({ button, text, originalIndex }) => {
        button.textContent = text;  // Setze den richtigen Text zurück
        button.innerHTML = text
        button.setAttribute('data-index', originalIndex);  // Original-Index beibehalten
        Antworten.appendChild(button);  // Button wieder ins DOM einfügen
    });

    console.log("Neue Button-Reihenfolge:", buttonData.map(({ text, originalIndex }) => ({ text, originalIndex })));
}


class RiddleManager {
    constructor(riddleConfig) {
        this.config = riddleConfig; // Konfiguration für alle Rätsel
        this.currentRiddle = null; // Aktuelles Rätsel
        this.hintsPlayed = []; // Status der Hinweise
        this.soundPlayed = [];
        this.isCompleted = false; // Status: Rätsel abgeschlossen
        this.completedRiddles = new Set();
        this.isClicked = false 

        
    }


    // Initialisiere Eventlistener
    initializeEventListeners() {
         
        // Hinweis-Buttons
        [1, 2, 3].forEach(index => {
            const button = document.querySelector(`#Hinweis${index}`);
            button.addEventListener('click', () => {
                console.log(`Hinweis-Button ${index} wurde geklickt.`);
                this.hintsPlayed[index - 1] = false;
            });
        });

        // Fortfahren-Button
        document.getElementById('Fortfahren').addEventListener('click', () => {
            audio.ButtonKlick.play()
            this.reward = false 
            if (this.isCompleted) {
                if(this.config[this.currentRiddle].targetRiddle === "Ki2") {
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            this.showGuide("ki2")
                            
                            
                          
                            gsap.to('#overlappingDiv', { opacity: 0 });
                        }
                    });
                    
                }
                
                else {

                    

                    


                    


                    

                        document.querySelector('#Interface').style.display = 'block';
                        document.querySelector('#Content').style.display = 'none';
                        document.querySelector('#RewardBox').style.display = 'grid';
                        //document.querySelector('#GuideBox').style.display = 'grid';

                        
                        
                        console.log(this.riddleName)

                        
                        
                            
                        const { rewardImage } = this.config[this.riddleName];
                    
                        

                        const guide = document.getElementById('guide'); // Der Anleitung-Ordner
                        const canvas = document.getElementById('gameCanvas'); // Das Canvas
                        const answer = document.getElementById('Interface')
                        const answerText = document.getElementById('RewardText')
                        const rewardButton = document.getElementById('RewardButton')
                        guide.style.display = 'flex'; // Anleitung sichtbar machen
                        //guide.style.gridTemplateRows = '2'
                        guide.style.justifyContent ='center'
                        guide.scrollTop = 0
                    

                        // Setzen Sie die Größe des Ordners passend zum Canvas
                        guide.style.width = `${canvas.width}px`;
                        guide.style.height = `${canvas.height}px`;
                        guide.style.overflowY = 'auto'
                        guide.style.backgroundColor = 'grey'
                        guide.style.zIndex = 20

                        // Bereinigen Sie den Inhalt des Ordnersf
                        guide.innerHTML = '';

                        answer.style.zIndex = 40 

                        answerText.innerHTML = "Super, ein neuer Teil der Urkunde"

                        
                    
                        
                        // Fügen Sie das Bild für die Anleitung hinzu
                        

                        if (this.riddleName === "ki2") {
                            const pdfContainer = document.getElementById('DialogBox')
                            pdfContainer.innerHTML = ''
                            
                            pdfContainer.style.zIndex = 40
                            pdfContainer.style.gridRow = "3"
                            pdfContainer.style.justifyContent = "center"

                            const text = document.createElement("div")
                            text.innerHTML = "Urkunde Generator"
                            text.style.display = "flex"
                            text.style.justifyContent = "center"
                            text.style.alignItems = "center"
                            text.style.fontSize = "1.5vw"

                            pdfContainer.appendChild(text)

                            
                            const form = document.createElement('form')
                            form.id = 'certificateForm'

                            const nameLabel = document.createElement('label')
                            nameLabel.htmlFor = 'playerName'
                            nameLabel.textContent = 'Dein Name'
                            form.appendChild(nameLabel)

                            const nameInput = document.createElement('input')
                            nameInput.type = 'text'
                            nameInput.id = 'playerName'
                            nameInput.required = true 
                            form.appendChild(nameInput)

                            const submitButton = document.createElement('button')
                            submitButton.type = 'submit'
                            submitButton.style.height = '60%'
                            submitButton.textContent = 'Urkunde erstellen'
                            

                            

                            pdfContainer.appendChild(form)

                            pdfContainer.appendChild(submitButton)

                            // Formular-Referenz holen

                            // Gemeinsame Funktion für die PDF-Erstellung
                            async function generateCertificate(event) {
                                event.preventDefault(); // Verhindert das Neuladen der Seite

                                const nameInput = document.getElementById('playerName');
                                const playerName = nameInput.value.trim();

                                if (!playerName) {
                                    alert("Bitte gib deinen Namen ein.");
                                    return;
                                }

                                const url = './PDF/Urkunde.pdf';
                                const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

                                const pdfDoc = await PDFDocument.load(existingPdfBytes);
                                const pages = pdfDoc.getPages();
                                const firstPage = pages[0];

                                const { width, height } = firstPage.getSize();

                                firstPage.drawText(playerName, {
                                    x: 350, 
                                    y: height - 200, 
                                    size: 36,
                                    color: rgb(0.8627, 0.5373, 0.1216),
                                });

                                firstPage.drawText(`${insgesamteMessZeit} Sekunden`, {
                                    x: 350,
                                    y: height - 245,
                                    size: 36, 
                                    color: rgb(0.8627, 0.5373, 0.1216),
                                });

                                const currentDate = new Date();
                                const formattedDate = currentDate.toLocaleDateString('de-DE', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                });

                                firstPage.drawText(` ${formattedDate}`, {
                                    x: 230,
                                    y: height - 520,
                                    size: 20,
                                    color: rgb(0.8627, 0.5373, 0.1216),
                                });

                                firstPage.drawText(`${insgesamteMessZeit}`,{
                                            x: 500,
                                            y: height - 300,
                                            size: 36, 
                                            color: rgb (0.8627, 0.5373, 0.1216),
                                        })

                                const pdfBytes = await pdfDoc.save();

                                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                                const link = document.createElement('a');
                                link.href = URL.createObjectURL(blob);
                                link.download = `Urkunde-${playerName}.pdf`;
                                link.click();
                            }

                            // `submit`-Event für Enter und reguläre Formulareinsendung
                            form.addEventListener('submit', generateCertificate);

                            // `click`-Event für den Button
                            submitButton.addEventListener('click', (event) => {
                                generateCertificate(event);
                            });


                            const imgEnde = document.createElement('img');
                            imgEnde.src = './img/FeierEule.png';
                            imgEnde.style.maxWidth = '100%'; // Begrenzen Sie die Breite des Bildes
                            imgEnde.style.height = 'auto';
                            gsap.to('#overlappingDiv', {
                                opacity: 1,
                                onComplete: () => {
    
                                    guide.appendChild(imgEnde);
                                    pdfContainer.style.display = "grid"
                                    
                                
                                    gsap.to('#overlappingDiv', { opacity: 0 });
                                }
                            });
                            
                        }
                        else {

                            const imgElement = document.createElement('img');
                            imgElement.src = rewardImage.src;
                            imgElement.style.maxWidth = '100%'; // Begrenzen Sie die Breite des Bildes
                            imgElement.style.height = 'auto';
                            imgElement.style.position = 'absolute'
                            imgElement.style.bottom = '25%'

                            gsap.to('#overlappingDiv', {
                                opacity: 1,
                                onComplete: () => {
    
                                    guide.appendChild(imgElement);
                                    //answerButton.addEventListener('click', handleClick.bind(this))
                                    this.reward = true
                                    
                                    
                                
                                    gsap.to('#overlappingDiv', { opacity: 0 });
                                }
                            });

                        }
                        

                        
                        //guide.appendChild(startButton);

                        
                        this.targetLevel = this.config[this.currentRiddle]?.targetLevel
                        
                        
                          
                           
                            
                            rewardButton.addEventListener('click', () => {

                                if(!this.isClicked) {
                                    this.isClicked = true

                                    audio.ButtonKlick.play()

                                    guide.style.display = 'none'

                                    
                                    console.log('Rätsel abgeschlossen, Transition zurück in den Raum.');
                                
                                    levelManager.shouldAdjustBackground = true
                                    console.log(this.config[this.currentRiddle].targetLevel)
                                    //targetLevel = this.config[this.currentRiddle]?.targetLevel
                                    
                                    this.transition({
                                        nextAnimation: () => {
                                            levelManager.startLevel(this.targetLevel, levelManager.player);
                                        }, // Raum-Animation
                                        onComplete: () => {
                                            //audio.Map.play()
                                            this.isClicked = false 
                                            console.log('Spieler zurück im Raum.');
                                        },
                                    });
                                }

                            })

                        

                        

                        
                        
                        

                    
                    

                    
                }
                
            } else {
                document.querySelector('#Content').style.display = "block"
                document.querySelector('#DialogBox').style.display = "none"
                audio.Rätsel.play()
                console.log('Rätsel nicht abgeschlossen.');
                document
                umsortierenButtons()
                startTimer() 
            }
        });

        

        // Zurück-Button
        document.getElementById('Zurück').addEventListener('click', () => {
            const zurückButton = document.getElementById('Zurück')
            //zurückButton.disabled = true 
            
            if (!this.isClicked) {
                this.isClicked = true
                console.log("button aus ")
                levelManager.shouldAdjustBackground = true
                resetTimer()
                audio.ButtonKlick.play()
                console.log('Zurück gedrückt, Transition zurück.');
                audio.Rätsel.stop()
                const targetLevel = this.config[this.currentRiddle]?.targetLevel
                this.transition({
                    nextAnimation: () => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        levelManager.startLevel(targetLevel, levelManager.player);
                        //console.log(levelManager.shouldAdjustBackground)
                        
                        
                    }, // Raum-Animation
                    onComplete: () => {
                        console.log('Spieler hat das Rätsel abgebrochen.');
                        //audio.Map.play()
                    },
                });
                 
            }
        });

        // Antwort-Buttons
        document.querySelectorAll('.AnswersButton').forEach((button, index) => {
            button.addEventListener('click', () => {
                // console.log(`Button ${index} geklickt:`, {
                //     innerHTML: button.innerHTML,  // Der sichtbare Inhalt
                //     textContent: button.textContent, // Alternative für Text
                //     dataIndex: button.getAttribute('data-index'), // Der zugewiesene Index
                // });
            
                this.handleAnswer(index);
            });
        });
    }

    // Starte ein Rätsel
    startRiddle(riddleName) {
            this.isClicked = false 
            resetTimer()

            document.querySelectorAll('.AnswersButton').forEach((button, index) => {
                button.textContent = "";  // Lösche den Text
                button.setAttribute('data-index', index);  // Setze den ursprünglichen Index zurück
            });
    

            levelManager.shouldAdjustBackground = false 

           // Deaktiviere alle Hinweis-Buttons beim Start des Rätsels
            document.querySelectorAll("[id^='Hinweis']").forEach((button) => {
                button.disabled = true;
                button.style.backgroundColor = ''; // Setzt das Styling zurück
                button.style.cursor = "not-allowed"; // Falls der Cursor geändert wurde
            });


            riddle = true 

            
        
        
            audio.Tuer.play()
            this.transition({


                nextAnimation: () => {

                    document.querySelector('#Interface').style.display = 'block'
                    document.querySelector('#movingInterface').style.display = 'none'
                    document.querySelector('#Content').style.display = 'block'
                    document.querySelector('#GuideBox').style.display = 'none'
                    // document.querySelector('#DialogButton').style.display = 'none'

                    audio.Rätsel.play();
                    startTimer();
                    
                    this.resetRiddle();
                    
                    console.log(this.hintsPlayed)
                    
                    
            

                    
                    // if(Handy) {
                    //     document.querySelector("#movingInterface").style.display = "none"
                    // }

                    if(!this.config[riddleName]) {
                        console.error(`Rätsel "${riddleName}" exisiert nicht in der Konfirguration.`)
                    }
                    if(riddleName === "ki" || riddleName === "ki2" ) {
                        console.log("KI")
                        const ZurückButton = document.getElementById("Zurück")
                        ZurückButton.disabled = true 
                        ZurückButton.innerHTML = ''

                    } 
                    this.currentRiddle = riddleName;
                    const { answers } = this.config[riddleName];
                    const answersContainer = document.getElementById('Answers');
                    answersContainer.innerHTML = "";

                    this.soundPlayed = false 
                    // Antwort-Buttons aktualisieren
                    answers.forEach((answer, index) => {
                        const button = document.createElement("button");
                        button.classList.add("AnswersButton");
                        button.textContent = answer;  // **Richtigen Text setzen**
                        button.innerHTML = answer;  // Falls HTML verwendet wird
                        button.backgroundColor = "#c6b9a6"
                        button.setAttribute("data-index", index); // Original-Index beibehalten
                        button.addEventListener("click", () => {
                            console.log(`Geklickt: ${button.textContent} (data-index: ${button.getAttribute("data-index")})`);
                            this.handleAnswer(index);
                        });
                        answersContainer.appendChild(button);
                    });
                    

                    // Hinweise und Status zurücksetzen
                    this.hintsPlayed = new Array(this.config[riddleName].hints.length).fill(true);
                    this.soundPlayed = new Array(this.config[riddleName].hints.length).fill(false);
                    this.isCompleted = false;

                    const interfaceElement = document.querySelector('#Interface');
                    interfaceElement.style.display = 'block';
                    interfaceElement.style.width = `${canvas.width}px`;
                    interfaceElement.style.height = `${canvas.height * 0.3}px`; // 30% der Canvas-Höhe
                    
                    document.querySelector('#IDtimer').style.display = 'flex'

                    
                
                    
                    umsortierenButtons()
                    this.animateRiddle(riddleName)
                },
            
            });
    }

    // Zeichne den Hintergrund
    drawBackground(ctx) {
        if (!this.currentRiddle || !this.config[this.currentRiddle]) {
            console.error('Kein aktives Rätsel oder fehlende Konfiguration.');
            return;
        }

       
        if(this.isCompleted) {
            const { solutionImage } = this.config[this.currentRiddle];
            const BackgroundWidth = canvas.width;
            const BackgroundHeight = canvas.height;
            const fixedX = canvas.width * 0.5 - BackgroundWidth / 2;
            const fixedY = canvas.height * -0.08;
            //console.log(`Zeichne Rätsel an Position (${fixedX}, ${fixedY}).`);
            ctx.drawImage(solutionImage, fixedX, fixedY, BackgroundWidth, BackgroundHeight);
            

        } else {
            const { backgroundImage } = this.config[this.currentRiddle];
            const BackgroundWidth = canvas.width;
            const BackgroundHeight = canvas.height;
            const fixedX = canvas.width * 0.5 - BackgroundWidth / 2;
            const fixedY = canvas.height * -0.08;
            ctx.drawImage(backgroundImage, fixedX, fixedY, BackgroundWidth, BackgroundHeight);

        }

        
        
        
    }

    // Zeichne Hinweise
    drawHint(ctx, hintIndex) {
        const { hints } = this.config[this.currentRiddle];
        const hintImage = hints[hintIndex];

        if (!hintImage) {
            console.error(`Hinweis-Bild für Index ${hintIndex} nicht gefunden.`);
            return;
        }

        if (!hintImage.complete || hintImage.naturalWidth === 0) {
            console.error(`Hinweis-Bild für Index ${hintIndex} wurde noch nicht geladen.`);
            return;
        }

        const width = canvas.width;
        const height = canvas.height;
        const fixedX = canvas.width * 0.5 - width / 2;
        const fixedY = canvas.height * -0.08;
        //console.log(`Zeichne Hinweis ${hintIndex} an Position (${fixedX}, ${fixedY}).`);
        ctx.drawImage(hintImage, fixedX, fixedY, width, height);
    }

    // Verarbeite Antworten
    handleAnswer(answerIndex) {

        const { correctAnswer } = this.config[this.currentRiddle];
        const answerButtons = Array.from(document.querySelectorAll('.AnswersButton'));
        
        // Finde den Button basierend auf dem ursprünglichen Index
        const selectedButton = answerButtons.find(
            (button) => parseInt(button.getAttribute('data-index')) === answerIndex
        );

        console.log("Selected Button:", {
            index: answerIndex,
            buttonText: selectedButton?.textContent,
            dataIndex: selectedButton?.getAttribute('data-index')
        });
        
        const selectedAnswerText = selectedButton?.textContent

        console.log(correctAnswer)
        console.log(selectedAnswerText)

        // console.log(correctAnswer)
        // console.log(selectedAnswerText)
        
        audio.Rätsel.stop()
        document.querySelector('#DialogBox').style.display = "grid"
        document.querySelector('#Content').style.display = "none"

        if (selectedAnswerText === correctAnswer) {

            audio.ButtonKlick.play()

            
            

                document.querySelector('#Interface').style.display = "none"

                const { explanationImage } = this.config[this.riddleName]

                const guide = document.getElementById('guide'); // Der Anleitung-Ordner
                const canvas = document.getElementById('gameCanvas'); // Das Canvas
                guide.style.display = 'grid'; // Anleitung sichtbar machen
                guide.style.gridTemplateRows = '2'
                guide.style.justifyContent ='center'
                guide.scrollTop = 0
            

                // Setzen Sie die Größe des Ordners passend zum Canvas
                guide.style.width = `${canvas.width}px`;
                guide.style.height = `${canvas.height}px`;
                guide.style.overflowY = 'auto'
                guide.style.backgroundColor = 'grey'
                

                // Bereinigen Sie den Inhalt des Ordners
                guide.innerHTML = '';

                const imgSudoku = document.createElement('img')
                imgSudoku.src = explanationImage.src
                imgSudoku.style.maxWidth = '100%'
                imgSudoku.style.height = 'auto'
                


            
                //Button "Weiter" hinzufügen
                const startButton = document.createElement('button');
                startButton.textContent = 'Weiter';
                startButton.style.textAlign = '1vw'
                startButton.style.cursor = 'pointer';
                startButton.style.width  = '100%';
                startButton.style.height = '200%'
                startButton.style.border =  "black, solid 0.3vw";
                startButton.style.backgroundColor =  "ligthgrey";

                const scrollHint = document.createElement('div');
                scrollHint.innerHTML = '⬇ Nach unten scrollen ⬇';
                scrollHint.style.position = 'absolute';
                scrollHint.style.bottom = '20px';
                scrollHint.style.left = '50%';
                scrollHint.style.transform = 'translateX(-50%)';
                scrollHint.style.fontSize = '1.2em';
                scrollHint.style.color = 'white';
                scrollHint.style.padding = '10px 20px';
                scrollHint.style.borderRadius = '10px';
                scrollHint.style.backgroundColor = 'red';
                scrollHint.style.fontFamily = 'Arial, sans-serif';
                scrollHint.style.textAlign = 'center';
                scrollHint.style.opacity = '0.8';
                scrollHint.style.animation = 'bounce 2s infinite ease-in-out';

                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    onComplete: () => {
        
                        guide.appendChild(scrollHint);
                        guide.appendChild(imgSudoku);
                        guide.appendChild(startButton)

                        
                        
        
        
                        
                        
                        gsap.to('#overlappingDiv', { opacity: 0 });
                    }
                }); 
                

                
                guide.addEventListener('scroll', () => {
                    if (guide.scrollTop > 20) {
                        scrollHint.style.opacity = '0';
                    } else {
                        scrollHint.style.opacity = '0.8';
                    }
                });

                let isClicked = false 

                startButton.addEventListener('click', () => {
                    if(!isClicked) {
                        isClicked = true
                        audio.ButtonKlick.play()
                    
                
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            onComplete: () => {
                
                                
                                guide.innerHTML = ''
                                guide.style.display = 'none'
                                document.querySelector('#Interface').style.display = "block"
                                audio.richtigeAntwort.play()
                
                
                
                                
                                
                                gsap.to('#overlappingDiv', { opacity: 0 });
                            }
                        }); 
                    }
                    
            
                
                });
                
                
                console.log('Richtige Antwort ausgewählt.');
                this.isCompleted = true;
                this.completedRiddles.add(this.currentRiddle); // Rätsel als abgeschlossen speichern
                if (this.currentRiddle == "ki") {
                     document.querySelector('#DialogText').innerHTML = 'Super, du hast den ersten Teil geschafft.<br> Jetzt fehlt nur noch ein kleines bisschen.'
                }
                else if(this.currentRiddle == "ki2"){
                     document.querySelector('#DialogText').innerHTML = 'Klasse! Du hast alle Rätsel richtig gelöst! <br> Generiere dir nun deine Urkunde!'
                }
                else {
                    document.querySelector('#DialogText').innerHTML = 'Du hast das Rätsel gelöst!<br> Ein neuer Raum wurde freigeschaltet';

                }
                
                
            

        } else {
            console.log('Falsche Antwort.');
            document.querySelector('#DialogText').textContent = 'Falsch, bitte versuche es nochmal!';
            audio.falscheAntwort.play();
        }
        stopTimer();
    }

    // Rätsel-Animation starten
    animateRiddle() {
        
        const animate = () => {

            
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            console.log(insgesamteMessZeit)

            // Hintergrund und Rätselbild zeichnen
            this.drawBackground(ctx);
            
            //Hinweise zeichnene
            this.hintsPlayed.forEach((played, index) => {
                if (!played) {
                    this.drawHint(ctx, index);
                }
            });

            // Hinweise aktivieren
            if(this.isCompleted) {

            }
            const { hintTimes } = this.config[this.currentRiddle];

            
            hintTimes.forEach((time, index) => {
                
                if (insgesamteZeit === time && this.hintsPlayed[index]) {
                    
                    
                    document.querySelector(`#Hinweis${index + 1}`).disabled = false;
                    document.querySelector(`#Hinweis${index + 1}`).style.cursor = "pointer";
                    document.querySelector(`#Hinweis${index + 1}`).style.backgroundColor ='#c6b9a6'
                    
                    if (!this.soundPlayed[index]) {
                        audio.HinweiseErscheinen.play();
                        this.soundPlayed[index] = true; // Markiere den Sound als abgespielt
                        
                    }
                    

                    //this.hintsPlayed[index] = false;
                    
                }
            });

            if ((!this.isCompleted && !levelManager.shouldAdjustBackground)) {
                 const animationID = requestAnimationFrame(animate);
                 
            }
            

            
            else{
                cancelAnimationFrame(this.animateRiddle)
            }
            

            
        };

        animate();

        
    }

    animateEnd() {
        const animateSolution = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            

            // Hintergrund und Rätselbild zeichnen
            this.drawBackground(ctx);

            this.animateSolutionID = requestAnimationFrame(animateSolution)

            console.log(this.animateSolutionID)

        }

        animateSolution()
    }

    
    pauseRiddle() {
        // Animation stoppen
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
            console.log("Rätsel-Animation pausiert.");
        }

        if(this.animateSolutionID) {
            cancelAnimationFrame(this.animateSolutionID)
            this.animateSolutionID = null

        }
    
        // Timer stoppen
        stopTimer(); // Implementiert vermutlich die Timer-Logik

        
    }

    resumeRiddle(){
        if (!this.animationId && !this.isCompleted) {
            console.log("Rätsel wird fortgesetzt");
            this.animateRiddle(this.config[this.currentRiddle]);
            startTimer()
            
        } 

        if(this.isCompleted) {
            console.log("Ende")
            this.animateEnd()
            
        }
        
    }
   

    // Transition verwalten
    transition({ nextAnimation, onComplete }) {
        
        gsap.to('#overlappingDiv', {
            opacity: 1,
            repeat: 3,
            yoyo: true,
            duration: 0.4,
            onComplete: () => {
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    duration: 0.4,
                    onComplete: () => {
                        if (typeof nextAnimation === 'function') nextAnimation();
                        gsap.to('#overlappingDiv', {
                            opacity: 0,
                            duration: 0.4,
                            onComplete: () => {
                                if (typeof onComplete === 'function') onComplete();
                            },
                        });
                    },
                });
            },
        });
    }
        

    // Reset des Rätsels
    resetRiddle() {
        this.currentRiddle = null;
        this.hintsPlayed = [];
        this.isCompleted = false;
        
        
    }

    getIsCompleted() {
        return this.isCompleted;
    }

    showGuide(riddleName) {

    document.querySelector('#Interface').style.display = 'none';
    document.querySelector('#Content').style.display = 'none';
    document.querySelector('#DialogBox').style.display = 'none';

    console.log(riddleName)
    
    this.riddleName = riddleName

    
        
    const { guideImage } = this.config[riddleName];
    const { explanationImage } = this.config[riddleName]

    if (!guideImage) {
        console.error('Keine Anleitung gefunden.');
        this.startRiddle(riddleName); // Starte das Rätsel direkt, falls keine Anleitung vorhanden ist
        return;
    }

    const guide = document.getElementById('guide'); // Der Anleitung-Ordner
    const canvas = document.getElementById('gameCanvas'); // Das Canvas
    guide.style.display = 'grid'; // Anleitung sichtbar machen
    guide.style.gridTemplateRows = '2'
    guide.style.justifyContent ='center'
    guide.scrollTop = 0
   

    // Setzen Sie die Größe des Ordners passend zum Canvas
    guide.style.width = `${canvas.width}px`;
    guide.style.height = `${canvas.height}px`;
    guide.style.overflowY = 'auto'
    guide.style.backgroundColor = 'grey'
    

    // Bereinigen Sie den Inhalt des Ordners
    guide.innerHTML = '';

    
   
    
    // Fügen Sie das Bild für die Anleitung hinzu
    const imgElement = document.createElement('img');
    imgElement.src = guideImage.src;
    imgElement.style.maxWidth = '100%'; // Begrenzen Sie die Breite des Bildes
    imgElement.style.height = 'auto';

    const imgSudoku = document.createElement('img')
    imgSudoku.src = explanationImage.src
    imgSudoku.style.maxWidth = '100%'
    imgSudoku.style.height = 'auto'


    //Button "Weiter" hinzufügen
    const startButton = document.createElement('button');
    startButton.textContent = 'Weiter';
    startButton.style.cursor = 'pointer';
    startButton.style.width  = '100%';
    startButton.style.height = '200%'
    startButton.style.border =  "black, solid 0.3vw";


    const schließenButton = document.createElement('button')
    schließenButton.textContent = 'Schließen'
    schließenButton.style.cursor = 'pointer'
    schließenButton.style.width = '100%'
    schließenButton.style.height = '200%'
    schließenButton.style.border =  "black, solid 0.3vw";
    schließenButton.style.backgroundColor =  "lightgrey";

    const scrollHint = document.createElement('div');
    scrollHint.innerHTML = '⬇ Nach unten scrollen ⬇';
    scrollHint.style.position = 'absolute';
    scrollHint.style.bottom = '20px';
    scrollHint.style.left = '50%';
    scrollHint.style.transform = 'translateX(-50%)';
    scrollHint.style.fontSize = '1.2em';
    scrollHint.style.color = 'white';
    scrollHint.style.padding = '10px 20px';
    scrollHint.style.borderRadius = '10px';
    scrollHint.style.backgroundColor = 'red';
    scrollHint.style.fontFamily = 'Arial, sans-serif';
    scrollHint.style.textAlign = 'center';
    scrollHint.style.opacity = '0.8';
    scrollHint.style.animation = 'bounce 2s infinite ease-in-out';

    

    // guide.appendChild(schließenButton)

    // guide.appendChild(scrollHint);

    guide.addEventListener('scroll', () => {
        if (guide.scrollTop > 20) {
            scrollHint.style.opacity = '0';
        } else {
            scrollHint.style.opacity = '0.8';
        }
    });
    let isClicked = false 

    if(riddleName == "roboter") {

        const { InformatikerinImage } = this.config[riddleName]
        const imgInformatikerin = document.createElement('img')
        imgInformatikerin.src = InformatikerinImage.src
        imgInformatikerin.style.maxWidth = '100%'
        imgInformatikerin.style.height = 'auto'

        guide.appendChild(imgInformatikerin)
        guide.appendChild(startButton);
        guide.appendChild(scrollHint);

        startButton.addEventListener('click', () => {
            gsap.to('#overlappingDiv', {
                opacity: 1,
                onComplete: () => {
                    
                    guide.innerHTML = '';

                    guide.appendChild(imgElement);
                    guide.scrollTop = 0
                    guide.appendChild(scrollHint)
                    guide.appendChild(schließenButton)
                    
                    
                    
                  
                    gsap.to('#overlappingDiv', { opacity: 0 });
                }
            });
            
            
        })

    }

    else {

        guide.appendChild(imgElement);
        guide.appendChild(scrollHint)
        guide.appendChild(schließenButton)
        
        

    }

    schließenButton.addEventListener('click', () => {
        if(!isClicked) {
            isClicked = true 
            audio.ButtonKlick.play()
            guide.innerHTML = ''
            guide.style.display = 'none'
            this.startRiddle(riddleName);
        }
       
    }); 

    
        

    
    // });

    //gsap.to('#overlappingDiv', { opacity: 0 });

    

    // schließenButton.addEventListener('click', () => {
    //     audio.ButtonKlick.play()
    //     guide.innerHTML = ''
    //     guide.style.display = 'none'
    //     this.startRiddle('sudoku');

        
    // })

   
    

        
    }

    showChat(riddleName){

        
        document.querySelector('#Content').style.display = 'none';
        document.querySelector('#DialogBox').style.display = 'none';
        document.querySelector('#Interface').style.display = 'block';
        document.querySelector('#GuideBox').style.display = 'grid';
        
        

        console.log(riddleName)
        
        this.riddleName = riddleName

        
            
        const { Chat1Image } = this.config[riddleName];
        const { Chat2Image } = this.config[riddleName];
        const { Chat3Image } = this.config[riddleName];
        const { Chat4Image } = this.config[riddleName];
        const { Chat5Image } = this.config[riddleName];
        

        const guide = document.getElementById('guide'); // Der Anleitung-Ordner
        const answer = document.getElementById('Interface')
        const answerText = document.getElementById('GuideText')
        const answerButton = document.getElementById('Weiter')
        const canvas = document.getElementById('gameCanvas'); // Das Canvas

        guide.style.display = 'grid'; // Anleitung sichtbar machen
        guide.style.gridTemplateRows = '2'
        guide.style.justifyContent ='center'
        guide.scrollTop = 0
        guide.style.zIndex = 20
        

    

        // Setzen Sie die Größe des Ordners passend zum Canvas
        guide.style.width = `${canvas.width}px`;
        guide.style.height = `${canvas.height}px`
        guide.style.overflowY = 'auto'
        guide.style.backgroundColor = 'grey'
        

        // Bereinigen Sie den Inhalt des Ordners
        guide.innerHTML = '';

        answer.style.zIndex = 40

        answerText.innerHTML = 'Endlich habe ich es geschafft.<br> Aber wo ist denn jetzt meine Urkunde?'

        const imgChat1 = document.createElement('img');
        imgChat1.src = Chat1Image.src;
        imgChat1.style.maxWidth = '100%'; // Begrenzen Sie die Breite des Bildes
        imgChat1.style.height = 'auto';
        imgChat1.style.position = 'absolute'
        imgChat1.style.bottom = '7%'
        
        const imgChat2 = document.createElement('img');
        imgChat2.src = Chat2Image.src;
        imgChat2.style.maxWidth = '100%'; // Begrenzen Sie die Breite des Bildes
        imgChat2.style.height = 'auto';
        imgChat2.style.position = 'absolute'
        imgChat2.style.bottom = '7%'

        const imgChat3 = document.createElement('img');
        imgChat3.src = Chat3Image.src;
        imgChat3.style.maxWidth = '100%'; // Begrenzen Sie die Breite des Bildes
        imgChat3.style.height = 'auto';
        imgChat3.style.position = 'absolute'
        imgChat3.style.bottom = '7%'

        const imgChat4 = document.createElement('img');
        imgChat4.src = Chat4Image.src;
        imgChat4.style.maxWidth = '100%'; // Begrenzen Sie die Breite des Bildes
        imgChat4.style.height = 'auto';
        imgChat4.style.position = 'absolute'
        imgChat4.style.bottom = '7%'

        // const imgChat5 = document.createElement('img');
        // imgChat5.src = Chat5Image.src;
        // imgChat5.style.maxWidth = '100%'; // Begrenzen Sie die Breite des Bildes
        // imgChat5.style.height = 'auto';

        let Chat1 = true
        let Chat2 = false 
        let Chat3 = false
        let Chat4 = false
        //let Chat5 = false 
        

        guide.append(imgChat1)

        

        answerButton.addEventListener('click', () => {
            audio.ButtonKlick.play()
            gsap.to('#overlappingDiv', {
                opacity: 1,
                onComplete: () => {
                    if(Chat1) {
                        answerText.innerHTML = 'Das könnte ich doch machen.<br>  Aber wie soll das funktionieren?'
                        guide.removeChild(imgChat1)
                        guide.appendChild(imgChat2)
                        Chat1 = false 
                        Chat2 = true 
                    } else if (Chat2) {
                        answerText.innerHTML = 'Und dieser jemand bin ich?<br> Ich weis doch gar nicht, wie das funktioniert.'
                        guide.removeChild(imgChat2)
                        guide.appendChild(imgChat3)
                        Chat2 = false 
                        Chat3 = true 
                    } else if (Chat3) {
                        answerText.innerHTML = 'Na gut, dann versuche ich es mal'
                        guide.removeChild(imgChat3)
                        guide.appendChild(imgChat4) 
                        Chat3 = false
                        Chat4 = true   
                    } else if (Chat4) {
                        //answerText.innerHTML = ''
                        guide.removeChild(imgChat4)
                        //guide.appendChild(imgChat5)
                        Chat4 = false
                        this.showGuide(riddleName)
                    }
                        //Chat5 = true  
                    // } else if(Chat5) {
                    //     this.showGuide(riddleName)
                    // }
                    
                  
                    gsap.to('#overlappingDiv', { opacity: 0 });
                }
            });

        })
       

        



    }
}



// Initialisiere den RiddleManager
export const riddleManager = new RiddleManager(riddleConfig);

// Initialisiere Eventlistener
riddleManager.initializeEventListeners();


