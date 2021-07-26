export default () => {
  document.querySelector('#root').innerHTML = ' ';
  const container = document.createElement('div');
  const templete = `
    <main id="box">
      <div class="divlogo">
        <img src="assets/logo.png" alt="Logo">
        <h1>SeriesDay</h1>
        <h3>review de séries</h3>
      </div>
      <section>
        <form class="form-log">
          <input id="email" class="input" type="email" autocomplete="on" placeholder="E-mail" required>
          <input id="password" class="input" type="password" autocomplete="on" placeholder="Senha" required>
          <p id="nonUser"></p>
        </form>
        <div class="divbutton">
        <button id="signin-button" class="signin-button button">Entrar</button>

        <p> OU </p>
        <div id="firebaseui-auth-container"></div>

        <button id="page-signup-button" class="signupbutton"> Não possui cadastro? <span>Clique aqui</span></button>
        </div>
        </section>
        <button id="signout-button" class="flex-itens">Sign Out</button>
    </main>
    `;
  container.innerHTML = templete;
  return container;
};
