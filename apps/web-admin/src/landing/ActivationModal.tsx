import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Tv,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useSubscriberDevices } from '../hooks/useSubscriberDevices';

interface ActivationModalProps {
  onClose: () => void;
  onOpenSubscriberDevices?: () => void;
}

const TV_MODELS = [
  { id: 'android', name: 'Android TV / Google TV', icon: '📺' },
  { id: 'apple', name: 'Apple TV 4K', icon: '🍎' },
  { id: 'fire', name: 'Amazon Fire TV', icon: '🔥' },
  { id: 'samsung', name: 'Samsung Neo / LG WebOS', icon: '⚡' },
];

const ROOM_PRESETS = ['Living Room TV', 'Master Bedroom', 'Home Theater', 'Guest Room'];

export const ActivationModal: React.FC<ActivationModalProps> = ({
  onClose,
  onOpenSubscriberDevices,
}) => {
  const [code, setCode] = useState('');
  const [selectedModel, setSelectedModel] = useState(TV_MODELS[0].name);
  const [selectedLocation, setSelectedLocation] = useState(ROOM_PRESETS[0]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activatedDeviceId, setActivatedDeviceId] = useState<string | null>(null);

  const { addDevice, updateDeviceLocation } = useSubscriberDevices();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode || cleanCode.length < 4) {
      setError('Please enter a valid 6-character TV activation code (e.g., NEX-8821)');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      // Register device into subscriber devices store
      const newDev = addDevice({
        name: selectedModel,
        location: selectedLocation,
        code: cleanCode,
        type: 'tv',
        status: 'Streaming 4K HDR • Active Now',
        ip: `192.168.1.${Math.floor(Math.random() * 150 + 100)}`,
        isPrimary: false,
      });

      setActivatedDeviceId(newDev.id);
      setLoading(false);
      setSuccess(true);

      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.5 },
        colors: ['#be123c', '#e11d48', '#ffffff', '#fda4af', '#10b981'],
      });
    }, 900);
  };

  const handleUpdateLocation = (loc: string) => {
    setSelectedLocation(loc);
    if (activatedDeviceId) {
      updateDeviceLocation(activatedDeviceId, loc);
    }
  };

  return (
    <div
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        backgroundColor: 'rgba(3, 2, 6, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        className="glass-card modal-custom-scrollbar"
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#0a0710',
          border: '1.5px solid rgba(225, 29, 72, 0.45)',
          borderRadius: '24px',
          padding: '36px',
          boxShadow:
            '0 30px 100px rgba(0, 0, 0, 0.95), 0 0 60px rgba(225, 29, 72, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          type="button"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '10px',
            padding: '7px',
            cursor: 'pointer',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
        >
          <X size={18} />
        </button>

        {!success ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.25) 0%, rgba(190, 18, 60, 0.3) 100%)',
                  border: '1.5px solid rgba(225, 29, 72, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(225, 29, 72, 0.35)',
                }}
              >
                <KeyRound size={26} color="#fda4af" />
              </div>
              <div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 900,
                    color: '#fda4af',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  Remote Device Pairing
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#f8fafc', margin: '2px 0 0' }}>
                  Activate TV Application
                </h3>
              </div>
            </div>

            <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '22px' }}>
              Open NEXORA on your Android TV, Apple TV, or Firestick, and enter the 6-character pairing code
              displayed on your television screen.
            </p>

            <form onSubmit={handleSubmit}>
              {/* TV Code Input */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      color: '#cbd5e1',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                    }}
                  >
                    TV Activation Code
                  </label>
                  <span style={{ fontSize: '11px', color: '#fda4af', fontWeight: 700 }}>
                    e.g. NEX-8821
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="NEX-8821"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setError('');
                  }}
                  autoFocus
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: error ? '1.5px solid #ef4444' : '1.5px solid rgba(225, 29, 72, 0.45)',
                    borderRadius: '14px',
                    padding: '16px',
                    fontSize: '24px',
                    fontWeight: 900,
                    letterSpacing: '4px',
                    color: '#ffffff',
                    textAlign: 'center',
                    outline: 'none',
                    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.6), 0 0 25px rgba(225, 29, 72, 0.15)',
                    transition: 'all 0.2s ease',
                  }}
                />
              </div>

              {/* TV Platform / Device Model Picker */}
              <div style={{ marginBottom: '18px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    color: '#cbd5e1',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    marginBottom: '8px',
                  }}
                >
                  Select TV Platform
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {TV_MODELS.map((m) => {
                    const isSel = selectedModel === m.name;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedModel(m.name)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '10px',
                          backgroundColor: isSel ? 'rgba(225, 29, 72, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                          border: isSel ? '1.5px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.08)',
                          color: isSel ? '#ffffff' : '#94a3b8',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          textAlign: 'left',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span style={{ fontSize: '15px' }}>{m.icon}</span>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {m.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Room Location Preset */}
              <div style={{ marginBottom: '22px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    color: '#cbd5e1',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    marginBottom: '8px',
                  }}
                >
                  Device Location
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {ROOM_PRESETS.map((room) => {
                    const isSel = selectedLocation === room;
                    return (
                      <button
                        key={room}
                        type="button"
                        onClick={() => setSelectedLocation(room)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          backgroundColor: isSel ? 'rgba(225, 29, 72, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                          border: isSel ? '1px solid #fda4af' : '1px solid rgba(255, 255, 255, 0.1)',
                          color: isSel ? '#ffffff' : '#cbd5e1',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >
                        {room}
                      </button>
                    );
                  })}
                </div>
              </div>

              {error && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#ef4444',
                    fontSize: '13px',
                    marginBottom: '16px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-radiant"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '16px',
                  fontSize: '15px',
                  fontWeight: 800,
                  boxShadow: '0 10px 30px rgba(225, 29, 72, 0.4)',
                }}
              >
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTopColor: '#ffffff',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                      }}
                    />
                    <span>Connecting TV & Verifying Stream...</span>
                  </div>
                ) : (
                  <>
                    <span>Confirm & Activate TV</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                marginTop: '24px',
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#94a3b8',
                fontSize: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Tv size={16} color="#fda4af" />
                <span>Supports Android TV 9+, Apple TV & Fire TV</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontWeight: 700 }}>
                <ShieldCheck size={14} />
                <span>End-to-End Encrypted</span>
              </div>
            </div>
          </div>
        ) : (
          /* Success Screen with Paired Device Details & Direct Navigation */
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '2px solid rgba(16, 185, 129, 0.5)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 0 35px rgba(16, 185, 129, 0.35)',
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                color: '#10b981',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}
            >
              Handshake Complete • Stream Unlocked
            </span>
            <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#f8fafc', margin: '6px 0 8px' }}>
              TV Successfully Activated!
            </h3>
            <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '22px' }}>
              Your television screen has refreshed and unlocked full <strong>4K UHD HDR</strong> streaming
              access. This device is now linked to your account.
            </p>

            {/* Paired Device Live Badge Box */}
            <div
              style={{
                backgroundColor: 'rgba(18, 14, 26, 0.95)',
                border: '1.5px solid rgba(16, 185, 129, 0.35)',
                borderRadius: '16px',
                padding: '16px 20px',
                marginBottom: '20px',
                textAlign: 'left',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(225, 29, 72, 0.2)',
                      border: '1px solid rgba(225, 29, 72, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Tv size={20} color="#fda4af" />
                  </div>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '14.5px', fontWeight: 800, color: '#ffffff' }}>
                      {selectedModel}
                    </h5>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                      {selectedLocation} • Code: <strong style={{ color: '#fda4af' }}>{code}</strong>
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      boxShadow: '0 0 8px #10b981',
                    }}
                  />
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>STREAMING 4K</span>
                </div>
              </div>

              {/* Room Location Quick Switcher */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px', marginTop: '6px' }}>
                <span style={{ fontSize: '11px', color: '#71717a', display: 'block', marginBottom: '6px' }}>
                  Need to change TV location name?
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {ROOM_PRESETS.map((room) => {
                    const isSel = selectedLocation === room;
                    return (
                      <button
                        key={room}
                        type="button"
                        onClick={() => handleUpdateLocation(room)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: isSel ? '#e11d48' : 'rgba(255, 255, 255, 0.06)',
                          border: isSel ? '1px solid #fda4af' : '1px solid rgba(255, 255, 255, 0.1)',
                          color: isSel ? '#ffffff' : '#cbd5e1',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {room}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons: 1) Go to Connected Devices, 2) Done & Stream */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {onOpenSubscriberDevices && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenSubscriberDevices();
                  }}
                  className="btn-radiant"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '14px',
                    fontSize: '14px',
                    fontWeight: 800,
                    gap: '8px',
                  }}
                >
                  <Layers size={17} />
                  <span>View in My Connected Devices</span>
                  <ChevronRight size={17} />
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)')}
              >
                <span>Done & Start Streaming</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivationModal;
