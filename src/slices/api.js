const baseUrl = `https://jsonplaceholder.typicode.com`;

const toJSON = data => data.json();

const getPost = id => fetch(`${baseUrl}/posts/${id}`).then(toJSON);

const getPosts = () => fetch(`${baseUrl}/posts`).then(toJSON);

const getComments = postId =>
  fetch(`${baseUrl}/comments?postId=${postId}`).then(toJSON);

export { getPost, getPosts, getComments };
