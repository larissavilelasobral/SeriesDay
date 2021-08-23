import { signOut } from '../../services/index.js';

export const Timeline = () => {
  const timeline = document.createElement('div');
  timeline.innerHTML = `
    <button id="signout-button" class="signout-button buttons">
      <img src="./assets/exit-black.png" alt="Ícone de Saída">
    </button>

    <button id="desktop-signout-button" class="signout-button desktop-signout-button buttons">
      <img src="./assets/exit-white.png" alt="Ícone de Saída">
    </button>

    <div id="deleteBtn">
      <button class="deletePost-btn timeline-buttons font-work visibility-hidden">
        <img src="./assets/trash.png" alt="Ícone de Lixeira">
      </button>
    </div>
  `;

  // Sair da conta do usuário (MOBILE)
  timeline.querySelector('#signout-button').addEventListener('click', (e) => {
    e.preventDefault();
    signOut();
  });

  // Sair da conta do usuário (DESKTOP)
  timeline.querySelector('.desktop-signout-button').addEventListener('click', (e) => {
    e.preventDefault();
    signOut();
  });

  return timeline;
};
