import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ForgotPassword from '../screens/auth/ForgotPassword';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen
        name="RegisterScreen"
        options={{
          headerShown: true,
          headerTitle: 'Register',
        }}
        component={Register}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        options={{
          headerShown: true,
          headerTitle: 'Forgot Password',
        }}
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
