"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataMapper = void 0;
const dataMapper = (data) => {
    const transformedData = {
        uuid: data.id,
        name: data.name,
        email: data.email,
        login: data.email.substring(0, data.email.indexOf("@")),
        status: data.status,
    };
    return transformedData;
};
exports.dataMapper = dataMapper;
