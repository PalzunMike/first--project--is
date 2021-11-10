import User from '../models/UserSchema.js';
import {JWT_SECRET} from '../config.js';
import jwt from 'jsonwebtoken';

export const checkToken = async function (req, res, next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        if (!token){
            return res.status(401).json({ message: 'Пользователь не авторизирован' });
        }
        const userData = jwt.verify(token, JWT_SECRET);
        if (!userData){
            return res.status(401).json({ message: 'Необходимо авторизироваться снова' });
        }
        const user = await User.findById(userData.userId);

        if (user.hasToken !== token){
            return res.status(401).json({ message: 'Пользователь не авторизирован'});
        }         
        next();   
        
    }catch (e) {
        return res.status(400).json({message: `${e.message}`});
    }
}