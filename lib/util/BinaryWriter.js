const Int64 = require("int64-buffer").Int64LE;
const UInt64 = require("int64-buffer").Uint64LE;
const { Type } = require("./Constants");

class BinaryWriter {
    constructor(buffer = "") {
        this.buffer = Buffer.from(buffer);

        this.offset = 0;
    }

    get length() {
        return this.buffer.length;
    }

    write(data, type) {
        if (!typeof type == "number") { // is not a number
            if (!Type[type])
                throw new RangeError("The given type is not a very valid type.");

            type = Type[type];
        }

        let resp = null;
        let size = getSize(type, data);

        // special case for strings
        if (type == Type.String) {
            if (data == null || data == "") {
                resp = Buffer.from([0]);
            } else {
                let data_buffer = Buffer.from(data, "utf-8"); // data to a utf8 buffer
                let buffer = Buffer.alloc(1); // make the base of the uffer
                buffer.writeUInt8(0x0B, 0); // write base byte

                // length buffer
                let length = Buffer.from(writeULEB128(data_buffer.length));

                resp = Buffer.concat([buffer, length, data_buffer]);
            }
        } else {
            // everything else
            let buffer = Buffer.alloc(size);

            if (type == Type.Float) { // float
                buffer.writeFloatLE(data, 0, size);
            } else if (type == Type.ULong || type == Type.Long) { // ulong/long
                if (type == Type.Long) {
                    new Int64(data).toBuffer().copy(buffer, 0);
                } else {
                    new UInt64(data).toBuffer().copy(buffer, 0);
                }
            } else if (type == Type.UInt || type == Type.UShort) { // unsigned
                buffer.writeUIntLE(data, 0, size);
            } else if (type == Type.Raw) {
                Buffer.from(data).copy(buffer, this.offset);
            } else { // signed
                buffer.writeIntLE(data, 0, size);
            }

            resp = buffer;
        }

        this.offset += resp.length + 1;
        this.buffer = Buffer.concat([this.buffer, resp]);
        return this;
    }

    toString() {
        let values = [];
        for (let value of this.pack().values()) {
            values.push(value.toString(16).padStart(2, "0"))
        }

        return `<Packet ${values.join(" ")}>`
    }
}

function writeULEB128(num) {
    var arr = [];
    var len = 0;

    if (num === 0)
        return [0];

    while (num > 0) {
        arr[len] = num & 0x7F;
        if (num >>= 7) arr[len] |= 0x80;
        len++;
    }

    return Buffer.from(arr);
}

function getSize(type, data) {
    if (type == Type.Byte) {
        return 1;
    } else if (type == Type.Raw) {
        return data.length;
    } else if (type == Type.Int || type == Type.UInt) {
        return 4;
    } else if (type == Type.Short || type == Type.UShort) {
        return 2;
    } else if (type == Type.Float) {
        return 4;
    } else if (type == Type.Long || type == Type.ULong) {
        return 8;
    }

    return 0;
}

module.exports = BinaryWriter;