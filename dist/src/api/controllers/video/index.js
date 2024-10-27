"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.VideoController = void 0;
const tsoa_1 = require("tsoa");
const exceptions_1 = require("../../../modules/exceptions");
const logger_1 = require("../../../modules/logger");
const response_1 = require("../../../modules/routes/response");
const httpStatuses_1 = __importDefault(require("../../httpStatuses"));
const youtubeService_1 = __importDefault(require("../../services/youtubeService"));
let VideoController = class VideoController extends tsoa_1.Controller {
    /**
     * Retrieves a video by its ID.
     */
    getVideoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield youtubeService_1.default.getVideoById(id);
                if (!result.items.length) {
                    throw new exceptions_1.CommonErrorHandler(exceptions_1.CommonErrorHandler.NotFound);
                }
                const video = result.items[0];
                const responseData = {
                    title: video.snippet.title,
                    description: video.snippet.description,
                    image: video.snippet.thumbnails.maxres.url,
                    viewCount: video.statistics.viewCount,
                    likeCount: video.statistics.likeCount,
                };
                return new response_1.SuccessResponseObject(responseData, 'Video fetched successfully');
            }
            catch (err) {
                this.log.error(`Route /video/${id} get with err: ${err}`);
                throw err;
            }
        });
    }
    /**
     * Retrieves the comments for a specific video based on the provided video ID and optional page token.
     */
    getVideoComments(videoId, pageToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield youtubeService_1.default.getTopLevelComments(videoId, pageToken);
                return new response_1.SuccessResponseObject(result, 'Comments loaded successfully');
            }
            catch (err) {
                this.log.error(`Route /video/comments/${videoId} get with err: ${err}`);
                throw err;
            }
        });
    }
};
__decorate([
    (0, logger_1.LoggerDecorator)('Controller.VIDEO'),
    __metadata("design:type", Object)
], VideoController.prototype, "log", void 0);
__decorate([
    (0, tsoa_1.SuccessResponse)(httpStatuses_1.default.success.code, httpStatuses_1.default.success.message),
    (0, tsoa_1.Get)('{id}'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideoById", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(httpStatuses_1.default.success.code, httpStatuses_1.default.success.message),
    (0, tsoa_1.Get)('comments/{videoId}'),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideoComments", null);
VideoController = __decorate([
    (0, tsoa_1.Route)('video'),
    (0, tsoa_1.Tags)('Video')
], VideoController);
exports.VideoController = VideoController;
//# sourceMappingURL=index.js.map