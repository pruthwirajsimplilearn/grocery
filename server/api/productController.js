import ProductManagementDAO from "../dao/productManagementDAO.js"

export default class ProductController {
    static async addProduct(req, res, next) {
      try {
        const title = req.body.title
        const type = req.body.type
        const description = req.body.description
        const filename = req.body.filename
        const height = req.body.height
        const width = req.body.width
        const price = req.body.price
        const rating = req.body.rating

        const productResponse = await ProductManagementDAO.addProduct(
         title,type,description,filename,height,width,price,rating
        )
        res.json({ productResponse })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
    }

    static async updateProduct(req,res,next) {
        try {
            const id = req.body.id
            const title = req.body.title
            const type = req.body.type
            const description = req.body.description
            const filename = req.body.filename
            const height = req.body.height
            const width = req.body.width
            const price = req.body.price
            const rating = req.body.rating

            const productResponse = await ProductManagementDAO.updateProduct(
                id,title,type,description,filename,height,width,price,rating
              )

            //   var { error } = productResponse
            //         if (error) {
            //             res.status(400).json({ error })
            //             }
              res.json({ productResponse })

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async deleteProduct(req,res,next)
    {
        try {
            const id = req.query.id
            const productResponse = await ProductManagementDAO.deleteProduct(id)
            res.json({status: "success"})
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async showProducts(req,res,next)
    {
      try{
      const productResponse = await ProductManagementDAO.showProducts()
      res.json(productResponse)
      }
      catch(err)
      {
        res.status(500).json({ error: error.message })
      }
    }
}