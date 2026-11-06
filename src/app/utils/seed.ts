import bcrypt from "bcryptjs"
import { Role } from "../../generated/prisma/enums"
import { prisma } from "../lib/prisma"
import config from "../config"

export const seedSuperAdmin = async () => {
   try {
      const isSuperAdminExist =await prisma.user.findFirst({
         where:{
            role:Role.SUPER_ADMIN
         }
      })
      if(isSuperAdminExist){
         console.log("Super Admin already exists")
         return;
      }

      const name =config.super_admin_name
      const email =config.super_admin_email
      const password =config.super_admin_password

      if(!name || !email || !password){
         console.log("Super Admin credentials are not set in the environment variables")
         return;
      }

      const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS))
      const superAdmin = await prisma.user.create({
         data:{
            name,
            email,
            password:hashedPassword,
            role:Role.SUPER_ADMIN,
            needPasswordChange:false,
            emailVerified:true
         }
      })
      console.log("Super Admin created:",superAdmin)
   } catch (error) {
      console.log("Error creating super admin:", error)
      await prisma.user.delete({
         where:{
            email:config.super_admin_email
         }
      })
   }
}

//create tester admin

//create tester doctor