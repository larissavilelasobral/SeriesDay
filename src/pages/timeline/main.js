export default () => {
  document.querySelector('#root').innerHTML = ' ';
  const container = document.createElement('div');
  const templete = `
  <main id="box">
    <form action="" id="postForm">
      <input type="textarea" id="postText"/>
      <button type="submit"> Enviar </button>
    </form>
    <ul id="posts"></ul>

    <button id="btn-deletePost">Delete</button>
    <button id="signout-button" class="flex-itens">Sign Out</button>
  <main>`;
  container.innerHTML = templete;
  return container;
};
