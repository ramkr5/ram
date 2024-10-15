document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');
    let cart = [];
    let total = 0;

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const item = this.parentElement;
            const itemName = item.querySelector('h2').innerText;
            const itemPrice = parseFloat(item.querySelector('.price').innerText.replace('$', ''));

            cart.push({ name: itemName, price: itemPrice });
            total += itemPrice;

            updateCart();
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(cartItem => {
            const li = document.createElement('li');
            li.innerText = `${cartItem.name} - $${cartItem.price.toFixed(2)}`;
            cartItemsContainer.appendChild(li);
        });
        cartTotalDisplay.innerText = total.toFixed(2);
    }
});
