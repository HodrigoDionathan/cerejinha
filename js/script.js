const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8];
let userOrder = [];
const lamp = document.getElementById('lampada');
const cerejinha = document.getElementById('cerejinha');
const message = document.getElementById('message');
const slots = document.querySelectorAll('.slot');
const cherryRainContainer = document.getElementById('cherryRainContainer');
const speechBubble = document.querySelector('.speech-bubble'); // Balão de fala

// Nomes dos componentes
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

// Inicializa as caixas vazias com os nomes dos componentes
slots.forEach((slot, index) => {
  slot.textContent = componentNames[index]; // Coloca o nome do componente no slot correspondente
});

// Mensagem inicial de apresentação do personagem
speechBubble.textContent = 'Olá, eu sou o Cerejinha! Me ajude a montar o projeto do TCC.';

// Evento de clique nos componentes
document.querySelectorAll('.component').forEach(component => {
  component.addEventListener('click', function() {
    if (userOrder.length < 8) {
      const slot = document.querySelector(`.slot[data-slot="${userOrder.length + 1}"]`);
      slot.innerHTML = `<img src="${this.src}" class="component">`;
      userOrder.push(Number(this.getAttribute('data-id')));
      checkOrder(); // Verifica a ordem após cada escolha
    }
  });
});

// Função para verificar a ordem da montagem
function checkOrder() {
  if (userOrder.length === 8) {
    if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
      lamp.src = 'imagenss/lampada-acesa.png'; // Lâmpada acesa
      cerejinha.src = 'imagenss/cerejinhafeliz.png'; // Imagem de sucesso do Cerejinha
      cerejinha.style.transform = 'scale(3)';
      message.textContent = 'Parabéns, você montou corretamente!';
      speechBubble.textContent = 'Parabéns! Mandou bem, projeto concluído!'; // Mensagem de sucesso no balão de fala
      startCherryRain(); // Inicia a chuva de cerejas
    } else {
      message.textContent = 'TENTE DE NOVO MEU CHEFE!';
      cerejinha.src = 'imagenss/cerejinhaduvida.png'; // Imagem de dúvida/frustração do Cerejinha
      cerejinha.style.transform = 'scale(2)';
      speechBubble.textContent = 'Não desista, meu chefe! Tente novamente!'; // Mensagem de erro no balão de fala
    }
  }
}

// Função para reiniciar o jogo
function resetGame() {
  userOrder = [];
  lamp.src = 'imagenss/lampada-apagada.png'; // Lâmpada apagada
  cerejinha.src = 'imagenss/cerejinhaduvida.png'; // Volta a imagem inicial do Cerejinha
  cerejinha.style.transform = 'scale(1)';
  message.textContent = '';
  slots.forEach((slot, index) => {
    slot.innerHTML = ''; // Limpa as imagens
    slot.textContent = componentNames[index]; // Recoloca o nome do componente no slot correspondente
  });
  speechBubble.textContent = 'Vamos tentar novamente! Me ajude a montar o projeto!'; // Mensagem de reinício no balão de fala
  clearCherryRain(); // Limpa a chuva de cerejas
}

// Função para iniciar a chuva de cerejas
function startCherryRain() {
  const cherryCount = 30; // Quantidade de cerejas que vão cair
  for (let i = 0; i < cherryCount; i++) {
    const cherry = document.createElement('img');
    cherry.src = 'imagenss/cerejaaa.png'; // Caminho da imagem de cereja
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

// Exemplo de como você pode verificar se os componentes estão na ordem correta
function acenderLampada() {
  lampada.src = "imagenss/lampada-acesa.png"; // Lâmpada acesa
  lampada.classList.add('lamp-brilho');
}

function apagarLampada() {
  lampada.src = "imagenss/lampada-apagada.png"; // Lâmpada apagada
  lampada.classList.remove('lamp-brilho');
}

document.getElementById('reset').addEventListener('click', resetGame);
