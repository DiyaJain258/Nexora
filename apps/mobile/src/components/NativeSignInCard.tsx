import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface NativeSignInCardProps {
  onSignInSuccess?: () => void;
  onActivationPress?: () => void;
}

export const NativeSignInCard: React.FC<NativeSignInCardProps> = ({
  onSignInSuccess,
  onActivationPress,
}) => {
  const [tab, setTab] = useState<'sub' | 'adm'>('sub');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSignIn = () => {
    if (!email.trim()) {
      triggerToast('Please enter your email or phone number.');
      return;
    }
    if (!password) {
      triggerToast('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      triggerToast('Welcome Back! Redirecting to dashboard...');
      setTimeout(() => {
        setIsSuccess(false);
        if (onSignInSuccess) onSignInSuccess();
      }, 1500);
    }, 1400);
  };

  return (
    <View style={styles.container}>
      {/* Toast Alert */}
      {toastMessage && (
        <View style={styles.toastBox}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Hero Intro */}
      <View style={styles.heroTextContainer}>
        <Text style={styles.heroTitle}>
          Unlimited Movies,{'\n'}
          Shows <Text style={{ color: '#E50914' }}>& More.</Text>
        </Text>
        <Text style={styles.heroSub}>Stream anywhere. Cancel anytime.</Text>
        <Text style={styles.heroSub2}>
          4K Ultra HD · Dolby Audio · 1,400+ Live Channels
        </Text>
      </View>

      {/* Card Body with Glassmorphism */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sign In</Text>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'sub' && styles.tabBtnActive]}
            onPress={() => setTab('sub')}
          >
            <Text
              style={[
                styles.tabBtnText,
                tab === 'sub' && styles.tabBtnTextActive,
              ]}
            >
              Subscriber
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'adm' && styles.tabBtnActive]}
            onPress={() => setTab('adm')}
          >
            <Text
              style={[
                styles.tabBtnText,
                tab === 'adm' && styles.tabBtnTextActive,
              ]}
            >
              Admin Console
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input: Email */}
        <View style={styles.fieldBox}>
          <Text style={styles.fieldLabel}>
            {tab === 'adm' ? 'Admin Email Address' : 'Email or phone number'}
          </Text>
          <TextInput
            style={styles.fieldInput}
            value={email}
            onChangeText={setEmail}
            placeholder={
              tab === 'adm' ? 'admin@nexora.tv' : 'user@domain.com or +1...'
            }
            placeholderTextColor="rgba(255,255,255,0.3)"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Input: Password */}
        <View style={styles.fieldBox}>
          <Text style={styles.fieldLabel}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.fieldInput, { flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="••••••••••••"
              placeholderTextColor="rgba(255,255,255,0.3)"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeText}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Button: Sign In */}
        <TouchableOpacity
          style={[
            styles.btnSignIn,
            isSuccess && { backgroundColor: '#16a34a' },
          ]}
          onPress={handleSignIn}
          disabled={isLoading}
          activeOpacity={0.88}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.btnSignInText}>
              {isSuccess ? '✓ Welcome Back!' : 'Sign In ›'}
            </Text>
          )}
        </TouchableOpacity>

        {/* OR Divider */}
        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.orLine} />
        </View>

        {/* Activation Code Button */}
        <TouchableOpacity
          style={styles.btnCode}
          onPress={onActivationPress}
          activeOpacity={0.8}
        >
          <Text style={styles.btnCodeText}>📺 Use TV Activation Code</Text>
        </TouchableOpacity>

        <View style={styles.cardFooter}>
          <Text style={styles.footerMuted}>
            New to NEXORA?{' '}
            <Text
              style={styles.footerLink}
              onPress={() => triggerToast('Redirecting to sign-up...')}
            >
              Sign up now.
            </Text>
          </Text>
        </View>
      </View>

      {/* 4 Feature Stats Row */}
      <View style={styles.featuresRow}>
        <View style={styles.featItem}>
          <Text style={styles.featNum}>1,400+</Text>
          <Text style={styles.featLabel}>Live Channels</Text>
        </View>
        <View style={styles.featItem}>
          <Text style={styles.featNum}>4K</Text>
          <Text style={styles.featLabel}>Ultra HD</Text>
        </View>
        <View style={styles.featItem}>
          <Text style={styles.featNum}>5</Text>
          <Text style={styles.featLabel}>Screens</Text>
        </View>
        <View style={styles.featItem}>
          <Text style={styles.featNum}>190+</Text>
          <Text style={styles.featLabel}>Countries</Text>
        </View>
      </View>

      {/* Footnotes */}
      <View style={styles.bottomLinksRow}>
        <Text style={styles.bottomLink}>FAQ</Text>
        <Text style={styles.bottomLink}>•</Text>
        <Text style={styles.bottomLink}>Help Centre</Text>
        <Text style={styles.bottomLink}>•</Text>
        <Text style={styles.bottomLink}>Terms</Text>
        <Text style={styles.bottomLink}>•</Text>
        <Text style={styles.bottomLink}>Privacy</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  toastBox: {
    position: 'absolute',
    top: 4,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(20, 20, 20, 0.96)',
    borderLeftWidth: 4,
    borderLeftColor: '#E50914',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    zIndex: 99,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  heroTextContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 8,
  },
  heroSub: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    marginBottom: 4,
  },
  heroSub2: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.55)',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(18, 18, 20, 0.88)',
    borderRadius: 12,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: 18,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: '#E50914',
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  tabBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  fieldBox: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    marginBottom: 6,
  },
  fieldInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 14,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 11,
    justifyContent: 'center',
  },
  eyeText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '600',
  },
  btnSignIn: {
    backgroundColor: '#E50914',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  btnSignInText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 8,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  orText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  btnCode: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnCodeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  cardFooter: {
    marginTop: 18,
    alignItems: 'center',
  },
  footerMuted: {
    color: 'rgba(255, 255, 255, 0.55)',
    fontSize: 12,
  },
  footerLink: {
    color: '#FFFFFF',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
  },
  featItem: {
    alignItems: 'center',
  },
  featNum: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  featLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 2,
  },
  bottomLinksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  bottomLink: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.4)',
  },
});
