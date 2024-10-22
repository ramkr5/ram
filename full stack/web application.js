let users = []; // Array to hold user data
let currentUser = null; // To keep track of the logged-in user
let products = JSON.parse(localStorage.getItem('products')) || []; // Load products from localStorage

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

        // Display existing products
        displayProducts();
    } else {
        alert('Invalid username or password.');
    }
}

// Function to add a new product
function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value;
    const imageInput = document.getElementById('productImage');

    // Validate inputs
    if (!name || !price || !description || !imageInput.files.length) {
        alert('Please fill in all fields.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const product = {
            name,
            price: parseFloat(price),
            description,
            date: new Date().toLocaleString(),
            user: currentUser.username,
            image: event.target.result // Store the image data URL
        };

        products.push(product); // Add product to the array
        localStorage.setItem('products', JSON.stringify(products)); // Save products to localStorage
        displayProducts(); // Refresh product display

        // Clear input fields
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productDescription').value = '';
        imageInput.value = ''; // Clear the image input
    };

    reader.readAsDataURL(imageInput.files[0]); // Read the image file as a data URL
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
            <p>Price: ₹${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <p><small>Listed by: ${product.user} on ${product.date}</small></p>
            <img src="${product.image}" alt="${product.name}" style="width:100%; max-height:200px; object-fit:cover;">
            <button onclick="buyProduct(${index})">Buy</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
        productsContainer.appendChild(productDiv); // Add product to the container
    });
}

// Function to handle buying a product
function buyProduct(index) {
    const product = products[index];
    alert(`You have purchased ${product.name} for ₹${product.price.toFixed(2)}!`);
    // Here, you can implement further logic like marking the product as sold or removing it from the list.
}

// Function to delete a product
function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        products.splice(index, 1); // Remove the product from the array
        localStorage.setItem('products', JSON.stringify(products)); // Update localStorage
        displayProducts(); // Refresh the displayed products
    }
}

// Display products if user is already logged in (optional)
if (currentUser) {
    document.getElementById('productSection').style.display = 'block';
    displayProducts();
}
