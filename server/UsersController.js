import User from './UserSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UsersController {

    async register(req, res) {
        try {
            const { dateOfBirthday, dateRegister, firstName, login, password, phone, secondName, sex, userActive } = req.body;

            const candidate = await User.findOne({ login });
            if (candidate) {
                return res.status(400).json({ message: 'Пользователь с данным логином уже зарегистрирован' });
            }
            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await User.create({ dateOfBirthday, dateRegister, firstName, login, password: hashedPassword, phone, secondName, sex, userActive });
            await user.save();

            res.status(201).json({ user });

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не там. Попробуйте снова' });
        }
    }

    async auth(req, res) {
        try {
            const { login, password } = req.body;

            const user = await User.findOne({ login });
            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }
            const isMatchPass = await bcrypt.compare(password, user.password);

            if (!isMatchPass){
                return res.status(400).json({message:'Неверный пароль. Попробуйте снова'})
            }

            const token = jwt.sign(
                {userId: user.id},
                'secret string issoft',
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id});

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не там. Попробуйте снова' });
        }
    }

    async getAll(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch {
            res.status(500).json(e);
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'ID не указан' })
            }
            const user = await User.findById(id);
            return res.json(user);

        } catch {
            res.status(500).json(e);
        }
    }
    async update(req, res) {
        try {
            const user = req.body;
            const updateUser = await User.findOneAndUpdate(user.login, user);
            return res.json(updateUser);
        } catch {
            res.status(500).json(e);
        }
    }
    async delete(req, res) {
        try {
            const { login } = req.params;
            // if (!login) {
            //     res.status(400).json({ message: 'Login не указан' })
            // }
            const user = await User.findOneAndDelete({ login: `${login}` });
            return res.json(user);

        } catch {
            res.status(500).json(e);
        }
    }
}

export default new UsersController();