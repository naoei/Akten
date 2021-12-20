const BinaryWriter = require("../util/BinaryWriter");
const { Type } = require("../util/Constants");
const Block = require("./Block");

class CollectionBlock extends Block {
    constructor(data) {
        super(data);
    
        this.blocks = data.blocks || [];
    }

    /**
     * @param {import("../util/BinaryReader")} reader 
     */
    static read(reader) {
        this.blocks = [];

        while (reader.read(Type.Byte) != 0xFF) {
            this.blocks.push(this.readSection(reader));
        }

        return this.blocks;
    }

    write() {
        let writer = new BinaryWriter();
        writer.write(Buffer.from([ this.type ]), Type.Raw);

        for (let block of this.blocks) {
            writer.write(0xE0, Type.UByte);
            this.writeSection(block, writer);
        }

        writer.write(0xFF, Type.UByte);
        return writer.buffer;
    }

    static readSection(reader) {   
    }

    writeSection(data, writer) {
    }
}

module.exports = CollectionBlock;