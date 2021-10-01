import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import UserManagementDAO from "./dao/userManagementDAO.js"
import ProductManagementDAO from "./dao/productManagementDAO.js"
import UserOperationsDao from "./dao/userOperationsDAO.js"
import CartOperationsDAO from "./dao/cartOperationsDAO.js"


dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
  process.env.GROCERY_CART_DB_URI,{}
  )
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
      await UserManagementDAO.injectDB(client);
      await ProductManagementDAO.injectDB(client);
      await UserOperationsDao.injectDB(client);
      await CartOperationsDAO.injectDB(client);
      app.listen(port, () => {
          console.log(`Listening on port ${port}`);
      })
  })