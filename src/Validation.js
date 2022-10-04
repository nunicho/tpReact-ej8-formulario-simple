import validator from 'validator';

/*
 * This class contains methods for validating fields using 'validator.js' library methods
 * The methods return error message if validation failed and false otherwise
 * You can use all supported validators and sanitizers of 'validator.js' libaray
 * See their docs here https://github.com/validatorjs/validator.js
 */

class ValidateFields {
  /*
   * A method that takes in the email
   * Validates it
   * Returns the response either error or false if there is no error
   */
  validateEmail(email) {
    if (validator.isEmpty(email)) {
      return 'Email is required';
    } else if (!validator.isEmail(email)) {
      return 'Invalid Email';
    }
    return false;
  }

  validateNombre(nombre) {
    if (validator.isEmpty(nombre)) {
      return 'Se requiere nombre';
    } else if (!validator.isLength(nombre, { min: 3 })) {
      return 'El nombre should be minimum 3 characters';
    }
    return false;
  }
    validateApellido(apellido) {
    if (validator.isEmpty(apellido)) {
      return 'Se requiere apellido';
    } else if (!validator.isLength(apellido, { min: 3 })) {
      return 'El apellido should be minimum 3 characters';
    }
    return false;
  }
      validateDNI(DNI) {
    if (validator.isEmpty(DNI)) {
      return 'Se requiere DNI';
    } else if (!validator.isLength(DNI, { min: 8, max: 8 })) {
      return 'El DNI debe contar con 8 caracteres. Anteponer el 0 de ser necesario.';
    }
    return false;
  }
}

const validateFields = new ValidateFields();

// export the class instance, so we can import and use it anywhere
export { validateFields };