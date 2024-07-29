require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
});

const app = express();
app.use(bodyParser.json());

const User = sequelize.define('User', {
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    mobile_number: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: true, defaultValue: "agent" },
    personel_no: {
        type: DataTypes.STRING, allowNull: false, defaultValue: `${Math.random().toString(36).substr(2, 9)}`
    },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
});


const Agent = sequelize.define('Agent', {
    status: { type: DataTypes.STRING, allowNull: true },
    category: { type: DataTypes.STRING, allowNull: true },
    agent_no: {
        type: DataTypes.STRING, allowNull: false, defaultValue: `${Math.random().toString(36).substr(2, 9)}`
    },

});



User.hasOne(Agent);
Agent.belongsTo(User);



const Task = sequelize.define('Task', {
    status: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    report_title: { type: DataTypes.STRING, allowNull: false },
    case_no: {
        type: DataTypes.STRING, allowNull: false, defaultValue: `${Math.random().toString(36).substr(2, 9)}`
    },
    assigned_on: { type: DataTypes.STRING, allowNull: true }
});


Agent.hasMany(Task);
Task.belongsTo(Agent);

// Sync all models that aren't already in the database
sequelize.sync();

// Middleware to verify token
const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required.');

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.API_SECRET);
        const user_id = decoded.id


        const user = await User.findByPk(user_id);
        if (user === null) {
            res.status(401).send('Invalid token.');
        } else {
            req.userId = user_id;
            req.user = user;
            next();
        }


    } catch (err) {
        res.status(401).send('Invalid token.');
    }
};

const verifyAdmin = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required.');

    if (req.user.role === "admin") {
        next();
    } else {
        res.status(401).send('Invalid token.');

    }
};

// Signup route
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mobile_number: req.body.mobile_number,
            role: req.body.role,
            email: req.body.email,
            password: hashedPassword
        });

        if (user.role == "agent") {
            Agent.create({
                userId: user.id,
                status: "available"
            })
        }
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: 'Invalid Password!' });
        }

        const token = jwt.sign({ id: user.id }, process.env.API_SECRET, { expiresIn: 86400 });
        res.status(200).send({

            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                mobile_number: user.mobile_number,
                role: user.role,
                personel_id: user.personel_id
            },
            message: "Login successful",
            accessToken: token
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Protected route
app.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, { attributes: { exclude: ['password'] } });
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});


// Protected route
app.get('/admin/users', verifyToken, verifyAdmin, async (req, res) => {
    try {
        // Initialize the where object
        const where = {};

        // Conditionally add status filter
        if (req.query.email) {
            where.email = req.query.email;
        }

        if (req.query.first_name) {
            where.first_name = req.query.first_name;
        }

        if (req.query.last_name) {
            where.last_name = req.query.last_name;
        }

        if (req.query.mobile_number) {
            where.mobile_number = req.query.mobile_number;
        }
        if (req.query.role) {
            where.role = req.query.role;
        }

        const users = await User.findAll({
            where: where,
            attributes: ['id', 'first_name', 'last_name', 'email', 'mobile_number', 'role']
        });

        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});


app.get('/admin/agents', verifyToken, verifyAdmin, async (req, res) => {
    try {
        // Initialize the where object
        const where = {};

        // Conditionally add status filter
        if (req.query.status) {
            where.status = req.query.status;
        }
        if (req.query.category) {
            where.category = req.query.category;
        }
        if (req.query.agent_no) {
            where.agent_no = req.query.agent_no;
        }

        const users = await Agent.findAll({
            where: where,
            attributes: ['status', 'category', 'agent_no', 'id'],
            include: [{
                model: User,
                attributes: ['id', 'first_name', 'last_name', 'email', 'mobile_number']
            }]
        });

        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.get('/admin/agents/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const agentId = req.params.id;

        // Fetch the agent by primary key and include the associated user
        const agent = await Agent.findByPk(agentId, {
            include: [{
                model: User,
                attributes: ['id', 'first_name', 'last_name', 'email', 'mobile_number'] // Select specific user attributes
            }]
        });

        if (!agent) {
            return res.status(404).send({ message: 'Agent not found.' });
        }

        res.status(200).send(agent);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});


app.get('/admin/tasks', verifyToken, verifyAdmin, async (req, res) => {
    try {
        // Initialize the where object
        const where = {};

        // Conditionally add status filter
        if (req.query.status) {
            where.status = req.query.status;
        }
        if (req.query.category) {
            where.category = req.query.category;
        }

        if (req.query.report_title) {
            where.report_title = req.query.report_title;
        }

        if (req.query.case_no) {
            where.case_no = req.query.case_no;
        }

        const users = await Task.findAll({
            where: where,
            attributes: ['status', 'category', 'report_title', 'case_no', 'assigned_on'],
            include: [{
                model: Agent,
                attributes: ['status', 'category', 'agent_no', 'id']
            }]
        });

        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.get('/admin/tasks/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const agentId = req.params.id;

        // Fetch the agent by primary key and include the associated user
        const agent = await Task.findByPk(agentId, {
            include: [{
                model: Agent,
                attributes: ['status', 'category', 'agent_no', 'id'], // Select specific user attributes,
                include: [{
                    model: User,
                    attributes: ['id', 'first_name', 'last_name', 'email', 'mobile_number'] // Select specific user attributes
                }]
            }]
        });

        if (!agent) {
            return res.status(404).send({ message: 'Agent not found.' });
        }

        res.status(200).send(agent);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
