import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let person
export default class UserOperationsDao
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

    static async addToWishList(user_id, item_id, item_name, item_image)
    {
        try {
            const filter = {_id : ObjectId(user_id)}
            const updateDoc = {
                $push: {
                    "wishlist": {
                        "item_id" : item_id,
                        "item_name": item_name,
                        "item_image": item_image
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

    static async deleteFromWishList(user_id, item_name)
    {
        try {
            const uid = ObjectId(user_id)
            const res = person.updateOne(
                {_id: ObjectId(uid)},
                {
                    $pull: {
                        wishlist : { item_name : item_name}
                    }
                }
                
            )
            return res
        } catch (error) {
            console.error(`Error updating user: ${error}`)
            return { error: error }
        }
    }

    static async showWishlist(id)
    {
        try{
            const uid = ObjectId(id)
            const query = { _id: uid}
            const options = {
                projection: {_id:0,wishlist:1}
            }
            const cursor = await person.find(query,options).toArray()
            return cursor
        }
        catch(err)
        {
            console.error(`Error updating user: ${error}`)
            return { error: error }
        }
    }
}