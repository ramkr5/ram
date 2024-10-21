// Check if a user is already logged in
if (localStorage.getItem('loggedInUser')) {
    showMicroblog();
} else if (localStorage.getItem('users')) {
    // If users exist, show login
    document.getElementById('login').classList.remove('hidden');
} else {
    // Show signup if no users exist
    document.getElementById('signup').classList.remove('hidden');
}

// Sign Up Function
function signUp() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    if (username && password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert("Username already exists. Try a different one.");
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert("Sign up successful! Please login.");
            document.getElementById('signup').classList.add('hidden');
            document.getElementById('login').classList.remove('hidden');
        }
    } else {
        alert("Please fill in both fields.");
    }
}

// Login Function
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', username);
        alert("Login successful!");
        showMicroblog();
    } else {
        alert("Invalid username or password.");
    }
}

// Show the microblogging section
function showMicroblog() {
    document.getElementById('signup').classList.add('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('microblog').classList.remove('hidden');
    loadPosts();
}

// Create a new post
function createPost() {
    const postContent = document.getElementById('postContent').value;
    if (!postContent.trim()) {
        alert("Post content cannot be empty!");
        return;
    }

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const username = localStorage.getItem('loggedInUser');
    const date = new Date();
    const post = {
        username: username,
        content: postContent,
        timestamp: date.toLocaleString(),
        likes: 0,
        dislikes: 0,
        comments: []
    };
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    document.getElementById('postContent').value = ''; // Clear input field
    loadPosts(); // Re-render posts
}

// Load and display all posts
function loadPosts() {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = ''; // Clear the current posts
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.style.border = "1px solid #ddd";
        postElement.style.margin = "10px 0";
        postElement.style.padding = "10px";
        postElement.style.borderRadius = "5px";
        
        postElement.innerHTML = `
            <strong>${post.username}:</strong> ${post.content}<br>
            <small>Posted on: ${post.timestamp}</small><br><br>
            <button onclick="likePost(${index})">👍 ${post.likes}</button>
            <button onclick="dislikePost(${index})">👎 ${post.dislikes}</button>
            <button onclick="toggleComments(${index})">💬 Comments</button>
            <div id="comments-${index}" class="hidden">
                <input type="text" id="commentInput-${index}" placeholder="Add a comment...">
                <button onclick="addComment(${index})">Post Comment</button>
                <div id="commentList-${index}">
                    ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
                </div>
            </div>
        `;
        postsDiv.appendChild(postElement);
    });
}

// Like a post
function likePost(index) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts[index].likes++;
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts(); // Re-render posts
}

// Dislike a post
function dislikePost(index) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts[index].dislikes++;
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts(); // Re-render posts
}

// Toggle comment section visibility
function toggleComments(index) {
    const commentsDiv = document.getElementById(`comments-${index}`);
    commentsDiv.classList.toggle('hidden');
}

// Add a comment to a post
function addComment(index) {
    const commentInput = document.getElementById(`commentInput-${index}`).value;
    if (!commentInput.trim()) {
        alert("Comment cannot be empty!");
        return;
    }

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts[index].comments.push(commentInput);
    localStorage.setItem('posts', JSON.stringify(posts));

    document.getElementById(`commentInput-${index}`).value = ''; // Clear comment input
    loadPosts(); // Re-render posts
}
