import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import globalStyles from '../../../styles';
export default function Main() {
  return (
    <SafeAreaView style={globalStyles.PageContainer}>
      <View>
        <Text>Main Screen</Text>
      </View>
    </SafeAreaView>
  );
}
