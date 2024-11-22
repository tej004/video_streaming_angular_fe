export interface VideoOwner {
  id: number;
  username: string;
  email: string;
}

export interface Video {
  id: number;
  user: VideoOwner;
  genre: string;
  user_id: number;
  title: string;
  description: string;
  video_file: string;
  thumbnail: string | null;
  uploaded_at: string;
}

export interface IVideoCreation {
  title: string;
  description: string;
  video_file_object: File;
  thumbnail_file_object: File;
  genre: string;
}

export interface IVideoFormUpdate {
  id: number;
  title: string;
  description: string;
  genre: string;
  video_file_object?: File;
  thumbnail_file_object?: File;
}

export const GENRE_CHOICES = [
  'ACTION',
  'COMEDY',
  'DRAMA',
  'HORROR',
  'SCIFI',
  'DOCUMENTARY',
];
