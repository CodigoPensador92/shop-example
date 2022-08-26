class ProductService {
    constructor(products = []) {
        this.products = products
      }


    getByIndex(index) {
        return this.products[index]
    }

    getById(id) {
        return this.products.find((product) => {
            return product.id === id
        })
    }
    
    filterBy(search = '') {
        if(!search.trim()) return this.products
    
        return this.products.filter((product) => {
            return product.title.toLowerCase().includes(search.toLowerCase())
        })
    }
}

