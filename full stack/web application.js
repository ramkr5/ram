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
    const imageUrl = document.getElementById("product-image").value; // Image URL from input

    const newProduct = {
        id: Date.now(),
        name,
        description,
        price: parseFloat(price),
        seller: currentUser.username,
        image: imageUrl // Save image URL
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
            <img src="${product.image}" alt="${product.name}" width="100" /><br> <!-- Product image -->
            <strong>${product.name}</strong><br>
            ${product.description}<br>
            $${product.price}<br>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            ${product.seller === currentUser.username ? `<button onclick="deleteProduct(${product.id})">Delete</button>` : ""}
            <button onclick="buyNow(${product.id})">Buy Now</button> <!-- Buy Now button -->
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
    const customerDetailsContainer = document.getElementById("customer-details");
    cartList.innerHTML = "";

    cart.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${product.name}</strong><br>
            $${product.price}<br>
            <button onclick="removeFromCart(${product.id})">Remove</button> <!-- Remove from cart -->
        `;
        cartList.appendChild(li);
    });

    // Display customer details form
    customerDetailsContainer.style.display = "block";
}

// Delete product from products list
function deleteProduct(productId) {
    products = products.filter(p => p.id !== productId);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
}

// Handle "Buy Now" functionality
function buyNow(productId) {
    const product = products.find(p => p.id === productId);

    // This is a simple alert; you can replace it with a checkout process or payment system.
    alert(`Proceeding to checkout for: ${product.name} - $${product.price}`);
}

// Checkout functionality
function checkout() {
    const name = document.getElementById("customer-name").value;
    const email = document.getElementById("customer-email").value;
    const address = document.getElementById("customer-address").value;

    if (!name || !email || !address) {
        alert("Please fill out all customer details.");
        return;
    }

    // Payment method simulation (in real case, integrate with payment gateway)
    const paymentMethod = document.getElementById("payment-method").value;
    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }

    // Simulate successful payment
    alert(`Payment successful! Thank you for your purchase, ${name}. We will ship to: ${address}.`);

    // Clear cart after successful checkout
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
