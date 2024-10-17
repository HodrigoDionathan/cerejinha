const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8];
let userOrder = [];
const lamp = document.getElementById('lampada');
const cerejinha = document.getElementById('cerejinha');
const message = document.getElementById('message');
const slots = document.querySelectorAll('.slot');

document.querySelectorAll('.component').forEach(component => {
  component.addEventListener('click', function() {
    if (userOrder.length < 8) {
      const slot = document.querySelector(`.slot[data-slot="${userOrder.length + 1}"]`);
      slot.innerHTML = `<img src="${this.src}" class="component">`;
      userOrder.push(Number(this.getAttribute('data-id')));
      checkOrder();
    }
  });
});

document.getElementById('reset').addEventListener('click', function() {
  resetGame();
});

function checkOrder() {
  if (userOrder.length === 8) {
    if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
      lamp.src = 'lamp_on.png';
      cerejinha.src = 'cerejinha_celebrate.png';
      cerejinha.style.transform = 'scale(1.2)';
      message.textContent = 'Parabéns, você montou corretamente!';
      document.body.style.backgroundColor = '#00ff00'; // Efeito de comemoração
    } else {
      message.textContent = 'TENTE DE NOVO MEU CHEFE!';
      cerejinha.src = 'cerejinha_sad.png';
    }
  }
}

function resetGame() {
  userOrder = [];
  lamp.src = 'lamp_off.png';
  cerejinha.src = 'cerejinha.png';
  cerejinha.style.transform = 'scale(1)';
  message.textContent = '';
  slots.forEach(slot => (slot.innerHTML = ''));
  document.body.style.backgroundColor = ''; // Reseta a cor de fundo
}
