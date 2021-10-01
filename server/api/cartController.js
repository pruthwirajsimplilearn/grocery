import CartOperationsDAO from "../dao/cartOperationsDAO.js"

export default class CartOperationsController
{
    static async addToCart(req, res, next) {
        try {
          const user_id = req.body.user_id
          const item_id = req.body.item_id
          const item_name = req.body.item_name
          const item_image = req.body.item_image
          const item_price = req.body.item_price
  
          const userResponse = await CartOperationsDAO.addToCart(
            user_id,
            item_id,
            item_name,
            item_image,
            item_price
          )
        //   if(userResponse.modifiedCount() === 0)
        //   {
        //       throw new Error("Not Updated")
        //   }
          res.json({ status: "success" })
        } catch (e) {
          res.status(500).json({ error: e.message })
        }
      }

      static async deleteFromCart(req,res,next)
      {
          try {
              const user_id = req.query.user_id
              const item_name = req.query.item_name
              const response = await CartOperationsDAO.deleteFromCart(user_id,item_name)
              res.json({status : "success"})
          } catch (error) {
          res.status(500).json({ error: error.message })
          }
      }

      static async showCart(req,res,next)
      {
        try {
          const uid = req.query.uid
          const response = await CartOperationsDAO.showCart(uid)
          res.json(response)
        } catch (error) {
          res.status(500).json({ error: error.message })
        }
      }
}