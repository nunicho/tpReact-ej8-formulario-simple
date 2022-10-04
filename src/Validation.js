import validator from 'validator';


class ValidateFields {

  validateEmail(email) {
    const regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (validator.isEmpty(email)) {
      return 'Se requiere un email';
    } else if (!regexMail.test(email)) {
      return 'Email inválido';
    }
    return false;
  }

  validateNombre(nombre) {
    const regexNombre=  /^[a-zA-Z ]+$/
    if (validator.isEmpty(nombre)) {
      return 'Se requiere nombre';
    } else if (!regexNombre.test(nombre)){
      return 'El nombre ingresado es incorrecto';
    }
    return false;
  }
    validateApellido(apellido) {
    const regexApellido=  /^[a-zA-Z ]+$/
    if (validator.isEmpty(apellido)) {
      return 'Se requiere apellido';
    } else if (!regexApellido.test(apellido)){
      return 'El apellido ingresado es incorrecto';
    }
    return false;
  }
      validateDNI(DNI) {
        const regexDNI = /^\d{8}(?:[-\s]\d{4})?$/
    if (validator.isEmpty(DNI)) {
      return 'Se requiere DNI';
    }  else if(!regexDNI.test(DNI)) {
      return 'El DNI debe contar con 8 caracteres. Anteponer el 0 de ser necesario.';
    }
    return false;
  }
}

const validateFields = new ValidateFields();


export { validateFields };