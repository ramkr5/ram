// Data storage in local storage
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Show login form initially
function showLogin() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
}

// Show signup form
function showSignup() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
}

// Login functionality
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        loadProducts();
        loadCart();
        showProductContainer();
    } else {
        alert("Invalid credentials!");
    }
}

// Signup functionality
function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    if (users.find(u => u.username === username)) {
        alert("Username already exists!");
        return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Auto login after signup
    currentUser = newUser;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    loadProducts();
    loadCart();
    showProductContainer();
}

// Show product management container
function showProductContainer() {
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("products-container").style.display = "block";
    document.getElementById("cart-container").style.display = "none";
}

// Add product
function addProduct() {
    const name = document.getElementById("product-name").value;
    const description = document.getElementById("product-description").value;
    const price = document.getElementById("product-price").value;

    const newProduct = {
        id: Date.now(),
        name,
        description,
        price: parseFloat(price),
        seller: currentUser.username
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
}

// Load and display products
function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${product.name}</strong><br>
            ${product.description}<br>
            $${product.price}<br>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            ${product.seller === currentUser.username ? `<button onclick="deleteProduct(${product.id})">Delete</button>` : ""}
        `;
        productList.appendChild(li);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Load and display cart
function loadCart() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";

    cart.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${product.name}</strong><br>
            $${product.price}<br>
            <button onclick="removeFromCart(${product.id})">Remove</button>
        `;
        cartList.appendChild(li);
    });
}

// Delete product
function deleteProduct(productId) {
    products = products.filter(p => p.id !== productId);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
}

