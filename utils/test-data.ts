export const testData = {
    // Registration Users
    validUser: {
        firstname: 'John',
        lastname: 'Doe',
        password: 'ValidPass@123',
        confirmPassword: 'ValidPass@123'
    },

    existingUser: {
        login: 'reg56',
        firstname: 'Jane',
        lastname: 'Smith',  
        password: 'ValidPass@123',
        confirmPassword: 'ValidPass@123'
    },

    weakPasswordUser: {
        login: 'weakpassuser',
        firstname: 'Weak',
        lastname: 'Password',
        password: '1234',
        confirmPassword: '1234'
    },

    sqlInjection: {
        login: "test'; DROP TABLE users;--",
        firstname: 'SQL',
        lastname: 'Injection',
        password: 'Pass@123',
        confirmPassword: 'Pass@123'
    },

    invalidCharacters: {
        login: 'user!@#',
        firstname: 'Invalid',
        lastname: 'Chars',
        password: 'Pass@123',
        confirmPassword: 'Pass@123'
    },

    // Login Users
    loginValid: {
        login: 'TEST123',
        password: 'Test@1234'
    },

    loginInvalid: {
        login: 'newuser123',
        password: 'WrongPass@123'
    }
};
