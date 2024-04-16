import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../screens/app/main';
import Screen1 from '../screens/app/screen1';
import Screen2 from '../screens/app/screen2';
import MyTabs from './navigations/Bottomtabs';
const Stack = createNativeStackNavigator();
const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={MyTabs} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Screen1" component={Screen1} />
      <Stack.Screen name="Screen2" component={Screen2} />
    </Stack.Navigator>
  );
};

export default UserStack;
