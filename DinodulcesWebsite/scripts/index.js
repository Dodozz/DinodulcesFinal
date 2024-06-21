const btnCart = document.querySelector('.container-icon')
const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})

document.addEventListener("DOMContentLoaded", () => {
    const cart = {
      items: [],
      addItem(product) {
        const existingProduct = this.items.find(item => item.title === product.title);
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          this.items.push({ ...product, quantity: 1 });
        }
        this.updateCart();
      },
      removeItem(productTitle) {
        this.items = this.items.filter(item => item.title !== productTitle);
        this.updateCart();
      },
      updateCart() {
        const cartContainer = document.querySelector('.container-cart-products');
        const countProducts = document.getElementById('contador-productos');
        const totalPrice = document.querySelector('.total-pagar');
  
        cartContainer.innerHTML = '';
  
        let total = 0;
        let totalCount = 0;
  
        this.items.forEach(item => {
          total += item.price * item.quantity;
          totalCount += item.quantity;
  
          const cartProduct = document.createElement('div');
          cartProduct.classList.add('cart-product');
  
          cartProduct.innerHTML = `
            <div class="info-cart-product">
              <span class="cantidad-producto-carrito">${item.quantity}</span>
              <p class="titulo-producto-carrito">${item.title}</p>
              <span class="precio-producto-carrito">$${item.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          `;
  
          cartProduct.querySelector('.icon-close').addEventListener('click', () => {
            this.removeItem(item.title);
          });
  
          cartContainer.appendChild(cartProduct);
        });
  
        totalPrice.textContent = `$${total.toFixed(2)}`;
        countProducts.textContent = totalCount;
      }
    };
  
    document.querySelectorAll('.item').forEach(itemElement => {
      const title = itemElement.querySelector('h2').textContent;
      const price = parseFloat(itemElement.querySelector('.price').textContent.replace('$', ''));
  
      itemElement.querySelector('button').addEventListener('click', () => {
        cart.addItem({ title, price });
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');
    const contadorProductos = document.getElementById('contador-productos');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const cartDetails = document.getElementById('cart-details');
    let count = 0;
    let total = 0;

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const item = event.target.closest('.item');
            const price = parseFloat(item.querySelector('.price').dataset.price);
            const productName = item.querySelector('h2').textContent;
            
            count++;
            total += price;
            contadorProductos.textContent = count;
            totalPrice.textContent = `$${total}`;

            const cartItem = document.createElement('tr');
            cartItem.innerHTML = `
                <td>1</td>
                <td>${productName}</td>
                <td>$${price}</td>
                <td><button class="remove-item">X</button></td>
            `;
            cartItems.appendChild(cartItem);

            cartDetails.style.display = 'block';

            cartItem.querySelector('.remove-item').addEventListener('click', () => {
                cartItem.remove();
                count--;
                total -= price;
                contadorProductos.textContent = count;
                totalPrice.textContent = `$${total}`;
                if (count === 0) {
                    cartDetails.style.display = 'none';
                }
            });
        });
    });
});
