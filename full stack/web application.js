let users = []; // Array to hold user data
let currentUser = null; // To keep track of the logged-in user
let products = []; // Array to hold product listings

// Function to toggle between login and signup
function toggleSignup() {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('signupSection').style.display = 'block';
}

function toggleLogin() {
    document.getElementById('signupSection').style.display = 'none';
    document.getElementById('authSection').style.display = 'block';
}

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

    // Switch to login section
    toggleLogin();
}

// Function to handle user login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Find the user with the provided username and password
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        currentUser = user; // Set the current user
        alert(`Welcome ${username}!`);

        // Hide authentication section and show product section
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('signupSection').style.display = 'none';
        document.getElementById('productSection').style.display = 'block';

        // Clear login input fields
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    } else {
        alert('Invalid username or password.');
    }
}

// Function to add a new product
function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value;

    // Validate inputs
    if (!name || !price || !description) {
        alert('Please fill in all fields.');
        return;
    }

    const product = {
        name,
        price: parseFloat(price),
        description,
        date: new Date().toLocaleString(),
        user: currentUser.username,
    };

    products.push(product); // Add product to the array
    displayProducts(); // Refresh product display

    // Clear input fields
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDescription').value = '';
}

// Function to display products
function displayProducts() {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = ''; // Clear existing products

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <p><small>Listed by: ${product.user} on ${product.date}</small></p>
        `;
        productsContainer.appendChild(productDiv); // Add product to the container
    });
}
