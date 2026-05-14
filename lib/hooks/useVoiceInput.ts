"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PermissionState = "granted" | "denied" | "prompt";
type PermissionName = "microphone" | "camera" | "geolocation" | "notifications";

export type VoiceLang = "en-US" | "fr-FR" | "ar";

export const VOICE_LANGS: { code: VoiceLang; label: string }[] = [
  { code: "en-US", label: "EN" },
  { code: "fr-FR", label: "FR" },
  { code: "ar", label: "AR" },
];

const ERROR_MAP: Record<string, string> = {
  "no-speech": "No speech detected — try speaking louder.",
  "audio-capture": "Microphone not found.",
  "not-allowed": "Microphone access denied.",
  "network": "Network error during recognition.",
  "language-not-supported": "Language not supported by your browser.",
};

export type VoiceState = "idle" | "listening" | "error";

export interface UseVoiceInputReturn {
  voiceState: VoiceState;
  interimText: string;
  lang: VoiceLang;
  setLang: (l: VoiceLang) => void;
  startListening: () => void;
  stopListening: () => void;
  voiceError: string | null;
  isSupported: boolean;
  permissionState: PermissionState | 'loading';
  requestPermission: () => Promise<void>;
}

export function useVoiceInput(onFinalTranscript: (text: string) => void): UseVoiceInputReturn {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [interimText, setInterimText] = useState("");
  const [lang, setLangState] = useState<VoiceLang>("en-US");
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [permissionState, setPermissionState] = useState<PermissionState | 'loading'>('loading');

  const recognitionRef = useRef<any>(null);
  const shouldRestartRef = useRef(false);
  const onFinalRef = useRef(onFinalTranscript);
  const langRef = useRef(lang);

  const startListeningRef = useRef<() => void>(undefined);
  const stopListeningRef = useRef<() => void>(undefined);

  useEffect(() => { onFinalRef.current = onFinalTranscript; }, [onFinalTranscript]);
  useEffect(() => { 
    langRef.current = lang;
    if (voiceState === "listening") {
      stopListeningRef.current?.();
      setTimeout(() => startListeningRef.current?.(), 250);
    }
  }, [lang]);

  const requestPermission = useCallback(async () => {
    console.log('🎤 requestPermission function called');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { noiseSuppression: true, echoCancellation: true, autoGainControl: true },
      });
      console.log('Manual microphone access granted');
      stream.getTracks().forEach(track => track.stop());
      
      const status = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      setPermissionState(status.state);
    } catch (err) {
      console.log('Manual microphone access failed:', err);
      setPermissionState('denied');
    }
  }, []);

  useEffect(() => {
    navigator.permissions.query({ name: 'microphone' as PermissionName }).then((status) => {
      console.log('Initial microphone permission:', status.state);
      setPermissionState(status.state);
      status.onchange = () => {
        console.log('Microphone permission changed to:', status.state);
        setPermissionState(status.state);
      };
    }).catch(err => {
      console.log('Permission query failed:', err);
      setPermissionState('prompt'); // Assume prompt if can't query
    });
  }, []);

  useEffect(() => {
    const speechSupported = "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    const mediaSupported = "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices;
    console.log('🔊 Voice input support check:');
    console.log('  - Speech Recognition:', speechSupported, 'SpeechRecognition' in window ? 'available' : 'webkitSpeechRecognition' in window ? 'webkit available' : 'not available');
    console.log('  - Media Devices:', mediaSupported, 'mediaDevices' in navigator ? 'available' : 'not available', 'getUserMedia' in navigator.mediaDevices ? 'available' : 'not available');
    const supported = speechSupported && mediaSupported;
    console.log('  - Overall supported:', supported);
    setIsSupported(supported);
  }, []);

  const buildRecognition = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return null;

    const r = new SR();
    r.continuous = true;
    r.interimResults = true;
    r.lang = langRef.current;
    r.maxAlternatives = 3;

    r.onresult = (e: any) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i];
        if (result.isFinal) {
          // Pick the alternative with the highest confidence
          let best = result[0];
          for (let a = 1; a < result.length; a++) {
            if (result[a].confidence > best.confidence) best = result[a];
          }
          onFinalRef.current(best.transcript.trim());
          setInterimText("");
        } else {
          interim += result[0].transcript;
        }
      }
      setInterimText(interim);
    };

    r.onerror = (e: any) => {
      if (e.error === "aborted") return;
      // no-speech on mobile is common during pauses — just let onend auto-restart
      if (e.error === "no-speech") return;
      shouldRestartRef.current = false;
      setVoiceState("error");
      setVoiceError(ERROR_MAP[e.error] || `Error: ${e.error}`);
    };

    r.onend = () => {
      if (shouldRestartRef.current) {
        try { r.start(); } catch { setVoiceState("idle"); }
      } else {
        setVoiceState("idle");
      }
    };

    return r;
  }, []);

  const startListening = useCallback(async () => {
    console.log('🎤 startListening function called');
    if (!isSupported) {
      console.log('Speech recognition not supported');
      return;
    }

    console.log('Starting voice listening, current permission state:', permissionState);

    // Always try to get user media first - this will prompt if needed
    try {
      console.log('Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { noiseSuppression: true, echoCancellation: true, autoGainControl: true },
      });
      console.log('Microphone access granted');
      stream.getTracks().forEach(track => track.stop());
      
      // Update permission state
      const status = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      setPermissionState(status.state);
    } catch (err) {
      console.log('Microphone access failed:', err);
      setPermissionState('denied');
      setVoiceError("Microphone access denied.");
      return;
    }

    if (recognitionRef.current) recognitionRef.current.stop();

    const r = buildRecognition();
    if (!r) {
      console.log('Failed to build recognition');
      return;
    }

    recognitionRef.current = r;
    shouldRestartRef.current = true;
    try {
      console.log('Starting speech recognition...');
      r.start();
      setVoiceState("listening");
      setVoiceError(null);
    } catch (err) {
      console.log('Speech recognition start failed:', err);
      setVoiceState("error");
      setVoiceError("Microphone access failed.");
    }
  }, [isSupported, buildRecognition]);

  const stopListening = useCallback(() => {
    console.log('🎤 stopListening function called');
    shouldRestartRef.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setVoiceState("idle");
    setInterimText("");
  }, []);

  useEffect(() => {
    startListeningRef.current = startListening;
    stopListeningRef.current = stopListening;
  }, [startListening, stopListening]);

  return {
    voiceState,
    interimText,
    lang,
    setLang: setLangState,
    startListening,
    stopListening,
    voiceError,
    isSupported,
    permissionState,
    requestPermission,
  };
}