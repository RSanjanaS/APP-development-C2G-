import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  Switch,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const profiles = [
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/22.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/11.jpg',
  'https://randomuser.me/api/portraits/women/77.jpg',
  'https://randomuser.me/api/portraits/men/33.jpg',
  'https://randomuser.me/api/portraits/women/36.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
];

const theme = (darkMode) => ({
  background: darkMode ? '#000' : '#fff',
  text: darkMode ? '#fff' : '#111',
  subtext: darkMode ? '#aaa' : '#444',
  button: darkMode ? '#00c853' : '#00796b',
});

export default function IntroScreen({ navigation }) {
  const [darkMode, setDarkMode] = useState(true);
  const colors = theme(darkMode);

  // Animations
  const stripeAnim = useRef(new Animated.Value(0)).current;
  const fadeText = useRef(new Animated.Value(0)).current;
  const slideText = useRef(new Animated.Value(20)).current;
  const profileAnims = profiles.map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    Animated.loop(
      Animated.timing(stripeAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.stagger(150, [
      ...profileAnims.map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        })
      ),
      Animated.parallel([
        Animated.timing(fadeText, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideText, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const stripeTranslate = stripeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Background Animation */}
      <Animated.View
        style={[styles.stripeContainer, { transform: [{ translateY: stripeTranslate }] }]}>
        {Array.from({ length: 20 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.stripe,
              {
                left: i * 18,
                backgroundColor:
                  i % 2 === 0
                    ? darkMode
                      ? 'rgba(0,255,180,0.1)'
                      : 'rgba(0,0,0,0.05)'
                    : 'rgba(255,255,255,0.04)',
              },
            ]}
          />
        ))}
      </Animated.View>

      {/* Blur */}
      <BlurView intensity={30} tint={darkMode ? 'dark' : 'light'} style={StyleSheet.absoluteFill} />

      {/* Theme Switch */}
      <View style={styles.switchContainer}>
        <Text style={{ color: colors.text, marginRight: 8 }}>
          {darkMode ? 'Dark' : 'Light'} Mode
        </Text>
        <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
      </View>

      {/* Profile Avatars */}
      <View style={styles.profileGrid}>
        {profiles.map((uri, i) => (
          <Animated.View
            key={i}
            style={[
              styles.profileCircle,
              {
                top: 60 + Math.floor(i / 4) * 90,
                left: 30 + (i % 4) * (width / 4),
                transform: [
                  { scale: profileAnims[i] },
                  { translateY: Math.random() * 5 },
                  { rotate: `${(Math.random() - 0.5) * 10}deg` },
                ],
              },
            ]}>
            <Image source={{ uri }} style={styles.avatar} />
          </Animated.View>
        ))}
      </View>

      {/* Text & CTA */}
      <Animated.View style={[styles.textBlock, { opacity: fadeText, transform: [{ translateY: slideText }] }]}>
        <Text style={[styles.heading, { color: colors.text }]}>
          Get access to your finances <Text style={styles.bold}>Anytime, Anywhere.</Text>
        </Text>
        <Text style={[styles.subtext, { color: colors.subtext }]}>
          Secure your financial future with our trusted banking services.
        </Text>

        <View style={styles.buttonWrapper}>
          <LottieView
            source={require('../assets/pulse.json')}
            autoPlay
            loop
            style={styles.lottieBackground}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.button }]}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Get started →</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stripeContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  stripe: {
    position: 'absolute',
    width: 2,
    height: '150%',
    borderRadius: 1,
  },
  profileGrid: {
    position: 'absolute',
    top: 50,
    width: '100%',
    height: 300,
  },
  profileCircle: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#111',
    ...Platform.select({
      ios: {
        shadowColor: '#00ffcc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  textBlock: {
    marginTop: 350,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
  },
  bold: {
    fontWeight: 'bold',
    color: '#00ffcc',
  },
  subtext: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  lottieBackground: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: -25,
    zIndex: -1,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 30,
    shadowColor: '#00ffcc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  switchContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
});
