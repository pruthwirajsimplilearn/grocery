import UserManagementDAO from "../dao/userManagementDAO.js"

export default class UserController {
    static async addUser(req, res, next) {
      try {
        const name = req.body.name
        const type = req.body.type
        const password = req.body.password

        const userResponse = await UserManagementDAO.addUser(
          name,
          type,
          password,
        )
        res.json({ status: "success" })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
    }

    static async updateUser(req,res,next) {
        try {
            const id = req.body.id
            const name = req.body.name
            const type = req.body.type
            const password = req.body.password

            const userResponse = await UserManagementDAO.updateUser(
                id,
                name,
                type,
                password,
              )

              var { error } = userResponse
                    if (error) {
                        res.status(400).json({ error })
                        }
              res.json({ status: "success" })
             // console.log("Modified "+userResponse.modifiedCount()+" records");

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async deleteUser(req,res,next)
    {
        try {
            const id = req.query.id
            const userResponse = await UserManagementDAO.deleteUser(id)
            res.json({status: "success"})
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async displayUser(req,res,next)
    {
      try{
      const userResponse = await UserManagementDAO.displayUser()
      res.json(userResponse)
      }
      catch(err)
      {
        res.status(500).json({ error: error.message })
      }
    }

    static async displayUserByCred(req,res,next)
    {
      try {
        const name = req.query.name;
        const type = req.query.type;
        const password = req.query.password;
        const userResponse = await UserManagementDAO.displayUserByCred(name,type,password)
        res.json(userResponse)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
    }
}