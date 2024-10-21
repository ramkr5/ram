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
    posts.push({ username, content: postContent });
    localStorage.setItem('posts', JSON.stringify(posts));

    document.getElementById('postContent').value = ''; // Clear input field
    loadPosts(); // Re-render posts
}

// Load and display all posts
function loadPosts() {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = ''; // Clear the current posts
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.style.border = "1px solid #ddd";
        postElement.style.margin = "10px 0";
        postElement.style.padding = "10px";
        postElement.style.borderRadius = "5px";
        postElement.innerHTML = `<strong>${post.username}:</strong> ${post.content}`;
        postsDiv.appendChild(postElement);
    });
}
