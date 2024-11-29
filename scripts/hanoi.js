
const towers = document.querySelectorAll('.tower');
const resetButton = document.getElementById('reset');
const movesDisplay = document.getElementById('moves');
const messageDisplay = document.getElementById('message'); // Elemento para exibir mensagens

let moves = 0;
let selectedDisk = null;

// Inicializa o jogo
function setupGame() {
    moves = 0;
    updateMoves();
    clearMessage();
    towers.forEach(tower => (tower.innerHTML = ''));

    
    const disks = 5;
    for (let i = disks; i > 0; i--) {
        const disk = createDisk(i);
        towers[0].appendChild(disk);
    }
}


function createDisk(size) {
    const disk = document.createElement('div');
    disk.classList.add('disk');
    disk.style.width = `${20 * size + 20}px`;
    disk.style.backgroundColor = `hsl(${size * 50}, 70%, 50%)`;
    disk.dataset.size = size;
    disk.innerText = size
    return disk;
}


function updateMoves() {
    movesDisplay.textContent = `Movimentos: ${moves}`;
}


function showMessage(message) {
    messageDisplay.textContent = message;

    
    setTimeout(() => {
        clearMessage();
    }, 3000);
}


function clearMessage() {
    messageDisplay.textContent = '';
}


function handleTowerClick(tower) {
    const topDisk = tower.lastElementChild;

    if (selectedDisk) {
    
        if (selectedDisk === topDisk) {
            selectedDisk.classList.remove('selected');
            selectedDisk = null;
            return; 
        }

       
        if (!topDisk || selectedDisk.dataset.size < topDisk.dataset.size) {
            tower.appendChild(selectedDisk);
            selectedDisk.classList.remove('selected');
            selectedDisk = null;
            moves++;
            updateMoves();
        } else {
            showMessage('Movimento inválido! Você não pode colocar um disco maior sobre um menor.');
        }
    } else if (topDisk) {
        
        selectedDisk = topDisk;
        selectedDisk.classList.add('selected');
    }
}


towers.forEach(tower => {
    tower.addEventListener('click', () => handleTowerClick(tower));
});


resetButton.addEventListener('click', setupGame);

// Elementos do modal
const winModal = document.getElementById('winModal');
const closeModalButton = document.getElementById('closeModal');
const finalMovesDisplay = document.getElementById('finalMoves');

// Função para verificar se o jogador venceu
function checkWin() {
    if (towers[2].childElementCount === 5) { // Verifica se todos os discos estão na última torre
        showWinModal();
    }
}

// Exibe o modal de vitória
function showWinModal() {
    finalMovesDisplay.textContent = `Movimentos: ${moves}`;
    winModal.classList.remove('hidden');
}

// Fecha o modal de vitória
closeModalButton.addEventListener('click', () => {
    winModal.classList.add('hidden');
    setupGame(); // Reinicia o jogo
});

// Atualize a função handleTowerClick para incluir a verificação de vitória
function handleTowerClick(tower) {
    const topDisk = tower.lastElementChild;

    if (selectedDisk) {
        if (selectedDisk === topDisk) {
            selectedDisk.classList.remove('selected');
            selectedDisk = null;
            return; 
        }

        if (!topDisk || selectedDisk.dataset.size < topDisk.dataset.size) {
            tower.appendChild(selectedDisk);
            selectedDisk.classList.remove('selected');
            selectedDisk = null;
            moves++;
            updateMoves();
            checkWin(); // Verifica vitória após cada movimento válido
        } else {
            showMessage('Movimento inválido! Você não pode colocar um disco maior sobre um menor.');
        }
    } else if (topDisk) {
        selectedDisk = topDisk;
        selectedDisk.classList.add('selected');
    }
}


setupGame();