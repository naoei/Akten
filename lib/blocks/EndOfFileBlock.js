const BinaryWriter = require("../util/BinaryWriter");
const { BlockType, Type } = require("../util/Constants");
const Block = require("./Block");
const crypto = require("crypto");

class EndOfFileBlock extends Block {
    constructor() {
        super({
            type: BlockType.EndOfFile
        });
    }

    static read(reader) {
        let content = reader.buffer.slice(0, -47);
        let hash = crypto.createHash("sha256");
        let sha256 = hash.update(content.toString()).digest("base64");
        let fileSha256 = reader.read(Type.String);
        
        return fileSha256 === sha256;
    }

    write(buffer) {
        let writer = new BinaryWriter();
        let hash = crypto.createHash("sha256");
        let sha256 = hash.update(buffer.toString()).digest("base64");

        writer.write(Buffer.from([ this.type ]), Type.Raw);
        writer.write(sha256, Type.String);

        return writer.buffer;
    }
}

module.exports = EndOfFileBlock;