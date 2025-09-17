import { faker as fakerEN } from '@faker-js/faker';

export function getRandomValidUser(): {
    login: string;
    firstname: string;
    lastname: string;
    password: string;
    confirmPassword: string;
} {
    const password = fakerEN.internet.password({ length: 10 });

    return {
        login: fakerEN.internet.username(),
        firstname: fakerEN.person.firstName(),
        lastname: fakerEN.person.lastName(),
        password: password,
        confirmPassword: password,
    };
}
