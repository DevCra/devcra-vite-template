import type { AudioConstraints, SetupSTTOptions, StartSTTOptions } from "@/types/stt-tts";

// Return Zero 기반 STT
class STTRecognizerReturnZero {
  private ws: WebSocket | null = null;
  private constraints: AudioConstraints;
  private mediaStream: MediaStream | null = null;
  private processor: ScriptProcessorNode | null = null;
  private audioContext: AudioContext | null = null;
  private callbackAfterMicPermission?: () => void;
  private callbackRecognizing?: (text: string) => void;
  private callbackRecognized?: (text: string, isRecognized?: boolean) => void;

  constructor() {
    this.constraints = {
      video: false,
      audio: {
        sampleRate: 8_000,
        sampleSize: 2,
      },
    };
  }

  getMediaStream() {
    return this.mediaStream;
  }

  async getMedia(constraints: AudioConstraints) {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Invalid media devices.");
      }

      // constraints - audio: true
      await navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
        this.mediaStream = mediaStream;
        this.callbackAfterMicPermission?.();
      });
    } catch (err) {
      console.error(err);
    }
  }

  async setup({ callbackMediaStream, callbackAfterMicPermission }: SetupSTTOptions) {
    this.callbackAfterMicPermission = callbackAfterMicPermission;

    await this.getMedia(this.constraints);
    await callbackMediaStream?.(this.mediaStream);
  }

  cleanup() {
    this.processor?.disconnect();
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.ws?.close();
  }

  start({ callbackRecognizing, callbackRecognized }: StartSTTOptions) {
    try {
      this.callbackRecognizing = callbackRecognizing;
      this.callbackRecognized = callbackRecognized;

      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
          sampleRate: this.constraints.audio.sampleRate,
        });
      }

      if (!this.mediaStream) {
        throw new Error("MediaStream not existed.");
      }

      if (!import.meta.env.VITE_RUBICON_WS_URL) {
        throw new Error("RUBICON_WS_URL 환경변수가 설정되지 않았습니다.");
      }

      const source = this.audioContext.createMediaStreamSource(this.mediaStream);

      this.processor = this.audioContext.createScriptProcessor(4_096, 1, 1);

      source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);

      this.ws = new WebSocket(`${import.meta.env.VITE_RUBICON_WS_URL}/ws/stt`);

      this.ws.onopen = () => {
        console.log("Connected WebSocket.");
      };

      this.ws.onmessage = (event) => {
        const { seq, text, final } = JSON.parse(event.data) as {
          seq: number;
          text: string;
          final: boolean;
        };

        if (!final) {
          this.callbackRecognizing?.(text);
        } else {
          this.callbackRecognized?.(text, true);
        }
      };

      this.ws.onclose = () => {
        console.log("WebSocket 연결 종료");
        this.processor?.disconnect();
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket 오류:", error);
        this.processor?.disconnect();
      };

      this.processor.onaudioprocess = (event) => {
        const input = event.inputBuffer.getChannelData(0);
        const pcmData = this.convertToPCM(input);
        this.ws?.send(pcmData);
      };
    } catch (error) {
      console.error(error);
    }
  }

  stop() {
    // stop
    this.cleanup();
  }

  private convertToPCM(input: Float32Array) {
    const pcmData = new DataView(new ArrayBuffer(input.length * this.constraints.audio.sampleSize));

    for (let i = 0; i < input.length; i += 1) {
      let sample = Math.max(-1, Math.min(1, input[i]));
      sample = sample < 0 ? sample * 32_768 : sample * 32_767;
      pcmData.setInt16(i * this.constraints.audio.sampleSize, sample, true);
    }

    return pcmData.buffer;
  }
}

export default STTRecognizerReturnZero;
