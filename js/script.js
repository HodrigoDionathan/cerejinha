
const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8];
let userOrder = [];
const lamp = document.getElementById('lampada');
const cerejinha = document.getElementById('cerejinha');
const message = document.getElementById('message');
const slots = document.querySelectorAll('.slot');
const cherryRainContainer = document.getElementById('cherryRainContainer');

// Adiciona evento a todos os componentes disponíveis
document.querySelectorAll('.component').forEach(component => {
  component.addEventListener('click', function() {
    const componentId = Number(this.getAttribute('data-id'));

    // Verifica se o componente já está na montagem
    const indexInUserOrder = userOrder.indexOf(componentId);
    if (indexInUserOrder > -1) {
      // Se o componente já estiver montado, remove-o
      const slot = document.querySelector(`.slot[data-slot="${indexInUserOrder + 1}"]`);
      slot.innerHTML = ''; // Limpa o slot
      userOrder.splice(indexInUserOrder, 1); // Remove o componente da ordem do usuário
    } else if (userOrder.length < 8) {
      // Se o componente não estiver montado e houver espaço, adiciona-o
      const slot = document.querySelector(`.slot[data-slot="${userOrder.length + 1}"]`);
      slot.innerHTML = `<img src="${this.src}" class="component">`;
      userOrder.push(componentId);
    }

    checkOrder(); // Verifica a ordem após cada adição ou remoção
  });
});

// Reseta o jogo ao clicar no botão de reset
document.getElementById('reset').addEventListener('click', function() {
  resetGame();
});

// Função para verificar a ordem dos componentes montados
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

// Função para reiniciar o jogo
function resetGame() {
  userOrder = [];
  lamp.src = 'imagens/lampada-apagada.png';
  cerejinha.src = 'imagens/cerejinhaduvida.png';
  cerejinha.style.transform = 'scale(1)';
  message.textContent = '';
  slots.forEach(slot => (slot.innerHTML = ''));
  clearCherryRain(); // Limpa a chuva de cerejas
}

// Função para iniciar a chuva de cerejas
function startCherryRain() {
  const cherryCount = 30; // Quantas cerejas vão cair
  for (let i = 0; i < cherryCount; i++) {
    const cherry = document.createElement('img');
    cherry.src = 'imagens/cerejaaa.png'; // Caminho da imagem de cereja
    cherry.classList.add('cherry');
    cherry.style.left = Math.random() * window.innerWidth + 'px';
    cherry.style.animationDuration = (Math.random() * 2 + 3) + 's';
    cherryRainContainer.appendChild(cherry);
  }
}

// Função para limpar a chuva de cerejas
function clearCherryRain() {
  cherryRainContainer.innerHTML = '';
}

const speechBubble = document.querySelector('.speech-bubble'); // Referência ao balão de fala

// Reiniciar o jogo
function resetGame() {
  userOrder = [];
  lamp.src = 'imagens/lampada-apagada.png';
  cerejinha.src = 'imagens/cerejinhaduvida.png';
  cerejinha.style.transform = 'scale(1)';
  message.textContent = '';
  speechBubble.textContent = 'Olá, eu sou o Cerejinha, me ajude a montar o Projeto do TCC!'; // Reset da mensagem
  slots.forEach(slot => (slot.innerHTML = '')); // Limpa os slots
  clearCherryRain(); // Limpa a chuva de cerejas
}

const componentNames = [
  "Bateria",
  "Transformador +",
  "Capacitor",
  "Motor Elétrico",
  "Eixo",
  "Estator",
  "Transformador -",
  "Transistor"
];

function resetGame() {
  userOrder = [];
  lamp.src = 'imagens/lampada-apagada.png';
  cerejinha.src = 'imagens/cerejinhaduvida.png';
  cerejinha.style.transform = 'scale(1)';
  message.textContent = '';
  speechBubble.textContent = 'Olá, eu sou o Cerejinha, me ajude a montar o Projeto do TCC!'; // Reset da mensagem
  slots.forEach((slot, index) => {
    slot.innerHTML = `<span class="component-name">${componentNames[index]}</span>`; // Reinserir nomes nas caixas
  });
  clearCherryRain(); // Limpa a chuva de cerejas
}
