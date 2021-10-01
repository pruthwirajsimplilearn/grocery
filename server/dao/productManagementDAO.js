import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let product

export default class ProductManagementDAO
{
    static async injectDB(conn)
    {
        if (product) {
            return
          }
          try {
            product = await conn.db(process.env.GROCERY_CART_NS).collection("products")
          } catch (e) {
            console.error(`Error: ${e}`)
          }
        }
        
        static async addProduct(title, type, description,filename, height,width,price,rating) {
            try {
              const productDoc = { 
                  title : title,
                  type : type,
                  description : description,
                  filename: filename,
                  height: height,
                  width: width,
                  price: price,
                  rating: rating
               }
        
              return await product.insertOne(productDoc)
            } catch (e) {
              console.error(`Error Adding product: ${e}`)
              return { error: e }
            }
          }

        static async updateProduct(id,title, type, description,filename, height,width,price,rating)
          {
              try{
                  const filter = {_id: ObjectId(id)}
                  const updateDoc = { $set: {
                    title : title,
                    type : type,
                    description : description,
                    filename: filename,
                    height: height,
                    width: width,
                    price: price,
                    rating: rating
                  }}
                  const updateResult = await product.updateOne(filter,updateDoc)
                  return updateResult
              }
              catch (e) {
                console.error(`Error updating product: ${e}`)
                return { error: e }
          }
    
    }

        static async deleteProduct(id)
        {
            try {
                const query = {_id: ObjectId(id)};
                const res = await product.deleteOne(query)
                return res
            } catch (error) {
                console.error(`Error deleting product: ${error} `);
                return {error: error}
            }
        }

        static async showProducts()
        {
          try {
            const res = await product.find().toArray()
            return res
          } catch (error) {
              console.error(`Error deleting product: ${error} `);
              return {error: error}
          }
        }

}