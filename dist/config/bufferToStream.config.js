"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferToStream = void 0;
const stream_1 = require("stream");
const bufferToStream = (buffer) => {
    const readable = new stream_1.Readable({
        read() {
            this.push(buffer);
            this.push(null);
        },
    });
    return readable;
};
exports.bufferToStream = bufferToStream;
