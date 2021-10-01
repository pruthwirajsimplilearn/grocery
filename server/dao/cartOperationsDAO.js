import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let person
export default class CartOperationsDAO
{
    static async injectDB(conn)
    {
        if (person) {
            return
          }
          try {
            person = await conn.db(process.env.GROCERY_CART_NS).collection("person")
          } catch (e) {
            console.error(`Error: ${e}`)
          }
        }

    static async addToCart(user_id, item_id, item_name, item_image, item_price)
    {
        try {
            const filter = {_id : ObjectId(user_id)}
            const updateDoc = {
                $push: {
                    "cart": {
                        "item_id" : item_id,
                        "item_name": item_name,
                        "item_image": item_image,
                        "item_price": item_price
                    }
                }
            }
            const res = await person.updateOne(filter,updateDoc)
            //console.log(res.modifiedCount());
            return res
        } catch (error) {
            console.error(`Error updating user: ${error}`)
            return { error: error }
        }
    }

    static async deleteFromCart(user_id, item_name)
    {
        try {
            const uid = ObjectId(user_id)
            const res = person.updateOne(
                {_id: ObjectId(uid)},
                {
                    $pull: {
                        cart : { item_name : item_name}
                    }
                }
                
            )
            return res
        } catch (error) {
            console.error(`Error updating user: ${error}`)
            return { error: error }
        }
    }

    static async showCart(id)
    {
        try{
            const uid = ObjectId(id)
            const query = { _id: uid}
            const options = {
                projection: {_id:0,cart:1}
            }
            const cursor = await person.find(query,options).toArray()
            return cursor
        }
        catch(err)
        {
            console.error(`Error showing cart: ${err}`)
            return { error: err }
        }
    }
}