import STTRecognizerReturnZero from "@/services/stt-tts/SpeechToTextReturnZero";
import { useCallback, useRef, useState } from "react";

import type { StartSTTOptions } from "@/types/stt-tts";

// Return Zero 기반 STT
const useSTTReturnZero = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const sttRecognizerRef = useRef<STTRecognizerReturnZero | null>(null);

  const setupSTT = useCallback(
    async (
      { callbackAfterMicPermission } = {
        callbackAfterMicPermission: () => {},
      },
    ) => {
      const sttRecognizer = new STTRecognizerReturnZero();
      sttRecognizerRef.current = sttRecognizer;

      sttRecognizerRef.current.setup({
        callbackMediaStream: (mediaStream) => {
          setMediaStream(mediaStream);
        },
        callbackAfterMicPermission,
      });
    },
    [],
  );

  const cleanupSTT = useCallback(() => {
    sttRecognizerRef.current?.cleanup();
    sttRecognizerRef.current = null;
    mediaStream?.getTracks().forEach((track) => track.stop());
    setMediaStream(null);
  }, [mediaStream]);

  const startSTT = useCallback(
    ({ callbackRecognizing: cbRecognizing, callbackRecognized: cbRecognized }: StartSTTOptions) => {
      try {
        sttRecognizerRef.current?.start({
          callbackRecognizing: (text) => {
            cbRecognizing?.(text);
          },
          callbackRecognized: (text) => {
            cbRecognized?.(text);
          },
        });
      } catch (error: unknown) {
        console.error(error instanceof Error ? error : String(error));
      }
    },
    [],
  );

  const stopSTT = useCallback(() => {
    sttRecognizerRef.current?.stop();
  }, []);

  return {
    sttRecognizerRef,
    mediaStream,
    setupSTT,
    cleanupSTT,
    startSTT,
    stopSTT,
  };
};

export default useSTTReturnZero;
