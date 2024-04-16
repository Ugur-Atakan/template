import React from 'react';
import {StyleSheet, SafeAreaView, View, ActivityIndicator} from 'react-native';
import {useAppSelector} from '../../redux/hooks';

const LoadingComponent = () => {
  const loading = useAppSelector(state => state.common.loading);
  return loading ? (
    <View style={styles.container}>
      <SafeAreaView style={styles.wrap}>
        <ActivityIndicator color="#ffff" size={'large'} />
      </SafeAreaView>
    </View>
  ) : (
    <></>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LoadingComponent;
