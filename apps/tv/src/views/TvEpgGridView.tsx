import React from 'react';
import { Tv, Radio, Clock, Play } from 'lucide-react';
import { Channel, MOCK_CHANNELS } from '@nexora/shared';

interface TvEpgGridViewProps {
  focusedChannelIndex: number;
  focusedProgramIndex: number;
  onTuneChannel: (channel: Channel) => void;
}

export const TvEpgGridView: React.FC<TvEpgGridViewProps> = ({
  focusedChannelIndex,
  focusedProgramIndex,
  onTuneChannel,
}) => {
  const timeSlots = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
  const channels = MOCK_CHANNELS;

  // Selected program details for the top banner
  const activeChannel = channels[focusedChannelIndex] || channels[0];
  const activeProgram = activeChannel.currentProgram;

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#050505',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 36px',
      overflow: 'hidden',
    }}>
      {/* Top Program Synopsis Banner */}
      <div style={{
        height: '120px',
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '16px',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img
            src={activeChannel.logo}
            alt={activeChannel.name}
            style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #303030' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#E50914' }}>
                CH {activeChannel.channelNumber}
              </span>
              <span className="badge badge-red">{activeChannel.resolution}</span>
              <span style={{ fontSize: '12px', color: '#B3B3B3' }}>
                {activeProgram?.startTime} - {activeProgram?.endTime}
              </span>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '4px 0' }}>
              {activeProgram?.title || activeChannel.name}
            </h2>
            <p style={{ fontSize: '13px', color: '#B3B3B3', margin: 0, maxWidth: '700px' }}>
              {activeProgram?.description || 'Satellite feed direct transcode.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onTuneChannel(activeChannel)}
          style={{
            background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 24px',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(229, 9, 20, 0.45)',
          }}
        >
          <Play size={16} fill="#FFFFFF" />
          <span>Tune Channel [OK]</span>
        </button>
      </div>

      {/* Interactive EPG Timeline Grid */}
      <div style={{
        flex: 1,
        backgroundColor: '#0D0D0D',
        border: '1px solid #303030',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Time Header Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '220px repeat(7, 1fr)',
          backgroundColor: '#050505',
          borderBottom: '1px solid #303030',
          padding: '12px 16px',
          fontSize: '13px',
          fontWeight: 700,
          color: '#B3B3B3',
        }}>
          <div>CHANNELS</div>
          {timeSlots.map((time) => (
            <div key={time} style={{ textAlign: 'center' }}>
              {time}
            </div>
          ))}
        </div>

        {/* Channels Rows */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {channels.map((ch, chIdx) => {
            const isChannelFocused = focusedChannelIndex === chIdx;

            return (
              <div
                key={ch.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '220px repeat(7, 1fr)',
                  borderBottom: '1px solid #303030',
                  backgroundColor: isChannelFocused ? 'rgba(229, 9, 20, 0.08)' : 'transparent',
                  minHeight: '68px',
                  alignItems: 'center',
                }}
              >
                {/* Channel Label */}
                <div style={{
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderRight: '1px solid #303030',
                }}>
                  <img src={ch.logo} alt={ch.name} style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: isChannelFocused ? '#FF2B36' : '#FFFFFF' }}>
                      {ch.channelNumber}. {ch.name}
                    </div>
                    <div style={{ fontSize: '10px', color: '#B3B3B3' }}>{ch.category}</div>
                  </div>
                </div>

                {/* Program Slots */}
                <div
                  style={{
                    gridColumn: 'span 4',
                    padding: '8px 12px',
                    margin: '4px',
                    borderRadius: '8px',
                    backgroundColor: isChannelFocused && focusedProgramIndex === 0 ? 'rgba(229, 9, 20, 0.2)' : '#151515',
                    border: isChannelFocused && focusedProgramIndex === 0 ? '2px solid #E50914' : '1px solid #303030',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxShadow: isChannelFocused && focusedProgramIndex === 0 ? '0 0 15px rgba(229, 9, 20, 0.45)' : 'none',
                  }}
                  onClick={() => onTuneChannel(ch)}
                >
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ch.currentProgram?.title || 'Main Program Stream'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#FF2B36', fontWeight: 600 }}>
                    {ch.currentProgram ? `${ch.currentProgram.startTime} - ${ch.currentProgram.endTime} (${ch.currentProgram.category})` : 'Live 24/7'}
                  </div>
                </div>

                <div
                  style={{
                    gridColumn: 'span 3',
                    padding: '8px 12px',
                    margin: '4px',
                    borderRadius: '8px',
                    backgroundColor: isChannelFocused && focusedProgramIndex === 1 ? 'rgba(229, 9, 20, 0.15)' : '#151515',
                    border: isChannelFocused && focusedProgramIndex === 1 ? '2px solid #FF2B36' : '1px solid #303030',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                  onClick={() => onTuneChannel(ch)}
                >
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#B3B3B3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ch.nextProgram?.title || 'Next Transmission'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#737373' }}>
                    {ch.nextProgram ? `${ch.nextProgram.startTime} - ${ch.nextProgram.endTime}` : 'Upcoming'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
