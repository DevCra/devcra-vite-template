import type { StartTTSOptions } from "@/types/stt-tts";

// 네이버 클로바 기반 TTS
class TTSRecognizerNaverClova {
  private abortController: AbortController | null = null;
  private audioContext: AudioContext | null = null;
  private audioBufferSourceNode: AudioBufferSourceNode | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private mediaStreamDestination: MediaStreamAudioDestinationNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private callbackAudioStart?: () => void;
  private callbackAudioEnd?: (isSuccess?: boolean) => void;
  private callbackSuccess?: () => void;
  private callbackError?: (error: unknown) => void;

  getMediaStream() {
    return this.mediaStreamDestination ? this.mediaStreamDestination.stream : null;
  }

  // 파형 데이터 분석
  getAnalyserNode() {
    return this.analyserNode;
  }

  async start({
    text,
    callbackAudioStart,
    callbackAudioEnd,
    callbackSuccess,
    callbackError,
  }: StartTTSOptions) {
    this.callbackAudioStart = callbackAudioStart;
    this.callbackAudioEnd = callbackAudioEnd;
    this.callbackSuccess = callbackSuccess;
    this.callbackError = callbackError;

    if (!text.trim()) {
      return;
    }

    try {
      // TTS 여러 번 호출 막기
      this.stop();

      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }

      this.abortController = new AbortController();

      const baseUrl =
        import.meta.env.MODE === "default" ? import.meta.env.VITE_RUBICON_API_URL : "";
      const response = await fetch(`${baseUrl}/api/chat/voice?q=${text}`, {
        signal: this.abortController.signal,
      });

      const buffer = await response.arrayBuffer();

      if (!buffer.byteLength) {
        return;
      }

      // ArrayBuffer 디코딩
      this.audioBuffer = await this.audioContext.decodeAudioData(buffer);

      this.play(0);

      this.callbackSuccess?.();
    } catch (error) {
      this.callbackError?.(error) ?? console.error(error);
    }
  }

  // TTS 재생 (디코딩된 오디오 데이터 재생)
  private play(offset: number) {
    if (!this.audioContext || !this.audioBuffer) {
      console.error("TTS: AudioContext or AudioBuffer is not initialized.");
      return;
    }

    try {
      // AudioBufferSourceNode 생성
      this.audioBufferSourceNode = this.audioContext.createBufferSource();
      this.audioBufferSourceNode.buffer = this.audioBuffer;

      // GainNode 추가 (볼륨 조절 및 안정적인 연결을 위해 사용)
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = 1.0; // 기본 볼륨 유지

      // MediaStreamDestinationNode 생성 -> MediaStream 얻기
      this.mediaStreamDestination = this.audioContext.createMediaStreamDestination();

      // AnalyserNode 생성 -> 파형 분석
      this.analyserNode = this.audioContext.createAnalyser();
      this.analyserNode.fftSize = 256; // 분석할 주파수 영역 설정

      // 오디오 노드 연결
      this.audioBufferSourceNode.connect(gainNode); // Source → GainNode
      gainNode.connect(this.mediaStreamDestination); // GainNode → MediaStreamDestination
      gainNode.connect(this.analyserNode); // GainNode → AnalyserNode
      gainNode.connect(this.audioContext.destination); // 최종 스피커 출력

      // 재생 완료 시 이벤트
      this.audioBufferSourceNode.onended = () => {
        const isSuccess = !!this.audioBufferSourceNode;

        this.callbackAudioEnd?.(isSuccess);
        this.abortController = null;
      };

      this.audioBufferSourceNode.start(0, offset);

      this.callbackAudioStart?.();
    } catch (error) {
      console.error("Error in startPlayback:", error);
    }
  }

  stop() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }

    if (this.audioBufferSourceNode) {
      this.audioBufferSourceNode.stop();
      this.audioBufferSourceNode.disconnect();
      this.audioBufferSourceNode = null;
    }

    if (this.mediaStreamDestination) {
      this.mediaStreamDestination.disconnect();
      this.mediaStreamDestination = null;
    }

    if (this.analyserNode) {
      this.analyserNode.disconnect();
      this.analyserNode = null;
    }
  }

  cleanup() {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

export default TTSRecognizerNaverClova;
