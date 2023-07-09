import React from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Formik } from 'formik'
import _ from 'lodash'
import { launchImageLibrary } from 'react-native-image-picker'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import Service from '../../service'
import Routes from '../../navigation/routes'
import Loader from '../../component/loader'
import Header from '../../component/header'
import { defaultProfilePic, emptyImage } from '../../constant/image'
import { setLoadingListContacts } from '../../redux/action/listContactsActions'

import {
  mappingFormField,
  validationSchema
} from './validationSchemaCreateContact'
import styles from './createContact.component.styles'

export const deleteHandler = state => async () => {
  state.setLoader(true)
  try {
    await Service.delete(`contact/${state.id}`)
    state.dispatch(setLoadingListContacts(true))
    state.navigation.goBack()
  } catch (error) {
    Alert.alert('Error', 'Error when delete the contact', [
      {
        text: 'OK',
        onPress: () => {}
      }
    ])
  } finally {
    state.setLoader(false)
  }
}

export const deleteConfirmation = state => () =>
  Alert.alert(
    'Delete Confirmation',
    'Are you sure want to delete this contact?',
    [
      {
        text: 'OK',
        onPress: deleteHandler(state)
      },
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      }
    ]
  )

export const submitHandler = (values, state) => async () => {
  state.setLoader(true)
  parseInt(values.age, 10)
  try {
    await Service.post('contact', { ...values })
    state.dispatch(setLoadingListContacts(true))
    state.navigation.goBack()
  } catch (error) {
    Alert.alert('Error', 'Error when create the contact', [
      {
        text: 'OK',
        onPress: () => {}
      }
    ])
  } finally {
    state.setLoader(false)
  }
}

export const submitConfirmation = (values, state) =>
  Alert.alert(
    'Submit Confirmation',
    'Are you sure want to submit this contact?',
    [
      {
        text: 'OK',
        onPress: submitHandler(values, state)
      },
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      }
    ]
  )

export const editHandler = (values, state) => async () => {
  state.setLoader(true)
  parseInt(values.age, 10)
  try {
    await Service.put(`contact/${state.id}`, { ...values })
    state.dispatch(setLoadingListContacts(true))
    state.navigation.navigate(Routes.ListContact)
  } catch (error) {
    Alert.alert('Error', 'Error when edit the contact', [
      {
        text: 'OK',
        onPress: () => {}
      }
    ])
  } finally {
    state.setLoader(false)
  }
}

export const editConfirmation = (values, state) =>
  Alert.alert('Edit Confirmation', 'Are you sure want to edit this contact?', [
    {
      text: 'OK',
      onPress: editHandler(values, state)
    },
    {
      text: 'Cancel',
      onPress: () => {},
      style: 'cancel'
    }
  ])

export const submitButtonHandler = (values, errors, state) => () => {
  if (
    values.photo === '' ||
    values.firstName === '' ||
    values.lastName === '' ||
    values.age === ''
  ) {
    return false
  }

  if (errors.photo || errors.firstName || errors.lastName || errors.age) {
    return false
  }

  if (state.isEdit) {
    return editConfirmation(values, state)
  }

  return submitConfirmation(values, state)
}

const renderButton = (values, errors, state) => (
  <View accessibilityLabel="ContainerButton" style={styles.containerButton}>
    <TouchableOpacity
      onPress={submitButtonHandler(values, errors, state)}
      accessibilityLabel="ButtonContact"
      style={styles.button}
    >
      <Text style={styles.textButton}>Submit</Text>
    </TouchableOpacity>
  </View>
)

const renderErrorText = message => (
  <View style={styles.containerErrorText}>
    <Text style={styles.textError}>{message}</Text>
  </View>
)

const renderFormField = (title, placeholder, name, handleChange, values) => (
  <View
    accessibilityLabel="ContainerFormField"
    style={styles.formFieldContainer}
  >
    <Text accessibilityLabel="TitleFormField" style={styles.title}>
      {title}
    </Text>
    <TextInput
      accessibilityLabel="TextInputFormField"
      style={styles.textInput}
      placeholder={placeholder}
      onChangeText={handleChange(name)}
      value={values[name]}
      keyboardType={name === mappingFormField.age ? 'number-pad' : 'default'}
    />
  </View>
)

const launchImagePicker = setFieldValue => () => {
  let options = {
    title: 'Select Image',
    customButtons: [
      {
        name: 'customOptionKey',
        title: 'Choose Photo from Custom Option'
      }
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  }

  launchImageLibrary(options, response => {
    const uri = _.get(response, 'assets[0].uri', '')
    if (uri) {
      setFieldValue('photo', uri)
    }
  })
}

const renderImage = (state, values, setFieldValue) => (
  <TouchableOpacity
    accessibilityLabel="ContainerImage"
    onPress={launchImagePicker(setFieldValue)}
  >
    <Image
      accessibilityLabel="ImageContact"
      source={{
        uri: values.photo
          ? values.photo
          : state.form.photo && state.form.photo !== emptyImage
          ? state.form.photo
          : defaultProfilePic
      }}
      style={styles.image}
      resizeMode="cover"
    />
  </TouchableOpacity>
)

const renderForm = state => (
  <Formik
    enableReinitialize
    initialValues={{ ...state.form }}
    validationSchema={validationSchema}
  >
    {({ handleChange, errors, values, setFieldValue }) => (
      <>
        <ScrollView
          accessibilityLabel="ContentContact"
          contentContainerStyle={styles.content}
        >
          {renderImage(state, values, setFieldValue)}
          {errors.photo && renderErrorText(errors.photo)}
          {renderFormField(
            'First Name',
            'Input first name',
            mappingFormField.fistName,
            handleChange,
            values
          )}
          {errors.firstName && renderErrorText(errors.firstName)}
          {renderFormField(
            'Last Name',
            'Input last name',
            mappingFormField.lastName,
            handleChange,
            values
          )}
          {errors.lastName && renderErrorText(errors.lastName)}
          {renderFormField(
            'Age',
            'Input age',
            mappingFormField.age,
            handleChange,
            values
          )}
          {errors.age && renderErrorText(errors.age)}
        </ScrollView>
        {renderButton(values, errors, state)}
      </>
    )}
  </Formik>
)

export const onCloseLoaderHandler = state => () => {
  state.setLoader(false)
}

const renderLoader = state => (
  <Loader visible={state.loader} onClose={onCloseLoaderHandler(state)} />
)

const useCreateContact = props => {
  const [form, setForm] = React.useState({
    photo: _.get(props, 'route.params.photo', ''),
    firstName: _.get(props, 'route.params.firstName', ''),
    lastName: _.get(props, 'route.params.lastName', ''),
    age: _.get(props, 'route.params.age', '').toString()
  })
  const isEdit = _.get(props, 'route.params.isEdit', false)
  const id = _.get(props, 'route.params.id', '')
  const [loader, setLoader] = React.useState(false)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const state = {
    form,
    setForm,
    isEdit,
    id,
    loader,
    setLoader,
    dispatch,
    navigation
  }

  return state
}

const CreateContact = props => {
  const state = useCreateContact(props)

  return (
    <View accessibilityLabel="ContainerContact" style={styles.container}>
      <Header
        showBackButton
        title={state.isEdit ? 'Edit Contact' : 'Create Contact'}
        right={
          state.isEdit
            ? [
                {
                  icon: 'delete-outline',
                  action: deleteConfirmation(state)
                }
              ]
            : []
        }
      />
      {renderForm(state)}
      {renderLoader(state)}
    </View>
  )
}

export default CreateContact
