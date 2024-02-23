import express from "express";
import dotenv from "dotenv"
import routes from "./routes";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, function () {
    console.log(`Rodando na porta ${PORT}`)
});

app.use(routes);

/*
const { Schema } = mongoose;

const UserSchema = new Schema({
    mail: { type: String, maxLength: 50, required: true },
    password: { type: String, minlength: 6, maxlength: 10, select: false, required: true }
});

const User = mongoose.model("User", UserSchema);

const SpentSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, maxlength: 30, required: true },
    value: { type: Number, required: true }
});

const Spent = mongoose.model("Spent", SpentSchema);

const doc = new User({ mail: 'a@teste.com', password: 'abcdef' });
const resp = await doc.save();*/