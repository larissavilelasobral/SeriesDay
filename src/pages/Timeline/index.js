import { signOut, deletePost, editPost } from '../../services/index.js';

export default () => {
  const user = firebase.auth().currentUser;

  if (!user) {
    signOut();
  }
  const timeline = document.createElement('div');
  timeline.innerHTML = `
  <link rel="stylesheet" href="./pages/Timeline/style.css" />

  <div class="banner-menu">
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
      <div class="profile-container">
        <li class="upload-photo">
          <img id="preview" src="${user.photoURL || '../../assets/default-user-img.png'}" class="user-photo-menu" accept=".jpg, .jpeg, .png">

          <p class="photo-message font-work" id="photo-message-mobile"></p>

          <input type="checkbox" id="nope" />
          <div class="photo-buttons">
            <label class="labelfile font-work"for="photo">Selecionar Imagem</label>
            <input type="file" id="photo" class="input-img" accept=".jpg, .jpeg, .png">
            <button id="uploadImage" class="enviar-button destkop-upload-image font-work">Enviar</button>
            <label for="nope"></label>
          </div>
          <label class="arrow" for="nope"></label>
        </li>
        <li>
          <p class="username-menu"> <b>${user.displayName || 'Usuário'} </b> </p>
        </li>
        <li>
          <p class="email-menu"> ${user.email || 'usuario@email.com'} </p>
        </li>
      </div>

      <button id="signout-button" class="signout-button buttons">
        <img src="./assets/exit.png" alt="Ícone de Saída">
      </button>
    </ul>
  </div>
  
  <form action="" id="postForm" class="post-form">
    <textarea type="textarea" id="postText" class="post-textarea font-work" rows="10" cols="100" placeholder="Digite aqui sua review..."></textarea>
    <button type="submit" class="buttons post-button"> Publicar </button>
  </form>

  <ul id="posts" class="li-post-container"></ul>
    
  <div class="desktop-profile-container">
    <li class="upload-photo">
      <img id="preview" src="${user.photoURL || '../../assets/default-user-img.png'}" class="user-photo-menu desktop-preview">

      <p class="photo-message font-work" id="photo-message-desktop"></p>

      <input type="checkbox" id="desktop-nope" />
      <div class="desktop-photo-buttons">
        <label class="labelfile font-work"for="photo">Selecionar Imagem</label>
        <input type="file" id="photo" class="input-img desktop-photo" accept=".jpg, .jpeg, .png">
        <button id="uploadImage" class="enviar-button font-work desktop-upload-image">Enviar</button>
        <label for="desktop-nope"></label>
      </div>
      <label class="arrow" for="desktop-nope"></label>
    </li>
    <li>
      <p class="username-menu"> <b>${user.displayName || 'Usuário'} </b> </p>
    </li>
    <li>
      <p class="email-menu"> ${user.email || 'usuario@email.com'} </p>
    </li>
  </div>

  <button id="desktop-signout-button" class="signout-button desktop-signout-button buttons">
    <img src="./assets/exit.png" alt="Ícone de Saída">
  </button>

  <div id="modal-publish" class="modal-publish-container">
    <div class="modal-publish">
      <h3 class="font-work"> Por favor, digite uma review antes de publicar. </h3>

      <button id="publish-confirmation" class="btn-modal btn-ok"> OK </button>
    </div>
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

  // Manipulando os modais
  function startModalDelete() {
    const modalDelete = timeline.querySelector('#modal-delete')
    if(modalDelete){
      modalDelete.classList.add('show-modal')

      modalDelete.addEventListener('click', (e) => {
        if(e.target.id == 'modal-delete' || e.target.className == 'btn-modal btn-cancel') {
          modalDelete.classList.remove('show-modal')
        }
      })
    }
  }

  function startModalPublish() {
    const modalPublish = timeline.querySelector('#modal-publish')
    if (modalPublish) {
      modalPublish.classList.add('show-modal')

      modalPublish.addEventListener('click', (e) => {
        if(e.target.id == 'modal-publish' || e.target.className == 'btn-modal btn-ok') {
          modalPublish.classList.remove('show-modal')
        }
      })
    }
  }

  // Criando coleção no firebase chamada 'posts'
  const postsCollection = firebase.firestore().collection('posts');

  // Enviando posts para o firestore
  timeline.querySelector('#postForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const text = timeline.querySelector('#postText').value;

    if (text) {
      const getDate = () => {
        const date = new Date();
        return date.toLocaleString('pt-BR');
      };
      const post = {
        text,
        likes: 0,
        date: getDate(),
        id: user.uid,
        email: user.email,
      };
      postsCollection.add(post).then(() => {
        timeline.querySelector('#postText').value = '';
        loadPosts();
      });
    } else {
      startModalPublish();
    }
  });

  // Adicionando posts
  function createTemplatePost(post, postUser) {
    const postTemplate = `
      <li data-templatepost class="posts-box">
        <div id="${post.id}"class="post-container">
          <div class="user-container">
            <img id="photo-profile" src="${(postUser.data().photo) !== '' ? postUser.data().photo : '../../assets/default-user-img.png'}" class="user-photo" accept=".jpg, .jpeg, .png">
            <div class="username-date-container">
              <p class="username"> ${postUser.data().name || 'Usuário'} </p>
              <time class="date">${post.data().date}</time>
            </div>
          </div>
        
          <div id=${post.id}>
            <textarea disabled class="post font-work" rows="7" cols="100">${post.data().text}</textarea>
            <div id=${post.id} class="edit-container display-none">
              <textarea class="post font-work edited-post display-none" rows="4" cols="50">${post.data().text}</textarea>

              <p class="empty-text font-work"></p>
            
              <div id=${post.id} class="edit-buttons-container">
                <button data-close class='close-edit-button buttons display-none' type='button'> Cancelar </button>
                <button data-save class='save-edit-button buttons display-none' type='button'>Salvar</button>
              </div>
            </div>
          </div>

          <div id=${post.id} class="buttons-container">
            <button class="likePost-btn timeline-buttons font-work"> 
              <img src="./assets/heart.png" alt="Ícone de Coração">
              ${post.data().likes}
            </button>  

            <div id=${post.id}>
              <button class="editPost-btn timeline-buttons font-work visibility-hidden">
                <img data-edit src="./assets/pencil.png" alt="Ícone de Lápis">
              </button>
              <button class="deletePost-btn timeline-buttons font-work visibility-hidden">
                <img src="./assets/trash.png" alt="Ícone de Lixeira">
              </button>
            </div>
          </div>
        </div> 
      </li>

      <div id="modal-delete" class="modal-delete-container">
        <div class="modal-delete">
          <h3 class="font-work"> Tem certeza quer deseja deletar esse post? </h3>

          <div id=${post.id}>
            <button id="delete-confirmation" class="btn-modal btn-yes"> Sim </button>
            <button class="btn-modal btn-cancel"> Cancelar </button>
          </div>
        </div>
      </div>
    `;

    const postBox = timeline.querySelector('#posts');
    postBox.innerHTML += postTemplate;

    // Deletar posts
    const deleteButtons = postBox.querySelectorAll('.deletePost-btn');
    for (const button of deleteButtons) {
      button.addEventListener('click', (event) => {
        event.preventDefault()
        startModalDelete()
      });
    }

    const deleteConfirmation = timeline.querySelectorAll('#delete-confirmation');

    for (const button of deleteConfirmation) {
      button.addEventListener('click', (event) => {
        event.preventDefault()
        deletePost(event.currentTarget.parentNode.id);
        loadPosts();
      })
    }
   

    // Curtir e descurtir posts
    function likePost(id) {
      const promiseLikes = postsCollection
        .doc(id)
        .get()
        .then((post) => {
          const countLikes = post.data().likes;
          if (countLikes >= 1) {
            postsCollection
              .doc(id)
              .update({
                likes: post.data().likes - 1,
              })
              .then(() => {
                loadPosts();
              });
          } else {
            postsCollection
              .doc(id)
              .update({
                likes: post.data().likes + 1,
              })
              .then(() => {
                loadPosts();
              });
          }
        });
      return promiseLikes.then();
    }

    const likeButtons = postBox.querySelectorAll('.likePost-btn');

    for (const button of likeButtons) {
      button.addEventListener('click', (event) => {
        likePost(event.currentTarget.parentNode.id);
      });
    }

    // Abrir área de editar post
    const postLi = timeline.querySelectorAll('[data-templatePost]');

    function openEditPost(element) {
      element.querySelector('.edited-post').classList.remove('display-none');
      element.querySelector('.save-edit-button').classList.remove('display-none');
      element.querySelector('.close-edit-button').classList.remove('display-none');
      element.querySelector('.edit-container').classList.remove('display-none');
    }

    for (const openEdit of postLi) {
      openEdit.addEventListener('click', (e) => {
        const target = e.target;
        if (target.dataset.edit === '') {
          openEditPost(openEdit);
        }
      });
    }

    // Fechar área de editar post
    function closeEditPost(element) {
      element.querySelector('.edited-post').classList.add('display-none');
      element.querySelector('.save-edit-button').classList.add('display-none');
      element.querySelector('.close-edit-button').classList.add('display-none');
      element.querySelector('.edit-container').classList.add('display-none');
      element.querySelector('.empty-text').innerHTML = '';
    }

    for (const closeEdit of postLi) {
      closeEdit.addEventListener('click', (e) => {
        const target = e.target;
        if (target.dataset.close === '') {
          closeEditPost(closeEdit);
        }
      });
    }

    for (const buttonSave of postLi) {
      buttonSave.addEventListener('click', (e) => {
        const editedPost = buttonSave.querySelector('.edited-post').value;
        const target = e.target;
        if (target.dataset.save === '') {
          e.preventDefault();
          if (editedPost) {
            editPost(editedPost, e.target.parentNode.id);
            loadPosts();
          } else {
            const emptyText = buttonSave.querySelector('.empty-text');
            emptyText.style.color = 'red';
            emptyText.innerHTML = 'Edite sua review antes de salvar.';
          }
        }
      });
    }

    // Visibilidade dos botões de editar, deletar e curtir
    for (const deleteVisilibity of deleteButtons) {
      if (firebase.auth().currentUser.email === postUser.data().email) {
        deleteVisilibity.classList.remove('visibility-hidden');
      }
    }

    const editPencil = timeline.querySelectorAll('.editPost-btn')

    for (const editVisilibity of editPencil) {
      if (firebase.auth().currentUser.email === postUser.data().email) {
        editVisilibity.classList.remove('visibility-hidden');
      }
    }

    for (const likeVisilibity of likeButtons) {
      if (firebase.auth().currentUser.email === postUser.data().email) {
        likeVisilibity.classList.add('visibility-hidden'); 
      }
    } 
  }

  // Adicionando foto do perfil (MOBILE)
  const photoMsgMobile = timeline.querySelector('#photo-message-mobile');
  const uploadImage = timeline.querySelector('#uploadImage');

  uploadImage.addEventListener('click', () => {
   
    photoMsgMobile.innerHTML = 'Carregando imagem...';

    const ref = firebase.storage().ref();
    const file = timeline.querySelector('#photo').files[0];
    const name = `${new Date()}-${file.name}`;
    const metadata = {
      contentType: file.type,
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        const image = timeline.querySelector('#preview');
        image.src = url;
        const currentUserUp = firebase.auth().currentUser;
        currentUserUp.updateProfile({
          photoURL: url
        });

        postsCollection.get().then((snap) => {
          snap.forEach((post) => {
            const currentUser = firebase.auth().currentUser;
            
            if (post.data().email === currentUser.email) {
              const userUp = firebase.firestore().collection('users').doc(post.data().email)
              return userUp.update({
                photo: url
              })
              .then(()=> {
                photoMsgMobile.innerHTML = '';
                window.location.reload();
              })
              .catch((error) => {
                console.error("Error updating document: ", error);
              })
            }
          })
        })
 
      });
  });

  // Adicionando foto do perfil (DESKTOP)
  const photoMsgDesktop = timeline.querySelector('#photo-message-desktop');
  const uploadImageDestkop = timeline.querySelector('.desktop-upload-image');

  uploadImageDestkop.addEventListener('click', () => {

    photoMsgDesktop.innerHTML = 'Carregando imagem...';

    const ref = firebase.storage().ref();
    const file = timeline.querySelector('#photo').files[0];
    const name = `${new Date()}-${file.name}`;
    const metadata = {
      contentType: file.type,
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        photoMsgDesktop.innerHTML = 'Carregando imagem...';
        const image = timeline.querySelector('.desktop-preview');
        image.src = url;
        const currentUserUp = firebase.auth().currentUser;
        currentUserUp.updateProfile({
          photoURL: url
        });
        postsCollection.get().then((snap) => {
          snap.forEach((post) => {
            const currentUser = firebase.auth().currentUser;

            if (post.data().email === currentUser.email) {
              const userUp = firebase.firestore().collection('users').doc(post.data().email)
              return userUp.update({
                photo: url
              })
              .then(()=> {
                photoMsgDesktop.innerHTML = '';
                window.location.reload();
              })
              .catch((error) => {
                console.error("Error updating document: ", error);
              })
            }
          })
        })
    })
    
  });

  // Mostrando os posts na tela
  function loadPosts() {
    timeline.querySelector('#posts').innerHTML = '<span class="font-work">Carregando posts...</span>';

    postsCollection.orderBy('date', 'desc').get().then((snap) => {
      timeline.querySelector('#posts').innerHTML = '';
      snap.forEach((post) => {
        const usersCollection = firebase.firestore().collection('users').doc(post.data().email);
        usersCollection.get().then((postUser) => {
          createTemplatePost(post, postUser);
        });
      });
    });
  }

  loadPosts();

  return timeline;
};
