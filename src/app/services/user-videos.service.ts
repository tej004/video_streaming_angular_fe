import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { IVideoCreation, IVideoFormUpdate, Video } from '../models/video.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserVideosService {
  private videosSubject = new BehaviorSubject<Video[]>([]);
  videos$ = this.videosSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getAllVideos(): Observable<Video[]> {
    const headers = this.authenticationService.getHttpHeaders();
    return this.http
      .get<Video[]>(`${environment.API_URL}core/videos/`, { headers })
      .pipe(tap((videos) => this.videosSubject.next(videos)));
  }

  getAllVideosByGenre(): Observable<{ [key: string]: Video[] }> {
    const headers = this.authenticationService.getHttpHeaders();
    return this.http.get<{ [key: string]: Video[] }>(
      `${environment.API_URL}core/videos/group-by-genre/`,
      { headers }
    );
  }

  createVideo(video: IVideoCreation): Observable<IVideoCreation> {
    const formData = new FormData();
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authenticationService.getToken() || ''}`
    );

    formData.append('title', video.title);
    formData.append('description', video.description);
    formData.append('video_file_object', video.video_file_object);
    formData.append('thumbnail_file_object', video.thumbnail_file_object);
    formData.append('genre', video.genre);

    return this.http
      .post<IVideoCreation>(
        `${environment.API_URL}core/users/video-creation/`,
        formData,
        { headers }
      )
      .pipe(
        tap(() => this.getAllVideos().subscribe()) // Refresh the videos list
      );
  }

  updateVideo(video: IVideoFormUpdate): Observable<IVideoFormUpdate> {
    const formData = new FormData();
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authenticationService.getToken() || ''}`
    );

    console.log(video?.thumbnail_file_object, 'object');
    console.log(video?.video_file_object, 'vidobject');

    formData.append('id', video.id.toString());
    formData.append('title', video.title);
    formData.append('description', video.description);
    formData.append('genre', video.genre);

    if (video.video_file_object && video.video_file_object instanceof File) {
      formData.append('video_file_object', video.video_file_object);
    }

    if (
      video.thumbnail_file_object &&
      video.thumbnail_file_object instanceof File
    ) {
      formData.append('thumbnail_file_object', video.thumbnail_file_object);
    }

    return this.http
      .post<IVideoFormUpdate>(
        `${environment.API_URL}core/videos/update-video/`,
        formData,
        { headers }
      )
      .pipe(
        tap(() => this.getAllVideos().subscribe()) // Refresh the videos list
      );
  }

  deleteVideo(id: number): Observable<void> {
    const headers = this.authenticationService.getHttpHeaders();
    return this.http
      .delete<void>(`${environment.API_URL}core/videos/${id}/`, { headers })
      .pipe(
        tap(() => this.getAllVideos().subscribe()) // Refresh the videos list
      );
  }
}
