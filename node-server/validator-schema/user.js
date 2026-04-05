import zodValidator, { number } from 'zod';

const userObject = {
    username: zodValidator.string({
        invalid_type_error: 'Username must be a string',
        required_error: 'Username is required.'
    }),
    password: zodValidator.string(
        {
        invalid_type_error: 'Password must be a string',
        required_error: 'Password is required.'
    }
    ),
    bestScoreAchived: zodValidator.number().int().min(0).max(1499)
}

const userSchema = zodValidator.object(userObject);

export function validateUser(input){
    return userSchema.safeParse(input);
}

export function validatePartialUser(input){
    return userSchema.partial().safeParse(input);
}