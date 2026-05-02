"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export type VoiceLang = "en-US" | "fr-FR" | "ar"

export const VOICE_LANGS: { code: VoiceLang; label: string }[] = [
  { code: "en-US", label: "EN" },
  { code: "fr-FR", label: "FR" },
  { code: "ar", label: "AR" },
]

const ERROR_MAP: Record<string, string> = {
  "no-speech": "No speech detected — try speaking louder or reducing background noise.",
  "audio-capture": "Microphone not found. Check your device settings.",
  "not-allowed": "Microphone access denied. Allow it in your browser settings.",
  "network": "Network error during speech recognition.",
  "bad-grammar": "Could not recognize speech. Try speaking more clearly.",
  "language-not-supported": "This language is not supported by your browser.",
}

export type VoiceState = "idle" | "listening" | "error"

export interface UseVoiceInputReturn {
  voiceState: VoiceState
  interimText: string
  lang: VoiceLang
  setLang: (l: VoiceLang) => void
  startListening: () => void
  stopListening: () => void
  voiceError: string | null
  isSupported: boolean
}

export function useVoiceInput(
  onFinalTranscript: (text: string) => void,
): UseVoiceInputReturn {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle")
  const [interimText, setInterimText] = useState("")
  const [lang, setLangState] = useState<VoiceLang>("en-US")
  const [voiceError, setVoiceError] = useState<string | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)
  const shouldRestartRef = useRef(false)
  // Refs so recognition callbacks never close over stale values
  const onFinalRef = useRef(onFinalTranscript)
  const langRef = useRef(lang)

  useEffect(() => { onFinalRef.current = onFinalTranscript }, [onFinalTranscript])
  useEffect(() => { langRef.current = lang }, [lang])

  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
  }, [])

  const buildRecognition = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
    if (!SR) return null

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r: any = new SR()
    r.continuous = true       // keep recording across pauses
    r.interimResults = true   // stream live transcript
    r.maxAlternatives = 3     // pick highest-confidence result
    r.lang = langRef.current

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    r.onresult = (e: any) => {
      let interim = ""
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i]
        // pick the alternative with the highest confidence score
        let best = result[0]
        for (let j = 1; j < result.length; j++) {
          if (result[j].confidence > best.confidence) best = result[j]
        }
        if (result.isFinal) {
          onFinalRef.current(best.transcript.trim())
          setInterimText("")
        } else {
          interim += best.transcript
        }
      }
      if (interim) setInterimText(interim)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    r.onerror = (e: any) => {
      if (e.error === "aborted") return // user-triggered stop, not an error
      shouldRestartRef.current = false
      setVoiceState("error")
      setVoiceError(ERROR_MAP[e.error] ?? `Speech recognition error: ${e.error}`)
      setInterimText("")
    }

    r.onend = () => {
      if (shouldRestartRef.current) {
        // Auto-restart after a natural pause — keeps the session alive
        try { r.start() } catch { /* already started */ }
      } else {
        setVoiceState("idle")
        setInterimText("")
      }
    }

    return r
  }, [])

  const startListening = useCallback(() => {
    if (!isSupported) return
    setVoiceError(null)
    setInterimText("")
    const r = buildRecognition()
    if (!r) return
    recognitionRef.current = r
    shouldRestartRef.current = true
    try {
      r.start()
      setVoiceState("listening")
    } catch {
      setVoiceError("Could not access the microphone.")
      setVoiceState("error")
    }
  }, [buildRecognition, isSupported])

  const stopListening = useCallback(() => {
    shouldRestartRef.current = false
    recognitionRef.current?.stop()
    setVoiceState("idle")
    setInterimText("")
  }, [])

  const setLang = useCallback((l: VoiceLang) => {
    setLangState(l)
    // If currently recording, stop — next startListening will use the new language
    if (shouldRestartRef.current) {
      shouldRestartRef.current = false
      recognitionRef.current?.stop()
      setVoiceState("idle")
      setInterimText("")
    }
  }, [])

  useEffect(() => {
    return () => {
      shouldRestartRef.current = false
      recognitionRef.current?.stop()
    }
  }, [])

  return { voiceState, interimText, lang, setLang, startListening, stopListening, voiceError, isSupported }
}
