import User from './UserSchema.js';

class UsersController {

    async add(req, res) {
        try {
            const { dateOfBirthday, dateRegister, firstName, login, password, phone, secondName, sex, userActive } = req.body;
            const user = await User.create({ dateOfBirthday, dateRegister, firstName, login, password, phone, secondName, sex, userActive });
            res.json(user);
        } catch (e) {
            res.status(500).json(e);
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
            const { login } = req.params;
            if (!login) {
                res.status(400).json({ message: 'Login не указан' })
            }
            const user = await User.find({ login: `${login}` });
            return res.json(user);

        } catch {
            res.status(500).json(e);
        }
    }
    async update(req, res) {
        try {
            const user = req.body;
            const updateUser = await User.findOneAndUpdate(user._login, user);
            return res.json(updateUser);
        } catch {
            res.status(500).json(e);
        }
    }
    async delete(req, res) {
        try {
            const {login}  = req.params;
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