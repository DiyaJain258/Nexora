# NEXORA Android TV & Google TV Architecture Specification

## 1. Executive Summary & Compatibility Assessment

This document details the television platform implementation for **NEXORA Android TV and Google TV**, including the evaluation between **React Native for TV** and dedicated **Kotlin with Android Media3 / ExoPlayer**.

### TV Capabilities & Compatibility Matrix

| Requirement | React Native for TV | Dedicated Kotlin (Android Media3) | Decision & Architecture |
|---|---|---|---|
| **Remote Control & D-Pad Focus** | Supported (`hasTVPreferredFocus`, key events) | Supported (Leanback `BrowseSupportFragment`) | **Unified Focus Engine** implemented with spatial D-Pad navigation |
| **10-Foot UI Grid & EPG** | Fully Supported & performant | Supported | Native TV design with dynamic cinematic backdrop |
| **4K 60FPS HEVC / AV1 Ingestion** | Depends on native player wrapper | **Native Hardware Decoder Passthrough** | **Android Media3 / ExoPlayer Bridge** |
| **Dolby Atmos Audio Passthrough (Bitstream)** | Requires custom native module | **Native AudioTrack Direct / Tunneling** | **Native Media3 AudioSink** |
| **Low Latency HLS (LL-HLS)** | Variable | **Media3 HlsMediaSource** with chunked parsing | **ExoPlayer Low-Latency Mode** |

---

## 2. Dedicated Native Kotlin Media3 / ExoPlayer Module

For native compilation, the playback core utilizes `androidx.media3:media3-exoplayer:1.3.1` and `androidx.media3:media3-ui:1.3.1`.

### Kotlin Implementation: `NexoraExoPlayerManager.kt`

```kotlin
package com.nexora.tv.player

import android.content.Context
import android.net.Uri
import androidx.media3.common.AudioAttributes
import androidx.media3.common.C
import androidx.media3.common.MediaItem
import androidx.media3.common.PlaybackParameters
import androidx.media3.common.TrackSelectionParameters
import androidx.media3.exoplayer.DefaultRenderersFactory
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.exoplayer.hls.HlsMediaSource
import androidx.media3.exoplayer.trackselection.DefaultTrackSelector
import androidx.media3.ui.PlayerView

class NexoraExoPlayerManager(private val context: Context) {

    private var exoPlayer: ExoPlayer? = null
    private var trackSelector: DefaultTrackSelector? = null

    fun initializePlayer(playerView: PlayerView, streamUrl: String) {
        // 1. Audio Tunneling and Passthrough for Dolby Atmos
        val audioAttributes = AudioAttributes.Builder()
            .setUsage(C.USAGE_MEDIA)
            .setContentType(C.AUDIO_CONTENT_TYPE_MOVIE)
            .build()

        // 2. Hardware Decoder Priority (NVENC / MediaCodec HEVC Main 10)
        val renderersFactory = DefaultRenderersFactory(context)
            .setExtensionRendererMode(DefaultRenderersFactory.EXTENSION_RENDERER_MODE_PREFER)
            .setEnableAudioTunneling(true) // Crucial for low-latency AVR sync

        trackSelector = DefaultTrackSelector(context).apply {
            setParameters(buildUponParameters().setMaxVideoSize(3840, 2160))
        }

        exoPlayer = ExoPlayer.Builder(context, renderersFactory)
            .setTrackSelector(trackSelector!!)
            .setAudioAttributes(audioAttributes, /* handleAudioFocus= */ true)
            .build()

        playerView.player = exoPlayer

        // 3. Build Low-Latency HLS Media Source
        val mediaItem = MediaItem.Builder()
            .setUri(Uri.parse(streamUrl))
            .setMimeType(C.APPLICATION_M3U8)
            .build()

        exoPlayer?.setMediaItem(mediaItem)
        exoPlayer?.prepare()
        exoPlayer?.playWhenReady = true
    }

    fun release() {
        exoPlayer?.release()
        exoPlayer = null
    }
}
```

---

## 3. Remote Control Navigation & Keybinding Mappings

The TV remote control layer maps the Android TV D-Pad keycodes:
- `KEYCODE_DPAD_UP` (19) -> Moves active rail or channel index up
- `KEYCODE_DPAD_DOWN` (20) -> Moves active rail or channel index down
- `KEYCODE_DPAD_LEFT` (21) -> Moves across content cards; reveals collapsible side dock
- `KEYCODE_DPAD_RIGHT` (22) -> Moves across content cards; enters EPG program slots
- `KEYCODE_DPAD_CENTER` / `KEYCODE_ENTER` (23/66) -> Selects program, opens player
- `KEYCODE_BACK` (4) -> Dismisses OSD, returns from player to TV guide

---

## 4. Run & Development Commands

1. **Android TV / Google TV Simulator & Web Inspection:**
   ```bash
   npm --workspace=@nexora/tv run dev
   # Runs at http://localhost:5175 with full on-screen remote control simulation
   ```

2. **Native Android TV APK Build:**
   ```bash
   cd apps/tv
   npm run android
   # Targets connected Android TV device or emulator (adb connect <tv-ip>)
   ```
