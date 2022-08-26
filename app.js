let productService 
const cartService = new CartService()
const htmlService = new HTMLService()

const productsContainer = document.getElementById('products')
const filterInput = document.getElementById('filter')
const cartContainer = document.getElementById('cart')

filterInput.addEventListener('input', event => {
    const value = event.target.value
    
    const filteredProducts = productService.filterBy(value)
   
    renderProducts(filteredProducts)
})

productsContainer.addEventListener('click', event => {
    
    const id = event.target.dataset.id 
    ? event.target.dataset.id 
    : event.target.closest('li')?.dataset.id


    if(id) {
        cartService.addToCart(
            productService.getById(+id)
        )
        renderCart()
    }
})

cartContainer.addEventListener('click', event => {
    const type = event.target?.dataset.type
    const id = event.target?.dataset.id
    switch(type) {
        case 'clear':
            cartService.clearCart()
            renderCart()
            break
        case 'remove':
            cartService.removeFromCart(id)
            renderCart()
            break
    }
})

function renderProducts(products){
    productsContainer.innerHTML = htmlService.paintProducts(products)
}

function renderCart() {
    cartContainer.innerHTML = htmlService.paintCart(cartService.getCartInfo())
}

async function startApp(){
    renderCart()
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      const data = await response.json()
  
      productService = new ProductService(data)
  
      renderProducts(productService.products)
    } catch (e) {
      productsContainer.innerHTML = htmlService.paintError(e)
    }
  }

startApp()