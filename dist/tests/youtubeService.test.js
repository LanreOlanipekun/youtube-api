"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../src/modules/exceptions");
const youtubeService_1 = __importDefault(require("../src/api/services/youtubeService"));
// Successfully retrieves video details by valid video ID
it('should return video details when given a valid video ID', () => __awaiter(void 0, void 0, void 0, function* () {
    const id = 'G_NkExMLVwo';
    const result = yield youtubeService_1.default.getVideoById(id);
    const video = result.items[0];
    expect(video.id).toBe(id);
    expect(video.snippet.title).toBeDefined();
    expect(video.snippet.description).toBeDefined();
    expect(video.snippet.thumbnails.maxres.url).toBeDefined();
    expect(video.statistics.viewCount).toBeDefined();
    expect(video.statistics.likeCount).toBeDefined();
}));
it('should throw YoutubeErrorHandler when given an invalid or empty video ID', () => __awaiter(void 0, void 0, void 0, function* () {
    const id = 'ccsdww';
    const result = yield youtubeService_1.default.getVideoById(id);
    const video = result.items[0];
    expect(video).toBeUndefined();
}));
it('should return video top level comments when given a valid video ID', () => __awaiter(void 0, void 0, void 0, function* () {
    const id = 'G_NkExMLVwo';
    const result = yield youtubeService_1.default.getTopLevelComments(id);
    const comments = result.items[0];
    expect(comments.snippet.videoId).toBeDefined;
    expect(comments.snippet.videoId).toBe(id);
    expect(comments.snippet.topLevelComment).toBeDefined;
}));
it('should throw YoutubeErrorHandler when given an invalid video ID', () => __awaiter(void 0, void 0, void 0, function* () {
    yield expect(youtubeService_1.default.getTopLevelComments('invalidVideoId')).rejects.toThrow(exceptions_1.YoutubeErrorHandler);
}));
//# sourceMappingURL=youtubeService.test.js.map