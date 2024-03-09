import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colorTheme} from '../theme/Theme';
import Icons from 'react-native-vector-icons/FontAwesome6';

import WelcomeScreen from '../screens/WelcomeScreen';
import SelectUserRole from '../screens/UserRoles';
import DiseasedImageUploadScreen from '../screens/DiseasedImageUploadScreen';
import SelectedImages from '../screens/SelectedImages';
import DogsOnRoads from '../screens/DogsOnRoads';
import DogsInShelters from '../screens/DogsInShelters';
import PostingScreen from '../screens/PostingScreen';

const stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="WelcomeScreen">
        <stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false,
            headerTintColor: colorTheme.primaryColor,
            headerTransparent: true,
          }}
        />
        <stack.Screen
          name="ChooseRoleScreen"
          component={SelectUserRole}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTintColor: colorTheme.primaryColor,
            headerTransparent: true,
          }}
        />
        <stack.Screen
          name="DiseasedImageUploadScreen"
          component={DiseasedImageUploadScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTintColor: colorTheme.primaryColor,
            headerTransparent: true,
          }}
        />
        <stack.Screen
          name="SelectedImagesScreen"
          component={SelectedImages}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTintColor: colorTheme.primaryColor,
            headerTransparent: true,
            headerTitleStyle: {fontFamily: 'Lexend-Bold'},
          }}
        />
        <stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTintColor: colorTheme.primaryColor,
            headerTransparent: true,
            headerTitleStyle: {fontFamily: 'Lexend-Bold'},
          }}
        />
        <stack.Screen
          name="PostingScreen"
          component={PostingScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTintColor: colorTheme.primaryColor,
            headerTransparent: true,
            headerTitleStyle: {fontFamily: 'Lexend-Bold'},
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Shelters"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: colorTheme.primaryColor,
        tabBarIcon: ({color, focused}) => {
          let iconSource;
          if (route.name === 'Shelters') {
            iconSource = 'house';
          } else if (route.name === 'Roads') {
            iconSource = 'road';
          }
          return (
            <Icons
              name={iconSource}
              size={20}
              color={focused ? colorTheme.primaryColor : colorTheme.gray}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Shelters"
        component={DogsInShelters}
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
      <Tab.Screen
        name="Roads"
        component={DogsOnRoads}
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default StackNavigation;
