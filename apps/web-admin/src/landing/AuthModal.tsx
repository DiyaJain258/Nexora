import React from 'react';
import { AdminLoginView, UserSession } from '../views/AdminLoginView';

interface AuthModalProps {
  onClose: () => void;
  defaultTab?: 'subscriber' | 'admin';
  onNavigateToAdmin: () => void;
  onLoginSuccess?: (session: UserSession) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  defaultTab = 'subscriber',
  onNavigateToAdmin,
  onLoginSuccess,
}) => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999 }}>
      <AdminLoginView
        defaultTab={defaultTab === 'admin' ? 'adm' : 'sub'}
        onLoginSuccess={(session) => {
          onClose();
          if (session) {
            if (onLoginSuccess) {
              onLoginSuccess(session);
            } else if (session.role === 'admin') {
              onNavigateToAdmin();
            }
          } else {
            onNavigateToAdmin();
          }
        }}
        onBackToLanding={onClose}
      />
    </div>
  );
};

export default AuthModal;
