import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide your name']
        },
        targetName: {
            type: String,
            required: [true, 'Please provide target name']
        },
        moneyAmmount: {
            type: Number,
            required: [true, 'Please provide money ammount']
        },
        txnNumber: {
            type: String,
            required: [true, 'Please provide transaction number'],
            unique: true
        },
        mobileNumber: {
            type: String,
            required: [true, 'Please provide mobile number'],
            unique: true
        }
    },
    { timestamps: true }
);

const Registration =
    mongoose.models.Registration ||
    mongoose.model('Registration', registrationSchema);

export default Registration;
