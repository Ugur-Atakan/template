import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface SocialButtonProps {
  children?: React.ReactNode;
  onPress?: () => void;
  extraStyles?: TouchableOpacity['props']['style'];
  brand?: 'google' | 'apple';
}
export const SocialButton = ({
  children,
  onPress,
  extraStyles,
  brand,
}: SocialButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, extraStyles]} onPress={onPress}>
      {children ? <Text>{children}</Text> : null}
      {brand === 'google' ? (
        <Image
          source={require('../../../assets/images/logos/googleLogo.png')}
          style={styles.logo}
        />
      ) : brand === 'apple' ? (
        <Image
          source={require('../../../assets/images/logos/appleLogo.png')}
          style={styles.logo}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#fff',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  logo: {
    width: 23,
    height: 23,
  },
});
