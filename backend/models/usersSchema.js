import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        housenumber: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        barangay: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
            },
    }
)


const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        middlename: {
            type: String,
            required: false
        },
        lastname: {
            type: String,
            required: true
        },
        birthdate: {
            type: Date,
            required:  function() {
                return this.role === 'user' && 'employee'; // for user and employee
            }
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['admin', 'employee', 'user'], // type ng roles
            required: true
        },
        address: {
            type: addressSchema,
            required: function () {
                return this.role === 'user'; // for normal user lang yung address
            }
        },
        designation: {
            type: String,
            required: function () {
                return this.role === 'employee'; // for employee lang yung designation
            }
        }
    }, { timestamps: true }
);

export default mongoose.model("User", userSchema)

