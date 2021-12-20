const Block = require("./Block");
const { Type, BlockType } = require("../util/Constants");
const BinaryWriter = require("../util/BinaryWriter");
const Metadata = require("../structures/Metadata");

class MetadataBlock extends Block {
    constructor(creationDate, lastEdit, softwareVersion, levelVersion) {
        super({
            type: BlockType.Metadata
        });

        this.lastEdit = new Date(lastEdit * 1000);
        this.creationDate = new Date(creationDate * 1000);
        this.softwareVersion = softwareVersion;
        this.levelVersion = levelVersion;

        this.structure = new Metadata({ lastEdit, creationDate, softwareVersion, levelVersion });
    }

    static read(reader) {
        reader.read(Type.Byte);

        let creationDate = reader.read(Type.Long);
        let lastEdit = reader.read(Type.Long);
        let softwareVersion = reader.read(Type.Short);
        let levelVersion = reader.read(Type.Short);
        
        return new MetadataBlock(creationDate, lastEdit, softwareVersion, levelVersion);
    }

    write() {
        let writer = new BinaryWriter();
        this.lastEdit = Date.now();

        // what
        writer.write(Buffer.from([ this.type ]), Type.Raw);
        writer.write(Math.round(this.creationDate / 1000), Type.Long);
        writer.write(Math.round(this.lastEdit / 1000), Type.Long);
        writer.write(this.softwareVersion, Type.Short);
        writer.write(this.levelVersion, Type.Short);

        return writer.buffer;
    }
}

module.exports = MetadataBlock;