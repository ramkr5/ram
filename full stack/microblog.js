let username = '';
let posts = [];

function addUser() {
    const userInput = document.getElementById('username').value;
    if (userInput) {
        username = userInput;
        document.getElementById('username').value = ''; // Clear the input
        alert(`Welcome, ${username}!`);
    }
}

function createPost() {
    const postContent = document.getElementById('postContent').value;
    if (postContent && username) {
        const post = {
            content: postContent,
            likes: 0,
            dislikes: 0,
            comments: [],
            id: Date.now()
        };
        posts.push(post);
        document.getElementById('postContent').value = ''; // Clear the input
        renderPosts();
    } else {
        alert('Please enter a post and ensure you have added a username.');
    }
}

function renderPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = ''; // Clear previous posts

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <p>${post.content} <span class="likes">Likes: ${post.likes}</span> | <span class="dislikes">Dislikes: ${post.dislikes}</span> | Comments: <span class="commentCount">${post.comments.length}</span></p>
            <button onclick="likePost(${post.id})">👍 Like</button>
            <button onclick="dislikePost(${post.id})">👎 Dislike</button>
            <button onclick="addComment(${post.id})">💬 Comment</button>
            <div class="comments"></div>
        `;
        postsContainer.appendChild(postElement);
    });
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes += 1;
        renderPosts(); // Re-render posts to update likes
    }
}

function dislikePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.dislikes += 1;
        renderPosts(); // Re-render posts to update dislikes
    }
}

function addComment(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        const commentInput = prompt('Enter your comment:');
        if (commentInput) {
            post.comments.push(commentInput);
            renderPosts(); // Re-render posts to update comments
        }
    }
}
