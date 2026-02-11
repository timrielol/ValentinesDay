const container = document.getElementById('puzzle-container');
let tiles = [...Array(9).keys()]; // Erstellt [0, 1, 2, ..., 8]

function createPuzzle() {
    container.innerHTML = "";
    tiles.forEach((tile, index) => {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');
        
        if (tile === 8) {
            tileDiv.classList.add('empty');
        } else {
            // Berechne Hintergrundposition für das Bild
            const row = Math.floor(tile / 3);
            const col = tile % 3;
            tileDiv.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
        }
        
        tileDiv.addEventListener('click', () => swapTiles(index));
        container.appendChild(tileDiv);
    });
}

function swapTiles(index) {
    const emptyIndex = tiles.indexOf(8);
    const validMoves = [index - 1, index + 1, index - 3, index + 3];

    // Prüfen, ob das leere Feld benachbart ist
    if (validMoves.includes(emptyIndex)) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        createPuzzle();
        checkWin();
    }
}

function shuffleTiles() {
    tiles.sort(() => Math.random() - 0.5);
    createPuzzle();
}

function checkWin() {
    if (tiles.every((tile, i) => tile === i)) {
        setTimeout(() => {
            const winMessage = document.getElementById('win-message');
            winMessage.style.display = 'flex'; // Nachricht anzeigen
            
            // NEU: Konfetti schießen lassen!
            shootConfetti(); 

        }, 500);
    }
}


function shootConfetti() {
    // Hier kannst du die Konfetti-Eigenschaften anpassen
    // zum Beispiel Farben (rot, pink, weiß für Liebe)
    confetti({
        particleCount: 150, // Anzahl der Konfettiteile
        spread: 90,        // Streuung (Winkel)
        origin: { y: 0.6 }, // Wo es startet (mittig, etwas über dem unteren Rand)
        colors: ['#ff4d6d', '#ffe5ec', '#ffffff'] // Deine Valentinstagsfarben
    });
}

function closeMessage() {
    const winMessage = document.getElementById('win-message');
    
    // Wir setzen das Display wieder auf 'none', damit es verschwindet
    winMessage.style.display = 'none';
    
    // Optional: Falls du die Klasse 'hidden' noch im HTML hast, 
    // sicherheitshalber auch wieder hinzufügen
    winMessage.classList.add('hidden'); 
    
    // Das Spiel neu mischen, damit man wieder von vorne anfangen kann
    shuffleTiles();
}
createPuzzle();