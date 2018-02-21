import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import {StackNavigator} from 'react-navigation'
import Login from './login'
import Signup from './signup'
import CreateUrl from './createUrl'

 export const MainNavigator = StackNavigator(
   {

     CreateUrl: {
        screen: CreateUrl,
        navigationOptions: {
          header: null
        }
      },
     Signup: {
       screen: Signup,
       navigationOptions: {
          header: null
        }
     },
     Login: {
       screen: Login,
       navigationOptions: {
          header: null
        }
     }


   }

)
