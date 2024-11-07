import pool from "../db/db";
import mesaje from "../mes/res";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { config } from "dotenv";
import { token } from "morgan";
config();
const Register = async(req, res)=>{
    const name = req.body.name;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;
    const paswordsin = req.body.pasword;
    const idrole = req.body.idrole;

// "${name}","${lastname}","${age}","${phone}","${email}","${pasword}","${idrole}"
    try {
        const salt = await bcrypt.genSalt(5);
        const hashpasword = await bcrypt.hash(paswordsin, salt);
        const pasword = hashpasword;
        
        const result= await pool.query(`CALL SP_REGISTER(?,?,?,?,?,?,?);`,[name, lastname, age, phone, email, pasword, idrole]);
                if(result[0].affectedRows == 1){
                    mesaje.success(req, res, 201, "User Register")
                }else{
                    mesaje.error(req, res, 401,"Error Register")
                }
    } catch (error) {
        mesaje.error(req, res,500, "Error Connection", error);
    }

}

const viewRegister = async(req,res)=>{
    try {
        const result = await pool.query(`CALL SP_VIEW_REGISTER()`)
        mesaje.success(req, res, 200, result[0])
    } catch (error) {
        mesaje.error(req, res, 500, "Error Connection", error);
    }

}

const loginUser = async(req, res)=>{
    const {email, pasword}= req.body;

    try {
        const result = await pool.query(`CALL SP_LOGIN(?);`, [email]);
        if(result[0][0][0].length===0){
            res.error(req, res, 401, "User Denied")
            return;
        }
        // compare password


        const comparePasword = await bcrypt.compare(pasword, result[0][0][0].pasword);
        if(!comparePasword){
            res.error(req, res, 401, "Email or Password Incorrect")
            return;
        }else{
            const payload ={
                iduser: result[0][0][0].iduser,
                name: result[0][0][0].name,
                lastname: result[0][0][0].lastname,
                email: result[0][0][0].email,
                idrole: result[0][0][0].idrole
            }
            const token = jwt.sign(payload,
                process.env.PRIVATE_KEY,
                {expiresIn: process.env.EXPIRES_IN
            })
            // .cookie('access_token', token{
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production'

            // })
            mesaje.success(req, res, 201, {token})
        }
    } catch (error) {
        mesaje.error(req, res, 500, "Login Incorrect")
    }
}

export const metodo={
    Register,
    viewRegister,
    loginUser

}