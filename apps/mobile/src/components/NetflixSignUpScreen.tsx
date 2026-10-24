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

// Movie posters collage matching Netflix background wall
const BACKGROUND_POSTERS = [
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&auto=format&fit=crop&q=80',
];

interface NetflixSignUpScreenProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export const NetflixSignUpScreen: React.FC<NetflixSignUpScreenProps> = ({
  onSuccess,
  onClose,
}) => {
  const [isSignUpMode, setIsSignUpMode] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    if (isSignUpMode && confirmPassword !== password) {
      showToast('Passwords do not match.');
      return;
    }

    showToast(isSignUpMode ? 'Account created successfully! Welcome.' : 'Signed in successfully!');
    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      {/* Background Movie Posters Wall with Dark Vignette */}
      <View style={styles.posterWall} pointerEvents="none">
        <View style={styles.posterGrid}>
          {BACKGROUND_POSTERS.map((uri, index) => (
            <View key={index} style={styles.posterWrapper}>
              <Image source={{ uri }} style={styles.posterImg} resizeMode="cover" />
            </View>
          ))}
        </View>
        <View style={styles.vignetteOverlay} />
      </View>

      {/* Top Header Row with Logo & Close button */}
      <View style={styles.topHeader}>
        <View style={styles.logoRow}>
          <Text style={styles.logoRed}>NEX<Text style={{ color: '#FFFFFF' }}>ORA</Text></Text>
        </View>
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Toast Alert */}
      {toastMessage && (
        <View style={styles.toastBox}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Centered Dark Glass Form Card */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.authCard}>
          {/* Card Title */}
          <Text style={styles.cardTitle}>{isSignUpMode ? 'Sign Up' : 'Sign In'}</Text>

          {/* Email or Phone Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Email or phone number"
              placeholderTextColor="#8C8C8C"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Password"
              placeholderTextColor="#8C8C8C"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
          </View>

          {/* Confirm Password (only in Sign Up mode) */}
          {isSignUpMode && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Confirm password"
                placeholderTextColor="#8C8C8C"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
              />
            </View>
          )}

          {/* Primary Action Button (Solid Red Netflix Button) */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.88}
            onPress={handleSubmit}
          >
            <Text style={styles.primaryButtonText}>
              {isSignUpMode ? 'Sign Up' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          {/* Remember Me Checkbox & Need Help Row */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.checkboxRow}
              activeOpacity={0.8}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkboxBox, rememberMe && styles.checkboxBoxChecked]}>
                {rememberMe && <Text style={styles.checkmarkIcon}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => showToast('Password reset link sent to your email.')}
            >
              <Text style={styles.needHelpText}>Need help?</Text>
            </TouchableOpacity>
          </View>

          {/* Social Login with Facebook */}
          <TouchableOpacity
            style={styles.facebookRow}
            activeOpacity={0.75}
            onPress={() => showToast('Connecting to Facebook...')}
          >
            <View style={styles.facebookIconBox}>
              <Text style={styles.facebookIconText}>f</Text>
            </View>
            <Text style={styles.facebookText}>Login with Facebook</Text>
          </TouchableOpacity>

          {/* Switch Mode: Sign up now / Sign in now */}
          <View style={styles.switchModeBox}>
            <Text style={styles.switchModeText}>
              {isSignUpMode ? 'Already have an account? ' : 'New to Netflix? '}
              <Text
                style={styles.switchModeLink}
                onPress={() => setIsSignUpMode(!isSignUpMode)}
              >
                {isSignUpMode ? 'Sign in now.' : 'Sign up now.'}
              </Text>
            </Text>
          </View>

          {/* Google reCAPTCHA Disclaimer */}
          <View style={styles.recaptchaBox}>
            <Text style={styles.recaptchaText}>
              This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
              <Text
                style={styles.recaptchaLink}
                onPress={() => setShowRecaptchaDetail(!showRecaptchaDetail)}
              >
                Learn more.
              </Text>
            </Text>

            {showRecaptchaDetail && (
              <Text style={styles.recaptchaDetailText}>
                The information collected by Google reCAPTCHA is subject to the Google Privacy Policy and Terms of Service, and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  posterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    opacity: 0.38,
    transform: [{ scale: 1.08 }, { rotate: '-1.5deg' }],
    marginTop: -20,
  },
  posterWrapper: {
    width: (width + 40) / 4 - 6,
    height: 155,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#111116',
  },
  posterImg: {
    width: '100%',
    height: '100%',
  },
  vignetteOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: Platform.OS === 'ios' ? 52 : 36,
    paddingBottom: 10,
    zIndex: 10,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoRed: {
    color: '#E50914',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  toastBox: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 95 : 80,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(229, 9, 20, 0.95)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
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
    fontSize: 13.5,
    fontWeight: '700',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  authCard: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    borderRadius: 8,
    paddingHorizontal: 26,
    paddingTop: 36,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.85,
    shadowRadius: 28,
    elevation: 12,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 26,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputField: {
    width: '100%',
    height: 52,
    backgroundColor: '#333333',
    borderRadius: 5,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 15,
  },
  primaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#E50914',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 14,
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    backgroundColor: '#737373',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: '#737373',
  },
  checkmarkIcon: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '900',
  },
  rememberText: {
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
    marginBottom: 24,
  },
  facebookIconBox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    backgroundColor: '#1877F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookIconText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    marginTop: -1,
  },
  facebookText: {
    color: '#737373',
    fontSize: 13,
    fontWeight: '600',
  },
  switchModeBox: {
    marginBottom: 16,
  },
  switchModeText: {
    color: '#737373',
    fontSize: 15,
  },
  switchModeLink: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  recaptchaBox: {
    marginTop: 4,
  },
  recaptchaText: {
    color: '#8C8C8C',
    fontSize: 12,
    lineHeight: 18,
  },
  recaptchaLink: {
    color: '#0071EB',
  },
  recaptchaDetailText: {
    color: '#8C8C8C',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 8,
  },
});
