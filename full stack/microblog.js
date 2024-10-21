let users = [];
let currentUser = null;
let posts = [];

function signUp() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    if (users.find(user => user.username === username)) {
        alert('User already exists.');
        return;
    }

    users.push({ username, password });
    alert('Sign up successful! You can now log in.');
    document.getElementById('signupUsername').value = '';
    document.getElementById('signupPassword').value = '';
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        currentUser = user;
        alert(`Welcome ${username}!`);
        document.getElementById('auth').style.display = 'none';
        document.getElementById('postSection').style.display = 'block';
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        displayPosts();
    } else {
        alert('Invalid username or password.');
    }
}

function createPost() {
    const content = document.getElementById('postContent').value;

    if (!content) {
        alert('Please enter some content.');
        return;
    }

    const post = {
        content,
        date: new Date().toLocaleString(),
        likes: 0,
        dislikes: 0,
        comments: [],
        user: currentUser.username
    };

    posts.push(post);
    document.getElementById('postContent').value = '';
    displayPosts();
}

function displayPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <strong>${post.user}</strong> <em>${post.date}</em>
            <p>${post.content}</p>
            <p>Likes: ${post.likes} Dislikes: ${post.dislikes}</p>
            <button onclick="likePost(${index})">👍</button>
            <button onclick="dislikePost(${index})">👎</button>
            <input type="text" placeholder="Add a comment" id="commentInput${index}">
            <button onclick="addComment(${index})">Comment</button>
            <button onclick="deletePost(${index})">🗑️</button>
            <div>${post.comments.map(comment => `<p>🗨️ ${comment}</p>`).join('')}</div>
        `;
        postsContainer.appendChild(postDiv);
    });
}

function likePost(index) {
    posts[index].likes++;
    displayPosts();
}

function dislikePost(index) {
    posts[index].dislikes++;
    displayPosts();
}

function addComment(index) {
    const commentInput = document.getElementById(`commentInput${index}`);
    const comment = commentInput.value;

    if (comment) {
        posts[index].comments.push(comment);
        commentInput.value = '';
        displayPosts();
    } else {
        alert('Please enter a comment.');
    }
}

function deletePost(index) {
    if (confirm('Are you sure you want to delete this post?')) {
        posts.splice(index, 1);
        displayPosts();
    }
}
