import React from 'react';
import { AdminLoginView } from '../views/AdminLoginView';

interface AuthModalProps {
  onClose: () => void;
  defaultTab?: 'subscriber' | 'admin';
  onNavigateToAdmin: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  defaultTab = 'subscriber',
  onNavigateToAdmin,
}) => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999 }}>
      <AdminLoginView
        defaultTab={defaultTab === 'admin' ? 'adm' : 'sub'}
        onLoginSuccess={() => {
          onClose();
          onNavigateToAdmin();
        }}
        onBackToLanding={onClose}
      />
    </div>
  );
};

export default AuthModal;
