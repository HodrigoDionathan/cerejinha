const correctOrder = [1, 2, 3, 4, 5, 6, 2, 8];
let userOrder = [];
const lamp = document.getElementById('lampada');
const cerejinha = document.getElementById('cerejinha');
const message = document.getElementById('message');
const slots = document.querySelectorAll('.slot');
const cherryRainContainer = document.getElementById('cherryRainContainer');

// Adicionar evento de clique aos componentes
document.querySelectorAll('.component').forEach(component => {
  component.addEventListener('click', function() {
    const selectedComponentId = Number(this.getAttribute('data-id'));

    // Verifica se já foi selecionado um slot para troca
    const selectedSlot = document.querySelector('.slot.selected');

    if (selectedSlot) {
      // Troca o componente no slot selecionado
      selectedSlot.innerHTML = `<img src="${this.src}" class="component">`;
      userOrder[Number(selectedSlot.getAttribute('data-slot')) - 1] = selectedComponentId;
      selectedSlot.classList.remove('selected'); // Remove a classe de seleção após trocar
      checkOrder();
    } else if (userOrder.length < 8) {
      // Caso nenhum slot esteja selecionado, continua a montagem normalmente
      const slot = document.querySelector(`.slot[data-slot="${userOrder.length + 1}"]`);
      slot.innerHTML = `<img src="${this.src}" class="component">`;
      userOrder.push(selectedComponentId);
      checkOrder();
    }
  });
});

// Adicionar evento de clique aos slots para troca
slots.forEach(slot => {
  slot.addEventListener('click', function() {
    // Seleciona o slot para trocar o componente
    slots.forEach(s => s.classList.remove('selected')); // Remove a seleção dos outros slots
    this.classList.add('selected'); // Adiciona a classe de seleção ao slot clicado
  });
});

document.getElementById('reset').addEventListener('click', function() {
  resetGame();
});

function checkOrder() {
  if (userOrder.length === 8) {
    if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
      lamp.src = 'imagens/lampada-acesa.png';
      cerejinha.src = 'imagens/cerejinhafeliz.png';
      cerejinha.style.transform = 'scale(2)';
      message.textContent = 'Parabéns, você montou corretamente!';
      startCherryRain(); // Inicia a chuva de cerejas
    } else {
      message.textContent = 'TENTE DE NOVO MEU CHEFE!';
      cerejinha.src = 'imagens/cerejinhaduvida.png';
      cerejinha.style.transform = 'scale(2)';
    }
  }
}

function resetGame() {
  userOrder = [];
  lamp.src = 'imagens/lampada-apagada.png';
  cerejinha.src = 'imagens/cerejinhaduvida.png';
  cerejinha.style.transform = 'scale(1)';
  message.textContent = '';
  speechBubble.textContent = 'Olá, eu sou o Cerejinha, me ajude a montar o Projeto do TCC!'; // Reset da mensagem
  slots.forEach((slot, index) => {
    slot.innerHTML = <span class="component-name">${componentNames[index]}</span>; // Reinserir nomes nas caixas
  });
  clearCherryRain(); // Limpa a chuva de cerejas
}
