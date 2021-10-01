import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let person

export default class UserManagementDAO
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
        
        static async addUser(username, type, password) {
            try {
              const personDoc = { 
                  name : username,
                  type : type,
                  password : password,
                  wishlist: [],
                  cart: []
               }
        
              return await person.insertOne(personDoc)
            } catch (e) {
              console.error(`Error Adding user: ${e}`)
              return { error: e }
            }
          }

        static async updateUser(id,username,type,password)
          {
              try{
                  const filter = {_id: ObjectId(id)}
                  const updateDoc = { $set: {
                      name: username,
                      type: type,
                      password: password
                  }}
                  const updateResult = await person.updateOne(filter,updateDoc)
                  return updateResult
              }
              catch (e) {
                console.error(`Error updating user: ${e}`)
                return { error: e }
          }
    
    }

        static async deleteUser(id)
        {
            try {
                const query = {_id: ObjectId(id)};
                const res = await person.deleteOne(query)
                return res
            } catch (error) {
                console.error(`Error deleting user: ${error} `);
                return {error: error}
            }
        }

        static async displayUser()
        {
          try {
            const res = await person.find().toArray()
            return res
          } catch (error) {
              console.error(`Error deleting product: ${error} `);
              return {error: error}
          }
        }

        static async displayUserByCred(name, type,password){
          try {
            const query = {name: name , type: type, password:password};
            const res = person.findOne(query)
            return res
          } catch (error) {
            console.error(`Error deleting product: ${error} `);
              return {error: error}
          }
        }
}