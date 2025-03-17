import TTSRecognizerNaverClova from "@/services/stt-tts/TextToSpeechNaverClova";
import { useCallback, useRef, useState } from "react";

import type { StartTTSOptions } from "@/types/stt-tts";

const useTTSNaverClova = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const ttsRecognizerRef = useRef<TTSRecognizerNaverClova | null>(null);

  const setupTTS = useCallback(() => {
    const ttsRecognizer = new TTSRecognizerNaverClova();
    ttsRecognizerRef.current = ttsRecognizer;

    setMediaStream(ttsRecognizerRef.current.getMediaStream());
  }, []);

  const cleanupTTS = useCallback(() => {
    ttsRecognizerRef.current?.cleanup();
    ttsRecognizerRef.current = null;
    mediaStream?.getTracks().forEach((track) => track.stop());
    setMediaStream(null);
  }, [mediaStream]);

  const startTTS = useCallback(
    ({
      text,
      callbackAudioStart: cbAudioStart,
      callbackAudioEnd: cbAudioEnd,
      callbackSuccess: cbSuccess,
      callbackError: cbError,
    }: StartTTSOptions) => {
      ttsRecognizerRef.current?.start({
        text,
        callbackAudioStart: () => {
          console.log("Audio Start");
          cbAudioStart?.();
        },
        callbackAudioEnd: (isSuccess) => {
          console.log("Audio End");
          cbAudioEnd?.(isSuccess);
        },
        callbackSuccess: () => {
          console.log("Audio Success");
          cbSuccess?.();
        },
        callbackError: (error) => {
          console.log("Audio Error");
          cbError?.(error);
        },
      });
    },
    [],
  );

  const stopTTS = useCallback(() => {
    ttsRecognizerRef.current?.stop();
  }, []);

  return {
    ttsRecognizerRef,
    mediaStream,
    setupTTS,
    cleanupTTS,
    startTTS,
    stopTTS,
  };
};

export default useTTSNaverClova;
