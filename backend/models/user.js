var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */



var userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "first_name not provided "],
    },
    last_name: {
        type: String,
        required: [true, "first_name not provided "],
    },
    mobile_number: {
        type: String,
        required: [true, "mobile number not provided "], validate: {
            validator: function (v) {
                return /^\+254[17]\d{8}$/.test(v);
            },
            message: '{VALUE} is not a valid mobile number!'
        }
    },
    email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    role: {
        type: String,
        enum: ["agent", "admin"],
        required: [true, "Please specify user role"]
    },
    password: {
        type: String,
        required: true
    },
    personel_id: {
        type: String,
        default: () => `user_${Math.random().toString(36).substr(2, 9)}`
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);