export default () => {
   const timeline = document.getElementById("root").innerHTML = `

   <button id="signout-button" class="flex-itens">Sign Out</button>
   <div>
      <form action="" id="postForm">
        <input type="textarea" id="postText"/>
        <button type="submit"> Enviar </button>
      </form>

      <ul id="posts"></ul>

      <button id="btn-deletePost">Delete</button>

    </div>`;

   
// sair da conta do usuario
document.getElementById('signout-button').addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    location.reload();
  });
    

// Criando coleção no firebase chamda 'posts'
const postsCollection = firebase.firestore().collection('posts')

// Enviando posts para o firestore
document.getElementById('postForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const text = document.getElementById('postText').value;
  
  const post = {
    text: text,
    user_id: 'Patrícia',
    likes: 0,
    comments:[]
  } 

  postsCollection
    .add(post)
    .then(() => {
      document.getElementById('postText').value = ""
      loadPosts()
    })
})

// Adicionando posts 
function addPost(post) {
  const postTemplate = `
      <li id="${post.id}"> Post: ${post.data().text} | ❤ ${post.data().likes}</li>
  `
  document.getElementById('posts').innerHTML += postTemplate
}

// Mostrando os posts na tela
function loadPosts() {

  document.getElementById('posts').innerHTML = "Carregando..."

  postsCollection
    .get()
    .then(snap => {
      document.getElementById('posts').innerHTML = ""
      snap.forEach(post => {
        addPost(post)
      })
    })
}

loadPosts()

// Deletando posts
function deletePost(postId) {
  postsCollection
    .doc(postId)
    .delete()
    .then(() => {
      loadPosts()
    })
}

return timeline;

}