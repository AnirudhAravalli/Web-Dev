import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street: String,
    city: String
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: (a) => a % 2 === 0,
            message: (props) => `${props.value} is not an even number`
        }
    },  
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    createdAt: {
        immutable: true,
        type: Date,
        default: () => new Date().toLocaleString( ),
    },
    updatedAt: {
        type: Date,
        default: () => new Date().toLocaleString(),
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    hobbies: [String],
    address: addressSchema
});

// Creates a method that is individual to each instance of the model. 
// To use it first create an instance.
userSchema.methods.testFunction = function() {
    console.log(`Hi! My name is ${this.name}`)
}

// Creating a static function, it works on the entire model can be used using User.findByName()
userSchema.statics.findByName = function(name) {
    return this.find({ name: new RegExp(name, 'i') })
}

// Creating a query helper
userSchema.query.byName = function(name) {
    return this.where({ name: new RegExp(name, 'i') })
}

// Creating a virtual
userSchema.virtual("namedEmail").get(function() {
    return `${this.name}   < ${this.email} >`
})

userSchema.methods.nameAndEmail = function () {
    return `${this.name}  <${this.email}`
}

// Creating a middleware or a Hook
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    console.log("Updated the date of updation")
    throw new Error("Fail Save")
    // next()
})

userSchema.post('save', function(doc, next) {
    doc.testFunction()

    next()
})

export default mongoose.model("User", userSchema);
