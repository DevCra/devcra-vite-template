// import { useCallback, useRef, useState } from "react";
// import STTRecognizerAzure from "@/services/stt-tts/SpeechToTextAzure";
// import { RubiconApi } from "@/api/rubiconApi";
// import type { StartSTTOptions } from "@/types/stt-tts";

// const LOCAL_STORAGE_AZURE_KEY = "AZURE_STT";
// const TOKEN_EXPIRE_TIME = 1_000 * 600; // 600초

// interface VoiceTokenResponse {
//   token: string;
//   region: string;
// }

// // Azure 기반 STT
// const useSTTAzure = () => {
//   const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

//   const sttRecognizerRef = useRef<STTRecognizerAzure | null>(null);

//   const fetchVoiceToken = useCallback(async () => {
//     const rubiconApi = RubiconApi.getInstance({});

//     const { token, region } = await rubiconApi.get<VoiceTokenResponse>({
//       url: "api/chat/voice/token",
//     });

//     return { token, region };
//   }, []);

//   const setupSTT = useCallback(
//     async (
//       { callbackAfterMicPermission } = {
//         callbackAfterMicPermission: () => {},
//       },
//     ) => {
//       const sttRecognizer = new STTRecognizerAzure();
//       sttRecognizerRef.current = sttRecognizer;

//       let [voiceToken, voiceRegion] = ["", ""];

//       if (!localStorage.getItem(LOCAL_STORAGE_AZURE_KEY)) {
//         const today = Date.now();
//         const { token, region } = await fetchVoiceToken();
//         [voiceToken, voiceRegion] = [token, region];
//         localStorage.setItem(
//           LOCAL_STORAGE_AZURE_KEY,
//           JSON.stringify({
//             timeStamp: today,
//             token,
//             region,
//           }),
//         );
//       } else {
//         const today = Date.now();
//         const { timeStamp, token, region } = JSON.parse(
//           localStorage.getItem(LOCAL_STORAGE_AZURE_KEY) ?? "{}",
//         );
//         if (today - timeStamp >= TOKEN_EXPIRE_TIME) {
//           const { token, region } = await fetchVoiceToken();
//           [voiceToken, voiceRegion] = [token, region];
//           localStorage.setItem(
//             LOCAL_STORAGE_AZURE_KEY,
//             JSON.stringify({
//               timeStamp: today,
//               token,
//               region,
//             }),
//           );
//         } else {
//           [voiceToken, voiceRegion] = [token, region];
//         }
//       }

//       sttRecognizerRef.current.setup({
//         token: voiceToken,
//         region: voiceRegion,
//         callbackMediaStream: (mediaStream) => {
//           setMediaStream(mediaStream);
//         },
//         callbackAfterMicPermission,
//       });
//     },
//     [fetchVoiceToken],
//   );

//   const cleanupSTT = useCallback(() => {
//     sttRecognizerRef.current?.cleanup();
//     sttRecognizerRef.current = null;
//     mediaStream?.getTracks().forEach((track) => track.stop());
//     setMediaStream(null);
//   }, [mediaStream]);

//   const startSTT = useCallback(
//     ({
//       callbackRecognizing: cbRecognizing,
//       callbackRecognized: cbRecognized,
//       callbackCanceled: cbCanceled,
//       callbackSessionStopped: cbSessionStopped,
//     }: StartSTTOptions) => {
//       try {
//         sttRecognizerRef.current?.start({
//           // 음성 인식 중
//           callbackRecognizing: (text) => {
//             console.log("Recognizing:", text);
//             cbRecognizing?.(text);
//           },
//           // 음성 인식 완료
//           callbackRecognized: (text, isRecognized) => {
//             console.log("Recognized:", text);
//             cbRecognized?.(text, isRecognized);
//           },
//           // 음성 인식 중단
//           callbackCanceled: (reason) => {
//             console.log("Canceled reason:", reason);
//             cbCanceled?.(reason);
//           },
//           // 음성 인식 세션 중단
//           callbackSessionStopped: () => {
//             console.log("Session Stopped");
//             cbSessionStopped?.();
//           },
//         });
//       } catch (error: unknown) {
//         console.error(error instanceof Error ? error : String(error));
//       }
//     },
//     [],
//   );

//   const stopSTT = useCallback(() => {
//     sttRecognizerRef.current?.stop();
//   }, []);

//   return {
//     sttRecognizerRef,
//     mediaStream,
//     setupSTT,
//     cleanupSTT,
//     startSTT,
//     stopSTT,
//   };
// };

// export default useSTTAzure;
