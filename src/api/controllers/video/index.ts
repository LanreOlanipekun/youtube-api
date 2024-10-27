import { Controller, Get, Query, Route, SuccessResponse, Tags } from 'tsoa';
import { CommonErrorHandler } from '../../../modules/exceptions';
import { LoggerDecorator, LoggerInterface } from '../../../modules/logger';
import { SuccessResponseObject } from '../../../modules/routes/response';
import httpStatuses from '../../httpStatuses';
import youtubeService from '../../services/youtubeService';
import {
  IVideoComments,
  IVideoSnippet,
  IVideoStat,
} from '../../services/youtubeService/interface';

@Route('video')
@Tags('Video')
export class VideoController extends Controller {
  @LoggerDecorator('Controller.VIDEO')
  private log: LoggerInterface;

  /**
   * Retrieves a video by its ID.
   */
  @SuccessResponse(httpStatuses.success.code, httpStatuses.success.message)
  @Get('{id}')
  public async getVideoById(
    id: string
  ): Promise<
    SuccessResponseObject<
      Pick<IVideoSnippet, 'title' | 'description'> &
        Pick<IVideoStat, 'viewCount' | 'likeCount'>
    >
  > {
    try {
      const result = await youtubeService.getVideoById(id);

      if (!result.items.length) {
        throw new CommonErrorHandler(CommonErrorHandler.NotFound);
      }
      const video = result.items[0];
      const responseData = {
        title: video.snippet.title,
        description: video.snippet.description,
        image: video.snippet.thumbnails.maxres.url,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
      };

      return new SuccessResponseObject<
        Pick<IVideoSnippet, 'title' | 'description'> &
          Pick<IVideoStat, 'viewCount' | 'likeCount'> & { image: string }
      >(responseData, 'Video fetched successfully');
    } catch (err) {
      this.log.error(`Route /video/${id} get with err: ${err}`);
      throw err;
    }
  }

  /**
   * Retrieves the comments for a specific video based on the provided video ID and optional page token.
   */
  @SuccessResponse(httpStatuses.success.code, httpStatuses.success.message)
  @Get('comments/{videoId}')
  public async getVideoComments(
    videoId: string,
    @Query() pageToken?: string
  ): Promise<SuccessResponseObject<IVideoComments>> {
    try {
      const result = await youtubeService.getTopLevelComments(
        videoId,
        pageToken
      );

      return new SuccessResponseObject<IVideoComments>(
        result,
        'Comments loaded successfully'
      );
    } catch (err) {
      this.log.error(`Route /video/comments/${videoId} get with err: ${err}`);
      throw err;
    }
  }
}
