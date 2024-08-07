import { TOKEN_SECRETO } from "../config.js";
import jwt from 'jsonwebtoken'

export function createAccessToken(payLoad){
    return new Promise((resolve, reject) => {
        jwt,sign(
            payLoad,
            TOKEN_SECRETO,
            {
                expiresIn: "1d",
            },
            (err,token) => {
                if(err) reject(err)
                resolve(token)
            }
        )
    })
}