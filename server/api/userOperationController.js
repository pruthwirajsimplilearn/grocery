import UserOperationsDao from "../dao/userOperationsDAO.js";

export default class UserOperationsController
{
    static async addToWishList(req, res, next) {
        try {
          const user_id = req.body.user_id
          const item_id = req.body.item_id
          const item_name = req.body.item_name
          const item_image = req.body.item_image
  
          const userResponse = await UserOperationsDao.addToWishList(
            user_id,
            item_id,
            item_name,
            item_image
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

      static async deleteFromWishList(req,res,next)
      {
          try {
              const user_id = req.query.user_id
              const item_name = req.query.item_name
              const response = await UserOperationsDao.deleteFromWishList(user_id,item_name)
              res.json({status : "success"})
          } catch (error) {
          res.status(500).json({ error: error.message })
          }
      }

      static async showWishlist(req,res,next)
      {
        try {
          const uid = req.query.id
          const response = await UserOperationsDao.showWishlist(uid)
          res.json(response)
        } catch (error) {
          res.status(500).json({ error: error.message })
        }
      }
}