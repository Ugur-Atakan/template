import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from '../../screens/app/main';
import Screen1 from '../../screens/app/screen1';
import Screen2 from '../../screens/app/screen2';
import {NavigationHeader} from '../../components/headers/NavigationHeader';
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
      }}
      initialRouteName="Main">
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          header: () => <NavigationHeader pageName="Main" headerType="app" />,
          headerShown: true,
          tabBarActiveTintColor: '#45315F',
          tabBarInactiveTintColor: '#A7A5AC',
        }}
      />
      <Tab.Screen
        name="Screen1"
        component={Screen1}
        options={{
          header: () => <NavigationHeader pageName="Main" headerType="app" />,
          headerShown: true,
          tabBarActiveTintColor: '#45315F',
          tabBarInactiveTintColor: '#A7A5AC',
        }}
      />
      <Tab.Screen name="Screen2" component={Screen2} />
    </Tab.Navigator>
  );
};
export default MyTabs;
