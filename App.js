import React from 'react'
import { LogBox } from 'react-native'

import Navigation from './src/navigation'

LogBox.ignoreLogs(['Warning: ...'])

const App = () => <Navigation />

export default App
