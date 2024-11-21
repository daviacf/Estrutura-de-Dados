// Seleção de elementos
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

    // Adiciona discos à primeira torre
    const disks = 5;
    for (let i = disks; i > 0; i--) {
        const disk = createDisk(i);
        towers[0].appendChild(disk);
    }
}

// Cria um disco com estilo baseado no tamanho
function createDisk(size) {
    const disk = document.createElement('div');
    disk.classList.add('disk');
    disk.style.width = `${20 * size + 40}px`;
    disk.style.backgroundColor = `hsl(${size * 50}, 70%, 50%)`;
    disk.dataset.size = size;
    return disk;
}

// Atualiza o contador de movimentos
function updateMoves() {
    movesDisplay.textContent = `Movimentos: ${moves}`;
}

// Exibe uma mensagem na tela
function showMessage(message) {
    messageDisplay.textContent = message;

    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        clearMessage();
    }, 3000);
}

// Limpa a mensagem da tela
function clearMessage() {
    messageDisplay.textContent = '';
}

// Lida com os cliques nas torres
function handleTowerClick(tower) {
    const topDisk = tower.lastElementChild;

    if (selectedDisk) {
        // Caso clique novamente no mesmo disco, desmarcar a seleção
        if (selectedDisk === topDisk) {
            selectedDisk.classList.remove('selected');
            selectedDisk = null;
            return; // Sai da função sem realizar nenhuma movimentação
        }

        // Verifica se o movimento é válido
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
        // Seleciona o disco se nenhum estiver selecionado
        selectedDisk = topDisk;
        selectedDisk.classList.add('selected');
    }
}

// Adiciona eventos às torres
towers.forEach(tower => {
    tower.addEventListener('click', () => handleTowerClick(tower));
});

// Reinicia o jogo
resetButton.addEventListener('click', setupGame);

// Inicia o jogo ao carregar a página
setupGame();