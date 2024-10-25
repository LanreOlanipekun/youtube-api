import {
  Body,
  Controller,
  Get,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import httpStatuses from '../../httpStatuses';
import { LoggerDecorator, LoggerInterface } from '../../../modules/logger';
import { SuccessResponseObject } from '../../../modules/routes/response';
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
      const video = result.items[0];
      const responseData = {
        title: video.snippet.title,
        description: video.snippet.description,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
      };

      return new SuccessResponseObject<
        Pick<IVideoSnippet, 'title' | 'description'> &
          Pick<IVideoStat, 'viewCount' | 'likeCount'>
      >(responseData, 'Video fetched successfully');
    } catch (err) {
      this.log.error(`Route /video get with err: ${err}`);
      throw err;
    }
  }

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
      this.log.error(`Route /video/${videoId} get with err: ${err}`);
      throw err;
    }
  }
}
