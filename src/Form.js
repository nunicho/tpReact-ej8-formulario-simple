import React, { Component } from 'react';
import { validateFields } from './Validation';
import classnames from 'classnames';

const initialState = {
  email: {
    value: '',
    validateOnChange: false,
    error: ''
  },
    nombre: {
    value: '',
    validateOnChange: false,
    error: ''
    
  },
    apellido: {
    value: '',
    validateOnChange: false,
    error: ''
    
  },
    DNI: {
    value: '',
    validateOnChange: false,
    error: ''
    
  },
  submitCalled: false,
  allFieldsValidated: false
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  /*
   * validates the field onBlur if sumbit button is not clicked
   * set the validateOnChange to true for that field
   * check for error
   */
  handleBlur(validationFunc, evt) {
    const field = evt.target.name;
    // validate onBlur only when validateOnChange for that field is false
    // because if validateOnChange is already true there is no need to validate onBlur
    if (
      this.state[field]['validateOnChange'] === false &&
      this.state.submitCalled === false
    ) {
      this.setState(state => ({
        [field]: {
          ...state[field],
          validateOnChange: true,
          error: validationFunc(state[field].value)
        }
      }));
    }
    return;
  }

  /*
   * update the value in state for that field
   * check for error if validateOnChange is true
   */
  handleChange(validationFunc, evt) {
    const field = evt.target.name;
    const fieldVal = evt.target.value;
    this.setState(state => ({
      [field]: {
        ...state[field],
        value: fieldVal,
        error: state[field]['validateOnChange'] ? validationFunc(fieldVal) : ''
      }
    }));
  }

  /*
   * validate all fields
   * check if all fields are valid if yes then submit the Form
   * otherwise set errors for the feilds in the state
   */
  handleSubmit(evt) {
    evt.preventDefault();
    // validate all fields
    const { email, nombre, apellido, DNI } = this.state;
    const emailError = validateFields.validateEmail(email.value);
    const nombreError = validateFields.validateNombre(nombre.value);
    const apellidoError = validateFields.validateApellido(apellido.value);
    const DNIError = validateFields.validateDNI(DNI.value);
       if ([emailError, nombreError, apellidoError, DNIError ].every(e => e === false)) {
      // no errors submit the form
      console.log('success');

      // clear state and show all fields are validated
      this.setState({ ...initialState, allFieldsValidated: true });
      this.showAllFieldsValidated();
    } else {
      // update the state with errors
      this.setState(state => ({
        email: {
          ...state.email,
          validateOnChange: true,
          error: emailError
        },
            nombre: {
          ...state.nombre,
          validateOnChange: true,
          error: nombreError
        },
            apellido: {
          ...state.apellido,
          validateOnChange: true,
          error: apellidoError
        },
            DNI: {
          ...state.DNI,
          validateOnChange: true,
          error: DNIError
        },
     
      }));
    }
  }

  showAllFieldsValidated() {
    setTimeout(() => {
      this.setState({ allFieldsValidated: false });
    }, 1500);
  }

  render() {
    const { email, nombre, apellido, DNI, allFieldsValidated } = this.state;
    return (
      <div className="Form col-md-8 col-lg-6">
        <div className="card shadow">
          <div className="card-header">
            <h4 className="text-center">Form Validation React</h4>
          </div>

          <div className="card-body">
            {allFieldsValidated && (
              <p className="text-success text-center">
                Success, All fields are validated
              </p>
            )}

            {/* Form Starts Here */}
            <form onSubmit={evt => this.handleSubmit(evt)}>
              {/* Email field */}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={email.value}
                  placeholder="Ingrese su email"
                  className={classnames(
                    'form-control',
                    { 'is-valid': email.error === false },
                    { 'is-invalid': email.error }
                  )}
                  onChange={evt =>
                    this.handleChange(validateFields.validateEmail, evt)
                  }
                  onBlur={evt =>
                    this.handleBlur(validateFields.validateEmail, evt)
                  }
                />
                <div className="invalid-feedback">{email.error}</div>
              </div>
                      
              {/* Nombre field */}
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={nombre.value}
                  placeholder="Ingrese su nombre"
                  className={classnames(
                    'form-control',
                    { 'is-valid': nombre.error === false },
                    { 'is-invalid': nombre.error }
                  )}
                  onChange={evt =>
                    this.handleChange(validateFields.validateNombre, evt)
                  }
                  onBlur={evt =>
                    this.handleBlur(validateFields.validateNombre, evt)
                  }
                />
                <div className="invalid-feedback">{nombre.error}</div>
              </div>

                {/* Apellido field */}
              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={apellido.value}
                  placeholder="Ingrese su apellido"
                  className={classnames(
                    'form-control',
                    { 'is-valid': apellido.error === false },
                    { 'is-invalid': apellido.error }
                  )}
                  onChange={evt =>
                    this.handleChange(validateFields.validateApellido, evt)
                  }
                  onBlur={evt =>
                    this.handleBlur(validateFields.validateApellido, evt)
                  }
                />
                <div className="invalid-feedback">{apellido.error}</div>
              </div>

                {/* DNI field */}
              <div className="form-group">
                <label>DNI</label>
                <input
                  type="text"
                  name="DNI"
                  value={DNI.value}
                  placeholder="Ingrese su DNI"
                  className={classnames(
                    'form-control',
                    { 'is-valid': DNI.error === false },
                    { 'is-invalid': DNI.error }
                  )}
                  onChange={evt =>
                    this.handleChange(validateFields.validateDNI, evt)
                  }
                  onBlur={evt =>
                    this.handleBlur(validateFields.validateDNI, evt)
                  }
                />
                <div className="invalid-feedback">{DNI.error}</div>
              </div>

              <button
                type="submit"
                className="btn btn-secondary btn-block"
                onMouseDown={() => this.setState({ submitCalled: true })}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;