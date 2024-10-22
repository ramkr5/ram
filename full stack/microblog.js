let users = []; // Array to hold user data
let currentUser = null; // To keep track of the logged-in user
let posts = JSON.parse(localStorage.getItem('posts')) || []; // Load posts from localStorage

// Function to handle user signup
function signUp() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Check if user already exists
    if (users.find(user => user.username === username)) {
        alert('User already exists.');
        return;
    }

    // Add new user to the users array
    users.push({ username, password });
    alert('Sign up successful! You can now log in.');
    
    // Clear the input fields
    document.getElementById('signupUsername').value = '';
    document.getElementById('signupPassword').value = '';
}

// Function to handle user login
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Find the user with the provided username and password
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        currentUser = user; // Set the current user
        alert(`Welcome ${username}!`);
        
        // Hide authentication section and show post section
        document.getElementById('auth').style.display = 'none';
        document.getElementById('postSection').style.display = 'block';

        // Clear login input fields
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';

        // Display existing posts
        displayPosts();
    } else {
        alert('Invalid username or password.');
    }
}

// Function to create a new post
function createPost() {
    const content = document.getElementById('postContent').value;

    if (!content) {
        alert('Please enter some content.');
        return;
    }

    // Create a new post object
    const post = {
        content,
        date: new Date().toLocaleString(),
        likes: 0,
        dislikes: 0,
        comments: [],
        user: currentUser.username
    };

    posts.push(post); // Add post to the posts array
    localStorage.setItem('posts', JSON.stringify(posts)); // Save posts to localStorage
    document.getElementById('postContent').value = ''; // Clear the input field
    displayPosts(); // Display all posts
}

// Function to display posts
function displayPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; // Clear existing posts

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
        postsContainer.appendChild(postDiv); // Add post to the container
    });
}

// Function to like a post
function likePost(index) {
    posts[index].likes++;
    localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
    displayPosts(); // Refresh displayed posts
}

// Function to dislike a post
function dislikePost(index) {
    posts[index].dislikes++;
    localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
    displayPosts(); // Refresh displayed posts
}

// Function to add a comment to a post
function addComment(index) {
    const commentInput = document.getElementById(`commentInput${index}`);
    const comment = commentInput.value;

    if (comment) {
        posts[index].comments.push(comment); // Add comment to the post
        commentInput.value = ''; // Clear the input field
        localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
        displayPosts(); // Refresh displayed posts
    } else {
        alert('Please enter a comment.');
    }
}

// Function to delete a post
function deletePost(index) {
    if (confirm('Are you sure you want to delete this post?')) {
        posts.splice(index, 1); // Remove the post from the array
        localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
        displayPosts(); // Refresh the displayed posts
    }
}

// Display posts on page load
window.onload = function() {
    displayPosts();
};
