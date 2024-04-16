import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import globalStyles from '../../../styles';
export default function Screen1() {
  return (
    <SafeAreaView style={globalStyles.PageContainer}>
      <View>
        <Text>Screen1</Text>
      </View>
    </SafeAreaView>
  );
}
