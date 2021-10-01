import http from "../http-common"

 class GroceryDataService{

    showProducts()
    {
        return  http.get(`/product`)
    }

    adminLoginCred(data)
    {
       return http.get(`/login?name=${data.name}&type=admin&password=${data.password}`)

    }

    userLoginCred(data)
    {
      return  http.get(`/login?name=${data.name}&type=user&password=${data.password}`)
    }

    showUserDetails()
    {
      return http.get('/user')
    }

    updateUser(data)
    {
      return http.put('/user',data)
    }

    deleteUser(id)
    {
      return http.delete(`/user?id=${id}`)
    }
    
    addUser(data)
    {
      return http.post('/user',data)
    }

    getProducts()
    {
      return http.get('/product')
    }

    addToWishlist(data)
    {
      return http.put('/operations',data)
    }

    addToCart(data)
    {
      return http.put('/cart',data)
    }

    showWishlist(id)
    {
      return http.get(`/operations?id=${id}`)
    }

    deleteFromWishlist(id,name)
    {
      return http.delete(`/operations?user_id=${id}&item_name=${name}`)
    }

    showCart(id)
    {
      return http.get(`/cart?uid=${id}`)
    }

    deleteFromCart(id,name)
    {
      return http.delete(`/cart?user_id=${id}&item_name=${name}`)
    }

    regsiterUser(data)
    {
      return http.post('/user',data)
    }

    deleteProduct(id)
    {
      return http.delete(`/product?id=${id}`)
    }

    updateProduct(data)
    {
      return http.put('/product',data)
    }

    addProduct(data)
    {
      return http.post('/product',data)
    }

}
export default new GroceryDataService()
