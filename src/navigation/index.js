import React from 'react'
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Routes from './routes'
import Splash from '../screen/splash'
import ListContact from '../screen/listContact'

const Stack = createStackNavigator()

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Routes.Splash}
      component={Splash}
      options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
    />
    <Stack.Screen
      name={Routes.ListContact}
      component={ListContact}
      options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
    />
  </Stack.Navigator>
)

const Navigation = () => (
  <NavigationContainer>
    <MainStack />
  </NavigationContainer>
)

export default Navigation
