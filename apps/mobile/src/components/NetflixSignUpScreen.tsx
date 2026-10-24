import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// High-resolution posters for the Netflix collage wall background
const POSTER_TILES = [
  // Row 1
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=320&auto=format&fit=crop&q=80', // Vikings / Epic
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=320&auto=format&fit=crop&q=80', // Cyberpunk / Tech
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=320&auto=format&fit=crop&q=80', // Dune / Sci-Fi
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=320&auto=format&fit=crop&q=80', // Dark mystery
  // Row 2
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=320&auto=format&fit=crop&q=80', // Drama / Oppenheimer
  'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=320&auto=format&fit=crop&q=80', // Interstellar
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=320&auto=format&fit=crop&q=80', // Dark Knight / Action
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=320&auto=format&fit=crop&q=80', // Cinema crowd
  // Row 3
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=320&auto=format&fit=crop&q=80', // Film theater
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=320&auto=format&fit=crop&q=80', // Cinema seats
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=320&auto=format&fit=crop&q=80', // Moody sunset
  'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=320&auto=format&fit=crop&q=80', // Night skyline
  // Row 4
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=320&auto=format&fit=crop&q=80', // Sports
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=320&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=320&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=320&auto=format&fit=crop&q=80',
];

interface NetflixSignUpScreenProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export const NetflixSignUpScreen: React.FC<NetflixSignUpScreenProps> = ({
  onSuccess,
  onClose,
}) => {
  const [isSignInMode, setIsSignInMode] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showRecaptchaDetail, setShowRecaptchaDetail] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmit = () => {
    if (!emailOrPhone.trim()) {
      showToast('Please enter an email or phone number.');
      return;
    }
    if (!password) {
      showToast('Please enter your password.');
      return;
    }

    showToast(isSignInMode ? 'Signed in successfully! Welcome.' : 'Account created successfully!');
    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 1200);
  };

  return (
    <View style={styles.container}>
      {/* Background Poster Collage Wall tilted diagonally like Image 1 */}
      <View style={styles.posterWall} pointerEvents="none">
        <View style={styles.tiltedGrid}>
          {POSTER_TILES.map((uri, index) => (
            <View key={index} style={styles.posterItem}>
              <Image source={{ uri }} style={styles.posterImage} resizeMode="cover" />
            </View>
          ))}
        </View>

        {/* Cinematic Vignette Overlay so posters remain rich and visible */}
        <View style={styles.vignetteOverlay} />
      </View>

      {/* Subtle Circular Back Arrow on Top-Left */}
      {onClose && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClose}
          style={styles.floatingBackBtn}
        >
          <Text style={styles.floatingBackIcon}>←</Text>
        </TouchableOpacity>
      )}

      {/* Toast Alert */}
      {toastMessage && (
        <View style={styles.toastBox}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Centered Glass Form Card */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.card}>
            {/* Title: Sign In */}
            <Text style={styles.cardTitle}>
              {isSignInMode ? 'Sign In' : 'Sign Up'}
            </Text>

            {/* Email or Phone Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Email or phone number"
                placeholderTextColor="#8C8C8C"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#8C8C8C"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
            </View>

            {/* Solid Red Sign In CTA Button */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleSubmit}
              style={styles.signInButton}
            >
              <Text style={styles.signInButtonText}>
                {isSignInMode ? 'Sign In' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            {/* Remember me & Need help? row */}
            <View style={styles.optionsRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setRememberMe(!rememberMe)}
                style={styles.checkboxTouch}
              >
                <View style={[styles.checkboxBox, rememberMe && styles.checkboxBoxChecked]}>
                  {rememberMe && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => showToast('Password reset link sent to your email.')}
              >
                <Text style={styles.needHelpText}>Need help?</Text>
              </TouchableOpacity>
            </View>

            {/* Facebook Login Row */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => showToast('Connecting with Facebook...')}
              style={styles.facebookRow}
            >
              <View style={styles.facebookIconBox}>
                <Text style={styles.facebookLetter}>f</Text>
              </View>
              <Text style={styles.facebookText}>Login with Facebook</Text>
            </TouchableOpacity>

            {/* Switch Mode: New to Netflix? Sign up now. */}
            <View style={styles.switchRow}>
              <Text style={styles.newToText}>
                {isSignInMode ? 'New to Netflix? ' : 'Already have an account? '}
                <Text
                  style={styles.signUpLink}
                  onPress={() => setIsSignInMode(!isSignInMode)}
                >
                  {isSignInMode ? 'Sign up now.' : 'Sign in now.'}
                </Text>
              </Text>
            </View>

            {/* Google reCAPTCHA Disclaimer */}
            <View style={styles.recaptchaWrap}>
              <Text style={styles.recaptchaText}>
                This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
                <Text
                  style={styles.learnMoreLink}
                  onPress={() => setShowRecaptchaDetail(!showRecaptchaDetail)}
                >
                  Learn more.
                </Text>
              </Text>

              {showRecaptchaDetail && (
                <Text style={styles.recaptchaExplanation}>
                  The information collected by Google reCAPTCHA is subject to the Google Privacy Policy and Terms of Service, and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes.
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
  },
  posterWall: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  tiltedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    opacity: 0.55,
    transform: [{ scale: 1.15 }, { rotate: '-6deg' }],
    marginTop: -40,
    marginLeft: -20,
    marginRight: -20,
  },
  posterItem: {
    width: (width + 60) / 4 - 8,
    height: 165,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#16161D',
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  vignetteOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.62)',
  },
  floatingBackBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 52 : 36,
    left: 18,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
  floatingBackIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginTop: -2,
  },
  toastBox: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 52 : 36,
    left: 68,
    right: 20,
    backgroundColor: '#E50914',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    zIndex: 999,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  card: {
    width: '100%',
    maxWidth: 390,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    borderRadius: 4,
    paddingHorizontal: 26,
    paddingTop: 36,
    paddingBottom: 38,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.9,
    shadowRadius: 30,
    elevation: 14,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 26,
    letterSpacing: 0.2,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#333333',
    borderRadius: 4,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 14.5,
  },
  signInButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#E50914',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 14,
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 15.5,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  checkboxTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  checkboxBox: {
    width: 17,
    height: 17,
    borderRadius: 2,
    backgroundColor: '#737373',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: '#737373',
  },
  checkMark: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '900',
  },
  rememberMeText: {
    color: '#B3B3B3',
    fontSize: 13,
  },
  needHelpText: {
    color: '#B3B3B3',
    fontSize: 13,
  },
  facebookRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 22,
  },
  facebookIconBox: {
    width: 18,
    height: 18,
    borderRadius: 2,
    backgroundColor: '#1877F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookLetter: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    marginTop: -1,
  },
  facebookText: {
    color: '#737373',
    fontSize: 13,
    fontWeight: '500',
  },
  switchRow: {
    marginBottom: 16,
  },
  newToText: {
    color: '#737373',
    fontSize: 15,
  },
  signUpLink: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  recaptchaWrap: {
    marginTop: 2,
  },
  recaptchaText: {
    color: '#8C8C8C',
    fontSize: 12,
    lineHeight: 17,
  },
  learnMoreLink: {
    color: '#0071EB',
  },
  recaptchaExplanation: {
    color: '#8C8C8C',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 6,
  },
});
