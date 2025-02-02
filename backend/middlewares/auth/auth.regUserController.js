

export const registerUser = async (request, response) => {
    try {
        const { name, birthdate, email, password, address, role } = request.body;

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // create user
        const newUser = new User({
            name,
            birthdate,
            email,
            password: hashedPassword,
            address,
            role,
            ...(role === "user" && {address}) // add address if role is user

        })
        
        await newUser.save();// save user to database
        response.status(201).json(newUser);

    } catch (error) {
        response.status(500).json({ message: 'Error registering user' });
    }
}
