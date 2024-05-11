import db from "../database/db.js"
import { DataTypes } from "sequelize"

 const UsersModel = db.define('users', {
     nombre: { type: DataTypes.STRING },
     apellidos: { type: DataTypes.STRING },
     fecha_nacimiento: { type: DataTypes.DATE },
     sexo: { type: DataTypes.STRING },
     correo: { type: DataTypes.STRING },
     password: { type: DataTypes.STRING }
 })

 export default UsersModel