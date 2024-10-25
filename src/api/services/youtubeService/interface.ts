export interface IVideoThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}
export interface IVideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: IVideoThumbnail;
    medium: IVideoThumbnail;
    high: IVideoThumbnail;
    standard: IVideoThumbnail;
    maxres: IVideoThumbnail;
  };
  channelTitle: string;
  tags: Array<string>;
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
}

export interface IVideoStat {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface IVideoDetails {
  kind: string;
  etag: string;
  items: Array<{
    kind: string;
    etag: string;
    id: string;
    snippet: IVideoSnippet;
    statistics: IVideoStat;
  }>;
  pageInfo: IPageInfo;
}

export interface IVideoComments {
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: IPageInfo;
  items: Array<{
    kind: string;
    etag: string;
    id: string;
    snippet: {
      channelId: string;
      videoId: string;
      topLevelComment: {
        kind: string;
        etag: string;
        id: string;
        snippet: {
          channelId: string;
          videoId: string;
          textDisplay: string;
          textOriginal: string;
          authorDisplayName: string;
          authorProfileImageUrl: string;
          authorChannelUrl: string;
          authorChannelId: {
            value: string;
          };
          canRate: boolean;
          viewerRating: string;
          likeCount: number;
          publishedAt: string;
          updatedAt: string;
        };
      };
      canReply: boolean;
      totalReplyCount: number;
      isPublic: boolean;
    };
  }>;
}
