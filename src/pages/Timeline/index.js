import { signOut } from '../../services/index.js';

export default () => {
  const user = firebase.auth().currentUser;
  // eslint-disable-next-line no-multi-assign
  const timeline = (document.getElementById('container').innerHTML = `
  <link rel="stylesheet" href="./pages/Timeline/style.css" />

    <div class="banner">
      <img src="assets/logo.png" alt="Logo">
      <div class="title-container">
          <h1 class="title">SeriesDay</h1>
          <h3 class="subtitle">review de séries</h3>
      </div>
    </div>

    <input id="navbar" type='checkbox' class="input">
    <label for="navbar">
      <div class='menu'>
          <span class='hamburger'></span>
      </div>
    </label>

    <ul class="inside-menu">
      <li class="flex-li">

        <img id="preview" src="${user.photoURL || '../../assets/default-user-img.png'}" class="user-photo-menu">

        <input type="checkbox" id="nope" />
        <div class="nomeDoDiv">
          <input type="file" id="photo" class="inputImg" accept=".jpg, .jpeg, .png">
          <button id="uploadImage" class="buttonImg">Enviar Imagem</button>
          <label for="nope"></label>
        </div>
        <label class="boxnope" for="nope">Alterar Imagem</label>
      </li>
      <li>
        <p class="username-menu"> <b>${user.displayName || 'Usuário'} </b> </p>
      </li>
      <li>
        <p class="email-menu"> ${user.email || 'Usuário'} </p>
      </li>

      <button id="signout-button" class="signout-button buttons">
        <img src="./assets/exit.png" alt="Ícone de Saída">
      </button>
    </ul>

    <form action="" id="postForm">
      <textarea type="textarea" id="postText" class="post-textarea" rows="5" cols="50" placeholder="Digite aqui sua review..."></textarea>
      <button type="submit" class="buttons post-button"> Publicar </button>
    </form>

    <ul id="posts"></ul>

  `);

  // const show = true;

  // const menuSection = document.querySelector('#container');
  // const menuToggle = menuSection.querySelector('.inside-menu');

  // menuToggle.addEventListener('click', () => {
  //   document.body.style.overflow = show ? 'hidden' : 'initial';

  //   menuSection.classList.toggle('on', show);
  //   show = !show;
  // });
  // const menuHambutg = document.querySelector('#navbar');
  // menuHambutg.addEventListener('click', () => {

  // });
  // Sair da conta do usuário
  document.getElementById('signout-button').addEventListener('click', (e) => {
    e.preventDefault();
    signOut();
  });

  // Criando coleção no firebase chamada 'posts'
  const postsCollection = firebase.firestore().collection('posts');

  // Enviando posts para o firestore
  document.getElementById('postForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const text = document.getElementById('postText').value;

    const post = {
      text,
      userId: user.displayName,
      likes: 0,
      comments: [],
    };

    postsCollection.add(post).then(() => {
      document.getElementById('postText').value = '';
      loadPosts();
    });
  });

  // Adicionando posts
  function createTemplatePost(post) {
    const date = new Date();

    const postTemplate = `
      <li class="posts-box">
        <div id="${post.id}"class="post-container">
          <div class="user-container">
            <img src="${user.photoURL || '../../assets/default-user-img.png'}" class="user-photo">
            <div class="username-date-container">
              <p class="username"> ${user.displayName || 'Usuário'} </p>
              <time class="date">${date.toLocaleString('pt-BR')}</time>
            </div>
          </div>

          <p class="post-value"> ${post.data().text} </p>
      
          <div class="like-comment">
            <p> ❤️ ${post.data().likes} </p>
            <p> 💬 </p> 
          </div>
        </div>
          
        <div id=${post.id} class="buttons-container">
          <button class="deletePost-btn timeline-buttons">🗑️</button>
          <button class="likePost-btn timeline-buttons">❤️</button>
          <button class="commentPost-btn timeline-buttons">💬</button>
          <div></div>
        </div>
        <form action="" class="postForm1">
          <textarea type="textarea" class="postText1" class="post-textarea" rows="5" cols="50">${post.data().text}</textarea>
          <button type="submit" class="post-button1"> Send </button>
        </form>
      </li>
    `;
    document.getElementById('posts').innerHTML += postTemplate;

    // Deletando posts
    const deleteButtons = document.querySelectorAll('.deletePost-btn');
    for (const button of deleteButtons) {
      button.addEventListener('click', (event) => {
        console.log(event.target.parentNode.id);
        deletePost(event.target.parentNode.id);
      });
    }

    function deletePost(id) {
      postsCollection
        .doc(id)
        .delete()
        .then(() => {
          loadPosts();
        });
    }

    // Curtindo posts
    const likeButtons = document.querySelectorAll('.likePost-btn');

    for (const button of likeButtons) {
      button.addEventListener('click', (event) => {
        console.log(event.target.parentNode.id);
        addLikes(event.target.parentNode.id);
      });
    }

    function addLikes(id) {
      postsCollection
        .doc(id)
        .update({
          likes: firebase.firestore.FieldValue.increment(1),
        })
        .then(() => {
          loadPosts();
        });
    }
  }

  // Adicionando foto do perfil
  const uploadImage = document.querySelector('#uploadImage');
  uploadImage.addEventListener('click', () => {
    console.log('botão de upa img');
    const ref = firebase.storage().ref();
    const file = document.querySelector('#photo').files[0];
    const name = `${new Date()}-${file.name}`;
    const metadata = {
      contentType: file.type,
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        console.log(url);
        console.log('imagem upada');
        const image = document.querySelector('#preview');
        image.src = url;
        const userUp = firebase.auth().currentUser;
        userUp.updateProfile({
          photoURL: url,
        });
        location.reload();
      });
  });

  // Mostrando os posts na tela
  function loadPosts() {
    document.getElementById('posts').innerHTML = 'Carregando posts...';

    postsCollection.get().then((snap) => {
      document.getElementById('posts').innerHTML = '';
      snap.forEach((post) => {
        createTemplatePost(post);
      });
    });
  }

  const botaoEdit = document.querySelectorAll('.post-button1');
  for (const botao of botaoEdit) {
    console.log('buscando')
    botao.addEventListener('click', (event) => {
      console.log(event.target.parentNode.id); // id do post em que o botão foi clicado
      editarPost(event.target.parentNode.id); // função de enviar edição
    });
  }

  function editarPost(id) {
    console.log('função edit chamada');
    postsCollection.doc(id).update({
      text: 'novo post',
    })
      .then(() => {
        loadPosts();
      });
  }


  loadPosts();

  return timeline;
};
