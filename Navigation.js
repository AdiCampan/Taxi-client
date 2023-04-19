import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import StackScreen from "./screens/StackScreen";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const HomeStackNavigator = createNativeStackNavigator();
function MyStack() {
  return(
    <HomeStackNavigator.Navigator initialRouteName="Home">
      <HomeStackNavigator.Screen
       name="Home"
       component={HomeScreen}
      />
      <HomeStackNavigator.Screen
       name="Stack"
       component={StackScreen}
      />
    </HomeStackNavigator.Navigator>
  )
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: 'purple',
      }}
    >
      <Tab.Screen
        name='HomeScreen'
        component={MyStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='MapScreen'
        component={MapScreen}
        options={{
          tabBarLabel: 'MapScreen',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-settings-outline" size={24} color={color}  />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  )
}