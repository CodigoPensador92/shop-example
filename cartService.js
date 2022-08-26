/**
 * Add Product
 * Remove product
 * Clear cart
 * Get all information
 */
 /*
 
     {
         12: {
             title: 'Apple',
             price: 42,
             amount: 2
         },
         12: {
             title: 'Banana',
             price: 142,
             amount: 1
         }
     }
 */ 
 class CartService {
    constructor() {
        this.cart = {}
    }

    addToCart(product) {
        const key = product.id
        if(this.cart[key]){
            this.cart[key].amount++
            return
        }
        this.cart[key] = {
            title: product.title,
            price: product.price,
            amount: 1
        }
    }

    removeFromCart(productId) {
        const amount = this.cart[productId].amount
        if(amount === 1) {
            delete this.cart[productId]
        } else {
            this.cart[productId].amount--
        }
    }

    clearCart() {
        this.cart = {}
    }

    getCartInfo() {
 
        const items = Object.keys(this.cart).map(id => {
            return {
                id,
                // title: this.cart[id].title,
                // amount: this.cart[id].amount,
                // price: this.cart[id].price,
                ...this.cart[id]
            }
        })
    
        const totalPrice = items.reduce((sum, product)=>{
            return sum+= product.amount * product.price
        },0)
    
        return {
            items, totalPrice
        }
    }
 }
