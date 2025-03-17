import { type Dispatch, type SetStateAction, useCallback, useEffect, useState } from "react";

// 단위: ms
export const PLAYER_MIN_TIME = 0;
export const PLAYER_PLAY_SPEED = 10_000; // 10s

export type UsePlayerResponse = {
  currentPlayerTime: number;
  setCurrentPlayerTime: Dispatch<SetStateAction<number>>;
  isPlayerPlaying: boolean;
  onPlayerPlay: (type: "Forward" | "Backward" | "PlayOrStop") => () => void;
  startPlay: (speed: number) => void;
  stopPlay: () => void;
  restartPlay: (startedAt?: number) => void;
  totalTime: number;
  tickTime: number;
};

interface Props {
  totalTime: number; // 전체 영상 시간
  tickTime: number; // tick (setInterval 주기)
  speedTimes?: number; // 배속
}

const usePlayer = ({ totalTime, tickTime, speedTimes = 1 }: Props) => {
  const [currentPlayerTime, setCurrentPlayerTime] = useState(PLAYER_MIN_TIME);
  const [isPlayerPlaying, setPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [isMoved, setMoved] = useState(false);

  const onPlayerPlay = (type: "Forward" | "Backward" | "PlayOrStop") => () => {
    if (type === "Forward") {
      stopPlay();
      setCurrentPlayerTime((prev) =>
        Math.min(prev < totalTime ? prev + PLAYER_PLAY_SPEED : prev, totalTime),
      );
      setMoved(true);
      return;
    }

    if (type === "Backward") {
      stopPlay();
      setCurrentPlayerTime((prev) =>
        Math.max(PLAYER_MIN_TIME, prev > PLAYER_MIN_TIME ? prev - PLAYER_PLAY_SPEED : prev),
      );
      setMoved(true);
      return;
    }

    // PlayOrStop
    isPlayerPlaying ? stopPlay() : startPlay(speedTimes);
  };

  const startPlay = useCallback(
    (speed: number) => {
      let prevTimestamp = Date.now();

      const id = window.setInterval(() => {
        if (currentPlayerTime >= totalTime) {
          return;
        }

        const currentTimestamp = Date.now();
        const timestampDiff = currentTimestamp - prevTimestamp;

        prevTimestamp = currentTimestamp;

        setCurrentPlayerTime((prev) => Math.min(prev + timestampDiff * speed, totalTime));
      }, tickTime);

      setIntervalId(id);
      setPlaying(true);
    },
    [currentPlayerTime, tickTime, totalTime],
  );

  const stopPlay = useCallback(() => {
    if (!intervalId) {
      return;
    }

    if (isPlayerPlaying) {
      clearInterval(intervalId);
      setPlaying(false);
    }
  }, [intervalId, isPlayerPlaying]);

  const restartPlay = (startedAt = 0) => {
    stopPlay();
    setCurrentPlayerTime(startedAt);
    setMoved(true);
  };

  useEffect(() => {
    return () => {
      if (!intervalId) {
        return;
      }

      clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    // console.log('currentPlayerTime', currentPlayerTime);
    if (currentPlayerTime >= totalTime) {
      stopPlay();
      setCurrentPlayerTime(0);
    }
  }, [currentPlayerTime, totalTime, stopPlay]);

  useEffect(() => {
    // Forward, Backward로 시간 변경 시 멈추고 다시 실행하는 로직
    // Restart 로직
    // console.log(isMoved);
    if (isMoved) {
      startPlay(speedTimes);
      setMoved(false);
    }
  }, [isMoved, startPlay, setMoved, speedTimes]);

  return {
    currentPlayerTime,
    setCurrentPlayerTime,
    isPlayerPlaying,
    onPlayerPlay,
    startPlay,
    stopPlay,
    restartPlay,
    totalTime,
    tickTime,
  };
};

export default usePlayer;
