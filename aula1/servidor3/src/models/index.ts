import mongoose, { Schema } from "mongoose";

const PeopleSchema = new Schema({
    name: {
        type: String,
        maxLength: 30,
        required: true
    }
});

const People = mongoose.model("People", PeopleSchema);

const PhoneSchema = new Schema({
    people: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "People",
        required: true,
        validate: {
            validator: async function (id: string) {
                const people = await People.findById(id);
                return !!people;
            },
            message: 'A pessoa fornecida não existe',
        }
    },
    number: {
        type: String,
        required: [true, "O valor é obrigatório"],
        match: /^[0-9]{11}$/
    },
});

const Phone = mongoose.model("Phones", PhoneSchema);

const CarSchema = new Schema({
    model: {
        type: String,
        maxLength: 15,
        required: true
    }
});

const Car = mongoose.model("Cars", CarSchema);

const Car_by_PersonSchema = new Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true,
        validate: {
            validator: async function (id: string) {
                const car = await Car.findById(id);
                return !!car;
            },
            message: 'O carro fornecido não existe',
        }
    },
    people: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "People",
        required: true,
        validate: {
            validator: async function (id: string) {
                const people = await People.findById(id);
                return !!people;
            },
            message: 'O usuário fornecido não existe',
        }
    }
});

const Car_by_Person = mongoose.model("Cars_by_Person", Car_by_PersonSchema);

export { People, Phone, Car, Car_by_Person };