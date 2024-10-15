// food delivery.js

// Select the cart items and total elements
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
let total = 0;

// Function to add an item to the cart
function addToCart(itemName, itemPrice) {
    // Create a new list item for the cart
    const listItem = document.createElement('li');
    listItem.textContent = `${itemName} - ₹${itemPrice}`;
    
    // Append the new item to the cart
    cartItemsElement.appendChild(listItem);
    
    // Update the total
    total += itemPrice;
    cartTotalElement.textContent = total;
}

// Add event listeners to each "Add to Cart" button
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        // Get the item details
        const itemElement = button.parentElement;
        const itemName = itemElement.querySelector('h2').textContent;
        const itemPrice = parseInt(itemElement.querySelector('.price').textContent.replace('₹', ''), 10);
        
        // Add the item to the cart
        addToCart(itemName, itemPrice);
    });
});
