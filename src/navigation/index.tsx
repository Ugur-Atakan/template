import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserStack from './UserStack';
import AuthStack from './AuthStack';
import LoadingComponent from '../components/Loading';
import {useAppSelector} from '../redux/hooks';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const {isLoggedIn, isLoading} = useAppSelector(state => state.user);
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <Stack.Screen name="UserStack" component={UserStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
