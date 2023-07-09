import * as yup from 'yup'

const mappingFormField = {
  photo: 'photo',
  fistName: 'firstName',
  lastName: 'lastName',
  age: 'age'
}

const validationSchema = yup.object().shape({
  photo: yup.string().required('photo harus diisi.'),
  firstName: yup
    .string()
    .required('first name harus diisi.')
    .matches(
      /^(?=.{5,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/i,
      'first name tidak sesuai format.'
    ),
  lastName: yup
    .string()
    .required('last name harus diisi.')
    .matches(
      /^(?=.{5,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/i,
      'last name tidak sesuai format.'
    ),
  age: yup
    .string()
    .required('age harus diisi.')
    .matches(/^([1-9]|[1-9][0-9])$/, 'age hanya 1-99.')
})

export { mappingFormField, validationSchema }
