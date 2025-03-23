export const riddleConfig = { 
    roboter: {
                backgroundImage: (() => {
                    const img = new Image();
                    img.src = './img/Rätsel/Roboter/Leicht/Leicht.png';
                    return img;
                })(),
                solutionImage: (() => {
                    const img = new Image();
                    img.src = './img/Rätsel/Roboter/Leicht/Leicht Ende.png';
                    return img;
                })(),
                guideImage: (() => {
                    const img = new Image();
                    img.src = './img/Anleitung/Roboter/AnleitungRoboter.png';
                    return img;
                })(),
                explanationImage: (() => {
                    const img = new Image();
                    img.src = './img/Anleitung/Roboter/Erklärung.jpg';
                    return img;
                })(),
                rewardImage: (() => {
                    const img = new Image();
                    img.src = './img/Urkunde/Ukrunde Teil1.png';
                    return img;
                })(),
                InformatikerinImage: (() => {
                    const img = new Image();
                    img.src = './img/Anleitung/Roboter/Informatikerin.png';
                    return img;
                })(),
                answers: [
                    'A2',
                    'B5',
                    'D3',
                    'C1',
                ],
                correctAnswer: 'A2', // Richtige Antwort als Text
                hints: [
                    (() => {
                        const img = new Image();
                        img.src = './img/Rätsel/Roboter/Leicht/Leicht Hinweis 1.png';
                        return img;
                    })(),
                    (() => {
                        const img = new Image();
                        img.src = './img/Rätsel/Roboter/Leicht/Leicht Hinweis 2.png';
                        return img;
                    })(),
                    (() => {
                        const img = new Image();
                        img.src = './img/Rätsel/Roboter/Leicht/Leicht Lösung.png';
                        return img;
                    })(),
                ],
                hintTimes: [5, 10, 15], // Aktivierungszeitpunkte für Hinweise
                targetLevel: 'InformatikRaum',
        },

        scratch: {
            backgroundImage: (() => {
                const img = new Image();
                img.src = './img/Rätsel/Scratch/Leicht/Leicht.png';
                return img;
            })(),
            solutionImage: (() => {
                const img = new Image();
                img.src = './img/Rätsel/Scratch/Leicht/Leicht Ende.png';
                return img;
            })(),
            guideImage: (() => {
                const img = new Image();
                img.src = './img/Anleitung/Scratch/AnleitungScratch.png';
                return img;
            })(),
            explanationImage: (() => {
                const img = new Image();
                img.src = './img/Anleitung/Scratch/Erklärung.jpg';
                return img;
            })(),
            rewardImage: (() => {
                const img = new Image();
                img.src = './img/Urkunde/Ukrunde Teil2.png';
                return img;
            })(),
            answers: [
                'DBAC',
                'DEBA',
                'BCEA',
                'EABD',
            ],
            correctAnswer: 'DBAC', // Richtige Antwort als Text
            hints: [
                (() => {
                    const img = new Image();
                    img.src = './img/Rätsel/Scratch/Leicht/Leicht Hinweis 1.png';
                    return img;
                })(),
                (() => {
                    const img = new Image();
                    img.src = './img/Rätsel/Scratch/Leicht/Leicht Hinweis 2.png';
                    return img;
                })(),
                (() => {
                    const img = new Image();
                    img.src = './img/Rätsel/Scratch/Leicht/Leicht Lösung.png';
                    return img;
                })(),
            ],
            hintTimes: [5, 10, 15], // Aktivierungszeitpunkte für Hinweise
            targetLevel: 'EnglischRaum',
    },

    krypto: {
        backgroundImage: (() => {
            const img = new Image();
            img.src = './img/Rätsel/AlanTouring/Leicht/Hintergrund.png';
            return img;
        })(),
        solutionImage: (() => {
            const img = new Image();
            img.src = './img/Rätsel/AlanTouring/Leicht/Lösung.png';
            return img;
        })(),
        guideImage: (() => {
            const img = new Image();
            img.src = './img/Anleitung/AlanTouring/AnleitungKrypto.png';
            return img;
        })(),
        explanationImage: (() => {
            const img = new Image();
            img.src = './img/Anleitung/AlanTouring/Erklärung.png';
            return img;
        })(),
        rewardImage: (() => {
            const img = new Image();
            img.src = './img/Urkunde/Urkunde Teil 3.png';
            return img;
        })(),
        answers: [
            'BYIP',
            'BYGK',
            'XAGK',
            'XAIP',
        ],
        correctAnswer: 'BYGK', // Richtige Antwort als Text
        hints: [
            (() => {
                const img = new Image();
                img.src = './img/Rätsel/AlanTouring/Leicht/Hinweis1.png';
                return img;
            })(),
            (() => {
                const img = new Image();
                img.src = './img/Rätsel/AlanTouring/Leicht/Hinweis2.png';
                return img;
            })(),
            (() => {
                const img = new Image();
                img.src = './img/Rätsel/AlanTouring/Leicht/LösungHinweis.png';
                return img;
            })(),
        ],
        hintTimes: [5, 10, 15], // Aktivierungszeitpunkte für Hinweise
        targetLevel: 'GeschichtsRaum',
    },
    
    sudoku: {
        backgroundImage: (() => {
            const img = new Image();
            img.src = './img/Rätsel/Sudoku/Leicht/Hintergrund.png';
            return img;
        })(),
        solutionImage: (() => {
            const img = new Image();
            img.src = './img/Rätsel/Sudoku/Leicht/Lösung.png';
            return img;
        })(),
        guideImage: (() => {
            const img = new Image();
            img.src = './img/Anleitung/Sudoku/AnleitungSudoku.jpg';
            return img;
        })(),
        explanationImage: (() => {
            const img = new Image();
            img.src = './img/Anleitung/Sudoku/ErklärungSudoku.png';
            return img;
        })(),
        rewardImage: (() => {
            const img = new Image();
            img.src = './img/Urkunde/Urkunde Teil4.png';
            return img;
        })(),
        answers: [
            'x:1 | y:3 | z:4',
            'x:2 | y:4 | z:3',
            'x:1 | y:4 | z:3',
            'x:2 | y:4 | z:1',
        ],
        correctAnswer: 'x:1 | y:3 | z:4', // Richtige Antwort als Text
        hints: [
            (() => {
                const img = new Image();
                img.src = './img/Rätsel/Sudoku/Leicht/Hinweis1.png';
                return img;
            })(),
            (() => {
                const img = new Image();
                img.src = './img/Rätsel/Sudoku/Leicht/Hinweis2.png';
                return img;
            })(),
            (() => {
                const img = new Image();
                img.src = './img/Rätsel/Sudoku/Leicht/LösungHinweis.png';
                return img;
            })(),
        ],
        hintTimes: [5, 10, 15], // Aktivierungszeitpunkte für Hinweise
        targetLevel: 'MatheRaum',
    },

    ki: {
        Chat1Image: (() => {
            const img = new Image();
            img.src = './img/Chat/Chatbild0.png';
            return img;
        })(),
        Chat2Image: (() => {
            const img = new Image();
            img.src = './img/Chat/Chatbild1.png';
            return img;
        })(),
        Chat3Image: (() => {
            const img = new Image();
            img.src = './img/Chat/Chatbild2.png';
            return img;
        })(),
        Chat4Image: (() => {
            const img = new Image();
            img.src = './img/Chat/Chatbild3.png';
            return img;
        })(),
        // Chat5Image: (() => {
        //     const img = new Image();
        //     img.src = './img/Chat/Chatbild4.png';
        //     return img;
        // })(),
        backgroundImage: (() => {
            const img = new Image();
            img.src = './img/Rätsel/Ki/Teil 1.png';
            return img;
        })(),
        solutionImage: (() => {
            const img = new Image();
            img.src = './img/Rätsel/Ki/Teil 1 - Lösung.png';
            return img;
        })(),
        guideImage: (() => {
            const img = new Image();
            img.src = './img/Anleitung/KI/Hilfe KI Teil 1.jpeg';
            return img;
        })(),
        explanationImage: (() => {
            const img = new Image();
            img.src = './img/Anleitung/KI/Binär Informatik.png';
            return img;
        })(),
        answers: [
            'A',
            'B',
            'C',
            'D',
        ],
        correctAnswer: 'A', // Richtige Antwort als Text
        hints: [
            (() => {
                const img = new Image();
                img.src = './img/Rätsel/Ki/Teil 1 - Hinweis 1.png';
                return img;
            })(),
            (() => {
                const img = new Image();
                img.src = './img/Rätsel/Ki/Teil 1 - Hinweis 2.png';
                return img;
            })(),
            (() => {
                const img = new Image();
                img.src = './img/Rätsel/Ki/Teil 1 - Lösung.png';
                return img;
            })(),
        ],
        hintTimes: [5, 10, 15], // Aktivierungszeitpunkte für Hinweise
        targetRiddle: "Ki2"
    },

    ki2: {
        backgroundImage: (() => {
            const img = new Image();
            img.src = './img/Rätsel/Ki/Teil 2.png';
            return img;
        })(),
        solutionImage: (() => {
            const img = new Image();
            img.src = './img/Chat/Chatbild4.png';
            return img;
        })(),
        guideImage: (() => {
            const img = new Image();
            img.src = './img/Anleitung/KI/Hilfe KI Teil 2.jpeg';
            return img;
        })(),
        explanationImage: (() => {
            const img = new Image();
            img.src = './img/Anleitung/KI/KI Informatik.png';
            return img;
        })(),
        answers: [
            'Die zweite Stelle muss eine 1 sein',
            'Die Binärzahl muss 4 Stellen lang sein',
            'Die letzte Stelle muss eine 0 sein',
            'Die 3. Stelle muss ein 0 sein',
        ],
        correctAnswer: 'Die zweite Stelle muss eine 1 sein', // Richtige Antwort als Text
        hints: [
            (() => {
                const img = new Image();
                img.src = './img/Rätsel/Ki/Teil 2 - Hinweis 1.png';
                return img;
            })(),
            (() => {
                const img = new Image();
                img.src = './img/Rätsel/Ki/Teil 2 - Hinweis 2.png';
                return img;
            })(),
            (() => {
                const img = new Image();
                img.src = './img/Rätsel/Ki/Teil 2 - Lösung.png';
                return img;
            })(),
        ],
        hintTimes: [5, 10, 15], // Aktivierungszeitpunkte für Hinweise
        targetLevel: 'Aula',
},
    
        

    

}

