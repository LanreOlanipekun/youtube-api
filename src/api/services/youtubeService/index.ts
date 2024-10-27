import { Http, HttpResponseType } from '../../../modules/http';
import Secret from '../../../modules/secret';

import { YoutubeErrorHandler } from '../../../modules/exceptions';
import secret from '../../../modules/secret';
import { getQueryString } from '../../../utils';
import { IVideoComments, IVideoDetails } from './interface';

class YoutubeService {
  private http: Http;
  private apiKey: string;

  private readonly apiEndpoints = {
    video: 'videos',
    comments: 'commentThreads',
  };

  constructor() {
    this.http = new Http(Secret.Urls.youtubeBaseUrl);
    this.apiKey = secret.Urls.googleApiKey;
  }

  /**
   * Retrieves video details by ID from the YouTube API.
   *
   * @param id - The ID of the video to retrieve details for.
   * @returns A promise that resolves with the video details.
   * @throws Throws a YoutubeErrorHandler if an error occurs during the retrieval process.
   */
  public async getVideoById(id: string): HttpResponseType<IVideoDetails> {
    try {
      return await this.http.get(
        `${this.apiEndpoints.video}${getQueryString({
          part: 'snippet,statistics',
          id,
          key: this.apiKey,
        })}`,
        {},
        'GET_VIDEO_BY_ID'
      );
    } catch (err) {
      throw new YoutubeErrorHandler(err);
    }
  }

  /**
   * Retrieves the top-level comments for a specific video.
   *
   * @param videoId - The ID of the video to retrieve comments for.
   * @param pageToken - The token for the next page of comments (default is empty).
   * @returns A promise that resolves to an array of top-level comments for the video.
   * @throws {YoutubeErrorHandler} If an error occurs during the retrieval process.
   */
  public async getTopLevelComments(
    videoId: string,
    pageToken = ''
  ): HttpResponseType<IVideoComments> {
    try {
      return await this.http.get(
        `${this.apiEndpoints.comments}${getQueryString({
          part: 'snippet',
          videoId,
          key: this.apiKey,
          pageToken,
        })}`,
        {},
        'GET_VIDEO_COMMENTS'
      );
    } catch (err) {
      throw new YoutubeErrorHandler(err);
    }
  }
}

const youtubeService = new YoutubeService();
export default youtubeService;
