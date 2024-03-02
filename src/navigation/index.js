import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colorTheme} from '../theme/Theme';

import WelcomeScreen from '../screens/WelcomeScreen';
import SelectUserRole from '../screens/UserRoles';
import DiseasedImageUploadScreen from '../screens/DiseasedImageUploadScreen';
// import SelectedImages from '../screens/SelectedImages';
// import DogsOnRoads from '../screens/DogsOnRoads';
// import DogsInShelters from '../screens/DogsInShelters';
// import {Image} from 'react-native';

const stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

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
        {/* <stack.Screen
            name="SelectedImagesScreen"
            component={SelectedImages}
            options={{
              headerShown: true,
              headerTitle: '',
              headerTintColor: colorTheme.primaryColor,
              headerTransparent: true,
              headerTitleStyle: {fontFamily: 'Lexend-Bold'},
            }}
          /> */}
        {/* <stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{
              headerShown: false,
              // headerTitle: '',
              // headerTintColor: colorTheme.primaryColor,
              // headerTransparent: true,
              // headerTitleStyle: {fontFamily: 'Lexend-Bold'},
            }}
          /> */}
      </stack.Navigator>
    </NavigationContainer>
  );
};

// const TabNavigator = () => {
//   return (
//     <Tab.Navigator initialRouteName="Shelters">
//       <Tab.Screen
//         name="Shelters"
//         component={DogsInShelters}
//         options={{
//           title: 'Shelters',
//           tabBarIcon: (
//             <Image
//               source={require('../images/shelters.png')}
//               style={{width: 20, height: 20}}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Roads"
//         component={DogsOnRoads}
//         options={{
//           title: 'Streets',
//           tabBarIcon: (
//             <Image
//               source={require('../images/roads.png')}
//               style={{width: 20, height: 20}}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

export default StackNavigation;
