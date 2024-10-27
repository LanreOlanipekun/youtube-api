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
const http_1 = require("../../../modules/http");
const secret_1 = __importDefault(require("../../../modules/secret"));
const exceptions_1 = require("../../../modules/exceptions");
const secret_2 = __importDefault(require("../../../modules/secret"));
const utils_1 = require("../../../utils");
class YoutubeService {
    constructor() {
        this.apiEndpoints = {
            video: 'videos',
            comments: 'commentThreads',
        };
        this.http = new http_1.Http(secret_1.default.Urls.youtubeBaseUrl);
        this.apiKey = secret_2.default.Urls.googleApiKey;
    }
    /**
     * Retrieves video details by ID from the YouTube API.
     *
     * @param id - The ID of the video to retrieve details for.
     * @returns A promise that resolves with the video details.
     * @throws Throws a YoutubeErrorHandler if an error occurs during the retrieval process.
     */
    getVideoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http.get(`${this.apiEndpoints.video}${(0, utils_1.getQueryString)({
                    part: 'snippet,statistics',
                    id,
                    key: this.apiKey,
                })}`, {}, 'GET_VIDEO_BY_ID');
            }
            catch (err) {
                throw new exceptions_1.YoutubeErrorHandler(err);
            }
        });
    }
    /**
     * Retrieves the top-level comments for a specific video.
     *
     * @param videoId - The ID of the video to retrieve comments for.
     * @param pageToken - The token for the next page of comments (default is empty).
     * @returns A promise that resolves to an array of top-level comments for the video.
     * @throws {YoutubeErrorHandler} If an error occurs during the retrieval process.
     */
    getTopLevelComments(videoId, pageToken = '') {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.http.get(`${this.apiEndpoints.comments}${(0, utils_1.getQueryString)({
                    part: 'snippet',
                    videoId,
                    key: this.apiKey,
                    pageToken,
                })}`, {}, 'GET_VIDEO_COMMENTS');
            }
            catch (err) {
                throw new exceptions_1.YoutubeErrorHandler(err);
            }
        });
    }
}
const youtubeService = new YoutubeService();
exports.default = youtubeService;
//# sourceMappingURL=index.js.map