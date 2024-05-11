import UsersModel from "../models/UserModel.js"
import bcrypt from "bcrypt"
import mysql from "mysql2"

const saltRounds = 10;

//Mostrar todos los registros
export const getAllUsers = async (req, res) => {
    try {
        const users = await UsersModel.findAll()
        res.json(users)
    } catch (error) {
        res.json({ message: error.message })
    }
}
//login
export const getUser = async (req, res) => {
    var correo = req.params.correo;
    var password = req.params.password;
    try {
        const pool = mysql.createPool({
            connectionLimit: 1,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'my_db'
        })
        pool.query('SELECT * FROM `users` WHERE correo = ?', correo, async (error, results, fields) => {
            if (error) {
                res.send({
                    "code": 400,
                    "failed": "error occurred",
                    "error": error
                })
            } else {
                if (results.length > 0) {
                    const comparison = await bcrypt.compare(password, results[0].password)
                    if (comparison) {
                        res.send({
                            "code": 200,
                            "success": "login successful",
                            "id": results[0].id,
                            "correo": results[0].correo,
                        })
                    } else {
                        res.send({
                            "code": 204,
                            "error": "El correo o la contraseña es incorrecto"
                        })
                    }
                } else {
                    res.send({
                        "code": 206,
                        "error": "El correo no esta registrado"
                    });
                }
            }
        });
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Crear un registro
export const createUser = async (req, res) => {
    try {
        const password = req.body.password;
        const encryptedPassword = await bcrypt.hash(password, saltRounds)

        let user = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            fecha_nacimiento: req.body.fecha_nacimiento,
            sexo: req.body.sexo,
            correo: req.body.correo,
            password: encryptedPassword
        }

        await UsersModel.create(user)
        res.json({
            "message": "¡Registro creado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Actualizar un registro
export const updateUser = async (req, res) => {
    try {
        await UsersModel.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({
            "message": "¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Eliminar un registro
export const deleteUser = async (req, res) => {
    try {
        await UsersModel.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message": "¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}