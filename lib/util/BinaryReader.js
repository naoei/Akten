const { Type } = require("./Constants");

class BinaryReader {
    constructor(buffer = "") {
        this.buffer = Buffer.from(buffer);

        this.offset = 0;

        this.reading = true;
    }

    get length() {
        return this.buffer.length;
    }

    /**
     * Read a specific given byte type.
     * @param {Number|Type} type The type to read, or the size to read.
     */
    read(type) {
        if (!typeof type == "number") { // is not a number
            if (!Type[type])
                throw new RangeError("The given type is not a very valid type.");

            type = Type[type];
        }

        let data = null;

        // special case for strings
        if (type == Type.String) {
            if (this.buffer[this.offset] == 0x0B) { // string
                // get the length of the string
                let length = readULEB128(this.buffer.slice(this.offset += 1));

                // return the data
                data = this.buffer.slice(this.offset += length.length, this.offset + length.value).toString();
                
                this.offset += length.value;
            } else { // no string
                this.offset++;
                data = null;
            }
        } else { // everything else
            if (type == Type.Raw) {
                data = this.buffer;
            } else {
                let byte_size = getSize(type);
                data = parseInt(Buffer.from(this.buffer.slice(this.offset, this.offset += byte_size)).reverse().toString("hex"), 16);
            }
        }
        return data;
    }

    toString() {
        let values = [];
        for (let value of this.pack().values()) {
            values.push(value.toString(16).padStart(2, "0"))
        }

        return `<${this.constructor.name} ${values.join(" ")}>`
    }
}

function readULEB128(arr) {
    var total = 0;
    var shift = 0;
    var len = 0;

    while (true) {
        var byte = arr[len];
        len++;
        total |= ((byte & 0x7F) << shift);
        if ((byte & 0x80) === 0) break;
        shift += 7;
    }

    return {
        value: total,
        length: len
    };
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

module.exports = BinaryReader;