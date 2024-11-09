// Initialize some mock data for users and products
let users = JSON.parse(localStorage.getItem('users')) || []; // Load users from localStorage, if any
let products = JSON.parse(localStorage.getItem('products')) || []; // Load products from localStorage, if any
let loggedInUser = null; // Current logged-in user

// Function to toggle between Login and Sign-Up sections
function toggleSignup() {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('signupSection').style.display = 'block';
}

function toggleLogin() {
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('signupSection').style.display = 'none';
}

// Function to handle user login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if username and password match
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        loggedInUser = user;
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Save logged-in user in localStorage
        alert("Login successful!");
        showProductSection();
    } else {
        alert("Invalid username or password");
    }
}

// Function to handle user sign-up
function signUp() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert("User already exists!");
    } else {
        const newUser = { username, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users)); // Save new user to localStorage
        alert("Sign up successful! You can now log in.");
        toggleLogin(); // Switch to login page after successful sign-up
    }
}

// Show the product section when logged in
function showProductSection() {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('signupSection').style.display = 'none';
    document.getElementById('productSection').style.display = 'block';
    displayProducts(); // Display the saved products
}

// Function to add a new product
function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value;
    const image = document.getElementById('productImage').files[0];

    if (name && price && description && image) {
        const product = {
            name,
            price,
            description,
            image: URL.createObjectURL(image) // Create a URL for the image to be displayed
        };
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products)); // Save products to localStorage
        displayProducts(); // Update product list
        alert("Product added successfully!");
    } else {
        alert("Please fill in all product details.");
    }
}

// Function to display all products
function displayProducts() {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = ''; // Clear current products

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;
        productImage.style.width = '100px'; // Size the image
        productDiv.appendChild(productImage);

        const productName = document.createElement('h3');
        productName.textContent = product.name;
        productDiv.appendChild(productName);

        const productPrice = document.createElement('p');
        productPrice.textContent = `$${product.price}`;
        productDiv.appendChild(productPrice);

        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;
        productDiv.appendChild(productDescription);

        productsContainer.appendChild(productDiv);
    });
}

// Function to process payment (mock payment process)
function processPayment() {
    const customerName = document.getElementById('customerName').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const creditCardNumber = document.getElementById('creditCardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;

    if (customerName && customerAddress && creditCardNumber && expiryDate) {
        alert("Payment successful! Your purchase is on its way.");
        // Hide the Buy Section and reset it for future purchases
        document.getElementById('buySection').style.display = 'none';
        resetBuySection();
    } else {
        alert("Please fill in all payment details.");
    }
}

// Function to reset the buy section after a successful purchase
function resetBuySection() {
    document.getElementById('customerName').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('creditCardNumber').value = '';
    document.getElementById('expiryDate').value = '';
}

// Handle logout and clear the logged-in state
function logout() {
    loggedInUser = null;
    localStorage.removeItem('loggedInUser');
    document.getElementById('productSection').style.display = 'none';
    document.getElementById('authSection').style.display = 'block';
    alert('Logged out successfully!');
}

// Check if a user is already logged in when the page loads
window.onload = function () {
    const loggedInData = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInData) {
        loggedInUser = loggedInData;
        showProductSection();
    }
};
