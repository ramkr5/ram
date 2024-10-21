let cart = []; // Array to hold cart items
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Function to add item to cart
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    updateCart();
}

// Function to update the cart display
function updateCart() {
    cartItemsElement.innerHTML = ''; // Clear current cart items
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItemsElement.appendChild(li);
        total += item.price;
    });

    cartTotalElement.textContent = total; // Update total price
}

// Handle "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const itemElement = button.parentElement; // Get parent element (item)
        const itemName = itemElement.querySelector('h2').textContent; // Get item name
        const itemPrice = parseInt(itemElement.querySelector('.price').textContent.replace('₹', '')); // Get item price
        addToCart(itemName, itemPrice); // Add item to cart
    });
});

// Handle checkout button
document.getElementById('checkout-button').addEventListener('click', () => {
    const name = document.getElementById('customer-name').value;
    const address = document.getElementById('customer-address').value;
    const phone = document.getElementById('customer-phone').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    if (!name || !address || !phone) {
        alert('Please fill in all customer details.');
        return;
    }

    // Simulate a checkout process (you can implement actual payment processing logic here)
    alert(`Thank you for your order, ${name}!\nYour total is ₹${cart.reduce((sum, item) => sum + item.price, 0)}\nPayment Method: ${paymentMethod}\nWe will deliver to: ${address}`);
    
    // Clear cart and customer details
    cart = [];
    updateCart();
    document.getElementById('customer-details-form').reset();
    document.getElementById('payment-method').value = 'Card'; // Reset to default payment method
});
