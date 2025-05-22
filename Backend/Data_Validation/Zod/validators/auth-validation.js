import {z} from "zod";

const signupSchema = z.object({
    username: z.string({required_error: "Name is required"}).
    trim().
    min(3, {
        message: "Name must be at least more than 3 characters"
    }),

    email: z.string().email({required_error: "Email must be valid"}).trim()
})

const user = {
    username: "janirudd",
    email: "anirudh@gmail.com",
}

const result = signupSchema.safeParse(user);

if(result.success) {
    console.log("Validation is successful");
}

else {
    console.log("Validation not successful");
}