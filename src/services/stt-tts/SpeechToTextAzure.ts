// import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

// import type { AudioConstraints, SetupSTTOptions, StartSTTOptions } from "@/types/stt-tts";

// // Azure 기반 STT
// class STTRecognizerAzure {
//   private SpeechSDK: typeof SpeechSDK;
//   private constraints: AudioConstraints;
//   private mediaStream: MediaStream | null = null;
//   private recognizer: SpeechSDK.SpeechRecognizer | null = null;
//   private speechConfig?: SpeechSDK.SpeechConfig;
//   private stopRecognitionTimer: number | null = null;
//   private callbackAfterMicPermission?: () => void;
//   private callbackRecognizing?: (text: string) => void;
//   private callbackRecognized?: (text: string, isRecognized?: boolean) => void;
//   private callbackCanceled?: (reason: string) => void;
//   private callbackSessionStopped?: () => void;

//   constructor() {
//     this.SpeechSDK = SpeechSDK;
//     this.constraints = {
//       video: false,
//       audio: {
//         channelCount: 1,
//         sampleRate: 16_000,
//         sampleSize: 16,
//         volume: 1,
//       },
//     };
//   }

//   getMediaStream() {
//     return this.mediaStream;
//   }

//   async getMedia(constraints: AudioConstraints) {
//     try {
//       if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//         throw new Error("Invalid media devices.");
//       }

//       // constraints - audio: true
//       await navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
//         this.mediaStream = mediaStream;
//         this.createRecognizer(this.mediaStream);
//         this.callbackAfterMicPermission?.();
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   createRecognizer(audioStream: MediaStream) {
//     if (!this.speechConfig) {
//       throw new Error("SpeechConfig is not initialized.");
//     }

//     const audioConfig = this.SpeechSDK.AudioConfig.fromStreamInput(audioStream);

//     this.recognizer = new this.SpeechSDK.SpeechRecognizer(this.speechConfig, audioConfig);

//     this.recognizer.recognizing = (s, e) => {
//       this.callbackRecognizing?.(e.result.text);
//     };

//     this.recognizer.recognized = (s, e) => {
//       if (e.result.reason === this.SpeechSDK.ResultReason.RecognizedSpeech) {
//         this.callbackRecognized?.(e.result.text, true);
//       } else if (e.result.reason === this.SpeechSDK.ResultReason.NoMatch) {
//         this.callbackRecognized?.("", false);
//         console.log("NOMATCH: Speech could not be recognized.");
//       }
//     };

//     this.recognizer.canceled = (s, e) => {
//       this.callbackCanceled?.(e.reason.toString());
//       console.log(`CANCELED: Reason=${e.reason}`);
//       if (e.reason === this.SpeechSDK.CancellationReason.Error) {
//         console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
//         console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
//       }
//       this.stop();
//     };

//     this.recognizer.sessionStopped = (s, e) => {
//       this.callbackSessionStopped?.();
//       console.log("Session stopped event.");
//     };
//   }

//   async setup({ token, region, callbackMediaStream, callbackAfterMicPermission }: SetupSTTOptions) {
//     if (!token || !region) {
//       return;
//     }

//     this.callbackAfterMicPermission = callbackAfterMicPermission;

//     this.speechConfig = this.SpeechSDK.SpeechConfig.fromAuthorizationToken(token, region);

//     this.speechConfig.speechRecognitionLanguage = "ko-KR";

//     this.speechConfig.setProperty(
//       SpeechSDK.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs,
//       "0", // 무음이어도 speech 종료되지 않도록 0초로 지정
//     );

//     if (!this.recognizer) {
//       await this.getMedia(this.constraints);
//       await callbackMediaStream?.(this.mediaStream);
//     }
//   }

//   cleanup() {
//     this.recognizer?.stopContinuousRecognitionAsync();
//     this.recognizer?.close();
//     this.recognizer = null;
//   }

//   start({
//     callbackRecognizing,
//     callbackRecognized,
//     callbackCanceled,
//     callbackSessionStopped,
//   }: StartSTTOptions) {
//     this.callbackRecognizing = callbackRecognizing;
//     this.callbackRecognized = callbackRecognized;
//     this.callbackCanceled = callbackCanceled;
//     this.callbackSessionStopped = callbackSessionStopped;

//     if (this.stopRecognitionTimer) {
//       clearTimeout(this.stopRecognitionTimer);
//       this.stopRecognitionTimer = null;
//     }

//     this.recognizer?.startContinuousRecognitionAsync();
//   }

//   stop() {
//     this.stopRecognitionTimer = window.setTimeout(() => {
//       // 버튼을 떼서 종료 시 음성 마지막 문장이 제대로 인식이 안되는 이슈로 추가
//       this.recognizer?.stopContinuousRecognitionAsync();
//       this.stopRecognitionTimer = null;
//     }, 100);
//   }
// }

// export default STTRecognizerAzure;
