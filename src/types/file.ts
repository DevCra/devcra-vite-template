import { MediaType } from "@/models/Media";

export type ImageFile = {
  mediaType: MediaType.IMAGE;
  src: string;
  alt: string;
};

export type VideoFile = {
  mediaType: MediaType.VIDEO;
  src: string;
  poster: string;
};

export type AudioFile = {
  mediaType: MediaType.AUDIO;
  src: string;
};

export type MediaFile = ImageFile | VideoFile | AudioFile;
