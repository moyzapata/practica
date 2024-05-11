export function validation(values) {
    return new Promise((resolve, reject) => {
        if (isEmpty(values.get('firstName'))) {
            resolve([false, 'Nombre'])
        }
        if (isEmpty(values.get('lastName'))) {
            resolve([false, 'Apellidos'])
        }
        if (isEmpty(values.get('date'))) {
            resolve([false, 'Fecha de nacimiento'])
        }
        if (isEmpty(values.get('sexo'))) {
            resolve([false, 'Sexo'])
        }
        if (validateEmail(values.get('email'))) {
            resolve([false, 'Correo'])
        }
        if (validatePassword(values.get('password'))) {
            resolve([false, 'Password'])
        }
        if (values.get('password') !== values.get('passwordC')) {
            resolve([false, 'PasswordC'])
        } else {
            resolve([true, ""])
        }
    })
}

export function validationLogin(data) {
    return new Promise((resolve, reject) => {
        if (validateEmail(data.get('email'))) {
            resolve([false, 'correo'])
        }
        if (isEmpty(data.get('password'))) {
            resolve([false, 'password'])
        } else {
            resolve([true, ""])
        }
    })
}

function isEmpty(str) {
    return !str || str.length === 0;
}

function validateEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (emailRegex.test(email)) {
        return false
    } else {
        return true
    }
}

function validatePassword(pass) {
    return pass.length < 6;
}