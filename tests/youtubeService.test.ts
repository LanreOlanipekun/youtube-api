import { YoutubeErrorHandler } from '../src/modules/exceptions';
import YoutubeService from '../src/api/services/youtubeService';

// Successfully retrieves video details by valid video ID
it('should return video details when given a valid video ID', async () => {
  const id = 'G_NkExMLVwo';

  const result = await YoutubeService.getVideoById(id);
  const video = result.items[0];
  expect(video.id).toBe(id);

  expect(video.snippet.title).toBeDefined();
  expect(video.snippet.description).toBeDefined();
  expect(video.snippet.thumbnails.maxres.url).toBeDefined();
  expect(video.statistics.viewCount).toBeDefined();
  expect(video.statistics.likeCount).toBeDefined();
});

it('should throw YoutubeErrorHandler when given an invalid or empty video ID', async () => {
  const id = 'ccsdww';

  const result = await YoutubeService.getVideoById(id);
  const video = result.items[0];

  expect(video).toBeUndefined();
});

it('should return video top level comments when given a valid video ID', async () => {
  const id = 'G_NkExMLVwo';

  const result = await YoutubeService.getTopLevelComments(id);
  const comments = result.items[0];
  expect(comments.snippet.videoId).toBeDefined;
  expect(comments.snippet.videoId).toBe(id);
  expect(comments.snippet.topLevelComment).toBeDefined;
});

it('should throw YoutubeErrorHandler when given an invalid video ID', async () => {
  await expect(
    YoutubeService.getTopLevelComments('invalidVideoId')
  ).rejects.toThrow(YoutubeErrorHandler);
});
