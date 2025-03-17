export type STTMode = "Azure" | "ReturnZero";
export type TTSMode = "NaverClova";

export interface AudioConstraints {
  video: boolean;
  audio: {
    sampleRate: number;
    sampleSize: number; // bytes per sample
    channelCount?: number;
    volume?: number;
  };
}

export interface SetupSTTOptions {
  token?: string;
  region?: string;
  callbackMediaStream?: (stream: MediaStream | null) => void; // MediaStream 전달
  callbackAfterMicPermission?: () => void; // 마이크 권한 설정 이후
}

export interface StartSTTOptions {
  callbackRecognizing?: (text: string) => void; // 음성 인식 중
  callbackRecognized?: (text: string, isRecognized?: boolean) => void; // 음성 인식 완료
  callbackCanceled?: (reason: string) => void; // 음성 인식 중단
  callbackSessionStopped?: () => void; // 음성 인식 세션 중단
}

export interface StartTTSOptions {
  text: string;
  callbackAudioStart?: () => void;
  callbackAudioEnd?: (isSuccess?: boolean) => void;
  callbackSuccess?: () => void;
  callbackError?: (error: unknown) => void;
}
