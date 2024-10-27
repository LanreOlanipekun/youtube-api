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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllQuery = exports.getAllQuery2 = exports.updateOneQuery = exports.updateManyQuery = exports.createQuery = exports.getSingleQuery = exports.getAllQuery1 = void 0;
const lodash_1 = __importDefault(require("lodash"));
const sequelize_1 = require("sequelize");
const buildProjection = (projections) => __awaiter(void 0, void 0, void 0, function* () {
    const projection = projections.split(','); // Projection should be comma separated. eg. name,location
    const num = projection.length;
    const last = num - 1;
    const select = {};
    for (const n in projection) {
        if (typeof projection[n] === 'string') {
            select[projection[n]] = 1;
            if (n * 1 === last) {
                return select;
            }
        }
        else {
            if (n * 1 === last) {
                return select;
            }
        }
    }
});
const getAllQuery1 = ({ queries, model, populate, }) => __awaiter(void 0, void 0, void 0, function* () {
    let query;
    if (queries.search) {
        query = queries.search;
        // Clean appId and userId
        const resp = yield model.search(query);
        return JSON.parse(JSON.stringify(resp));
    }
    else {
        query = queries;
        const _query = {};
        const projection = query.select; // Projection should be comma separated. eg. name,location
        let ourProjection;
        if (projection) {
            ourProjection = yield buildProjection(projection);
            delete query.select;
        }
        let limit = query.limit * 1;
        if (limit) {
            delete query.limit;
        }
        const page = query.page * 1 || 0;
        if (page || page === 0) {
            delete query.page;
        }
        const from = query.from;
        let to = query.to;
        if (from) {
            query.createdAt = {};
            query.createdAt = { [sequelize_1.Op.gte]: from };
            delete query.from;
            if (to) {
                delete query.to;
            }
            else {
                to = new Date().toISOString();
            }
            query.createdAt = Object.assign(Object.assign({}, query.createdAt), { [sequelize_1.Op.lte]: to });
        }
        else {
            query.createdAt = {};
            query.createdAt = {
                [sequelize_1.Op.gte]: new Date('1989-03-15T00:00:00').toISOString(),
            };
            if (to) {
                delete query.to;
            }
            else {
                to = new Date().toISOString();
            }
            query.createdAt = Object.assign(Object.assign({}, query.createdAt), { [sequelize_1.Op.lte]: to });
        }
        const sort = query.sort; // -fieldName: means descending while fieldName without the minus mean ascending bith by fieldName. eg, '-fieldName1 fieldName2'
        if (sort) {
            delete query.sort;
        }
        // let populate = query.populate; // Samples: 'name location' will populate name and location references. only supports this for now | 'name', 'firstname' will populate name reference and only pick the firstname attribute
        // if (populate) {
        //     delete query.populate;
        // }
        if (limit) {
            _query.limit = limit;
        }
        else {
            limit = 50;
            _query.limit = limit;
        }
        if (page) {
            _query.offset = page * limit;
        }
        _query.where = query;
        let totalResult = yield model.count(_query);
        const total = yield model.count({});
        _query.order = [['createdAt', 'DESC']];
        if (populate) {
            if (populate.length) {
                _query.include = populate;
            }
            else {
                _query.include = [populate];
            }
        }
        if (sort) {
            _query.order = [];
            const splitSort = sort.split(' ');
            for (const n in splitSort) {
                if (typeof splitSort[n] === 'string') {
                    if (splitSort[n][0] === '-') {
                        _query.order.push([splitSort[n].substr('1'), 'DESC']);
                    }
                    else {
                        _query.order.push([splitSort[n], 'ASC']);
                    }
                }
            }
        }
        if (projection) {
            ourProjection._id = 1;
            _query.attributes = lodash_1.default.keys(ourProjection);
            const resp = yield model.findAll(_query);
            const pagination = {
                limit: 50,
                total: 0,
                totalResult: 0,
                isLastPage: true,
                pages: 0,
                currentPage: 1,
            };
            const pages = Math.ceil((totalResult * 1) / (limit * 1));
            pagination.limit = limit * 1;
            pagination.total = total;
            pagination.totalResult = totalResult;
            // pagination.lastId = ourLastId;
            pagination.isLastPage = totalResult =
                page !== 0 && page + 1 === pages
                    ? true
                    : totalResult <= limit
                        ? true
                        : false;
            pagination.pages = Math.ceil((totalResult * 1) / (limit * 1));
            pagination.currentPage = page + 1;
            const data = {
                data: resp,
                pagination,
            };
            return data;
        }
        else {
            const resp = yield model.findAll(_query);
            const pagination = {
                limit: 50,
                total: 0,
                totalResult: 0,
                isLastPage: true,
                pages: 0,
                currentPage: 1,
            };
            const pages = Math.ceil((totalResult * 1) / (limit * 1));
            pagination.limit = limit * 1;
            pagination.total = total;
            // pagination.lastId = ourLastId;
            pagination.totalResult = totalResult;
            pagination.isLastPage =
                page !== 0 && page + 1 === pages
                    ? true
                    : totalResult <= limit
                        ? true
                        : false;
            pagination.pages = pages;
            pagination.currentPage = page + 1;
            const data = {
                data: resp,
                pagination,
            };
            return data;
        }
    }
});
exports.getAllQuery1 = getAllQuery1;
const getSingleQuery = ({ params, queries, model }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const _query = {};
            const id = params.id;
            const query = queries;
            let populate;
            if (query) {
                populate = query.populate; // Samples: 'name location' will populate name and location references. only supports this for now | 'name', 'firstname' will populate name reference and only pick the firstname attribute
            }
            _query.where = model.where = { _id: id };
            const resp = yield model.findOne(_query);
            if (!resp) {
                resolve(resp);
            }
            resolve(resp.toJSON());
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.getSingleQuery = getSingleQuery;
const createQuery = ({ body, model }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = body;
            if (data && data.secure) {
                delete data.secure;
            }
            let resp;
            if (data.length) {
                resp = yield model.bulkCreate(data);
            }
            else {
                resp = yield model.create(data);
            }
            resolve(resp);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.createQuery = createQuery;
const updateManyQuery = ({ body, queries, model }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = queries;
            const _query = {};
            // Clean appId and userId
            const data = body;
            if (data && data.secure) {
                delete data.secure;
            }
            _query.where = query;
            const resp = yield model.update(data, _query);
            resolve(resp);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.updateManyQuery = updateManyQuery;
const updateOneQuery = ({ body, params, model }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const _query = {};
            const id = params.id;
            const data = body;
            if (data && data.secure) {
                delete data.secure;
            }
            _query.where = model.where = { _id: id };
            const resp = yield model.update(data, _query);
            resolve(resp);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.updateOneQuery = updateOneQuery;
// async function buildProjection1(select: string): Promise<any> {
//     if (!select) {
//         return null;
//     }
//     const fields = select.split(',').map((field) => field.trim());
//     const projection = fields.reduce((acc, field) => {
//         acc[field] = 1;
//         return acc;
//     }, {});
//     return projection;
// }
function buildSearchConditions(search) {
    const fields = search.split(',').map((field) => field.trim());
    const conditions = fields.map((field) => ({
        [field]: {
            [sequelize_1.Op.like]: `%${search}%`,
        },
    }));
    return conditions;
}
const getAllQuery2 = ({ queries, model, populate, }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = {
        data: [],
        pagination: {
            limit: 50,
            total: 0,
            totalResult: 0,
            isLastPage: true,
            pages: 0,
            currentPage: 1,
        },
    };
    let query;
    let { limit, page, search, from, to } = queries;
    if (search) {
        query = search;
        const resp = yield model.search(query);
        result.data = JSON.parse(JSON.stringify(resp));
        return result;
    }
    else {
        query = queries;
        const _query = {
            where: {},
            order: [['createdAt', 'DESC']],
        };
        if (limit) {
            _query.limit = Number(limit);
            delete query.limit;
        }
        else {
            _query.limit = 50;
        }
        if (page || page === 0) {
            _query.offset = Number(page) * _query.limit;
            delete query.page;
        }
        if (from) {
            _query.where = Object.assign({}, (to
                ? {
                    createdAt: {
                        [sequelize_1.Op.and]: [{ [sequelize_1.Op.gte]: from }, { [sequelize_1.Op.lte]: to }],
                    },
                }
                : {
                    createdAt: { [sequelize_1.Op.gte]: from },
                }));
            delete query.from;
            delete query.to;
        }
        else {
            _query.where = Object.assign({}, (to
                ? {
                    createdAt: {
                        [sequelize_1.Op.lte]: to,
                    },
                }
                : {}));
            if (!to) {
                to = new Date().toISOString();
            }
            _query.where.createdAt = {
                [sequelize_1.Op.gte]: new Date('1989-03-15T00:00:00').toISOString(),
                [sequelize_1.Op.lte]: to,
            };
            delete query.to;
        }
        if (populate) {
            if (Array.isArray(populate)) {
                _query.include = populate;
            }
            else {
                _query.include = [populate];
            }
        }
        const { rows: data, count: totalResult } = (yield model.findAndCountAll(_query));
        result.data = data;
        const pages = Math.ceil(totalResult / _query.limit);
        result.pagination.limit = _query.limit;
        result.pagination.total = yield model.count();
        result.pagination.totalResult = totalResult;
        result.pagination.isLastPage =
            page !== 0 && page + 1 === pages
                ? true
                : totalResult <= _query.limit
                    ? true
                    : false;
        result.pagination.pages = pages;
        result.pagination.currentPage = page + 1;
        return result;
    }
});
exports.getAllQuery2 = getAllQuery2;
const getAllQuery = ({ queries, model, populate, searchColumns, }) => __awaiter(void 0, void 0, void 0, function* () {
    const formatDate = (date) => date.toISOString();
    const result = {
        data: [],
        pagination: {
            limit: 50,
            total: 0,
            totalResult: 0,
            isLastPage: true,
            pages: 0,
            currentPage: 1,
        },
    };
    let query;
    let { limit, page, search, from, to, downloadFormat } = queries, otherConditions = __rest(queries, ["limit", "page", "search", "from", "to", "downloadFormat"]);
    const _query = {
        where: {},
        order: [['updatedAt', 'DESC']],
    };
    if (limit) {
        _query.limit = Number(limit);
        // delete query.limit;
    }
    else {
        _query.limit = 50;
    }
    if (page || page === 0) {
        _query.offset = Number(page) * _query.limit;
        // delete query.page;
    }
    if (from && to) {
        // If 'from' is provided, set it to the start of the day
        const fromDate = new Date(from);
        // fromDate.setHours(0, 0, 0, 0);
        // If 'to' is provided, set it to the end of the day
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        _query.where = Object.assign({
            updatedAt: {
                [sequelize_1.Op.between]: [formatDate(fromDate), formatDate(toDate)],
            },
        });
    }
    else if (from) {
        const fromDate = new Date(from);
        fromDate.setHours(0, 0, 0, 0);
        _query.where = Object.assign({
            updatedAt: {
                [sequelize_1.Op.lte]: formatDate(fromDate),
            },
        });
    }
    else if (to) {
        // If only to is provided, set it to the end of the day
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        _query.where = Object.assign({
            updatedAt: {
                [sequelize_1.Op.lte]: formatDate(toDate),
            },
        });
    }
    if (search && searchColumns && searchColumns.length > 0) {
        const searchQuery = searchColumns.map((column) => ({
            [column]: { [sequelize_1.Op.like]: `%${search}%` },
        }));
        _query.where = {
            [sequelize_1.Op.or]: searchQuery,
        };
    }
    if (populate) {
        if (Array.isArray(populate)) {
            _query.include = populate;
        }
        else {
            _query.include = [populate];
        }
    }
    if (otherConditions) {
        const otherQuery = _query.where;
        const mergedQuery = Object.assign(Object.assign({}, otherQuery), otherConditions);
        _query.where = mergedQuery;
    }
    const { rows: data, count: totalResult } = (yield model.findAndCountAll(_query));
    result.data = data;
    const pages = Math.ceil(totalResult / _query.limit);
    result.pagination.limit = _query.limit;
    result.pagination.total = yield model.count({
        where: Object.assign(Object.assign({}, (otherConditions &&
            (otherConditions === null || otherConditions === void 0 ? void 0 : otherConditions.tenantId) && { tenantId: otherConditions.tenantId })), { deletedAt: null }),
    });
    result.pagination.totalResult = totalResult;
    result.pagination.isLastPage =
        page !== 0 && page + 1 === pages
            ? true
            : totalResult <= _query.limit
                ? true
                : false;
    result.pagination.pages = pages;
    result.pagination.currentPage = page + 1;
    return result;
});
exports.getAllQuery = getAllQuery;
const convertToHtml = (data, searchColumns) => {
    let html = `<table>`;
    // add header row
    html += `<tr>`;
    searchColumns.forEach((column) => {
        html += `<th>${column}</th>`;
    });
    html += `</tr>`;
    // add data rows
    data.forEach((row) => {
        html += `<tr>`;
        searchColumns.forEach((column) => {
            html += `<td>${row[column]}</td>`;
        });
        html += `</tr>`;
    });
    html += `</table>`;
    return html;
};
//# sourceMappingURL=index.js.map