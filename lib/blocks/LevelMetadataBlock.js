const LevelMetadata = require("../structures/LevelMetadata");
const BinaryWriter = require("../util/BinaryWriter");
const { BlockType, Type } = require("../util/Constants");
const Block = require("./Block");

class LevelMetadataBlock extends Block {
    constructor(data) {
        super({
            type: BlockType.LevelMetadata
        })

        this.structure = data || new LevelMetadata({});
    }

    /**
     * @param {import("../util/BinaryReader")} reader 
     */
    static read(reader) {    
        let name = reader.read(Type.String);
        let description = reader.read(Type.String);
        let revision = reader.read(Type.Short);
        let id = reader.read(Type.Int);
        let version = reader.read(Type.Short);
        let binaryVersion = reader.read(Type.Short);
        let flags = reader.read(Type.Byte);
        let songId = reader.read(Type.Int);
        let songOffset = reader.read(Type.Float);
        let speed = reader.read(Type.Byte);
        let gamemode = reader.read(Type.Byte);
        let size = reader.read(Type.Byte);
        let background = reader.read(Type.Byte);
        let ground = reader.read(Type.Byte);
        let line = reader.read(Type.Byte);
        let font = reader.read(Type.Byte);

        return new LevelMetadata({
            name,
            description,
            revision,
            id,
            version,
            binaryVersion,
            flags,
            songId,
            songOffset,
            speed,
            gamemode,
            size,
            background,
            ground,
            line,
            font,
        })
    }

    write() {
        let writer = new BinaryWriter();

        writer.write(Buffer.from([ this.type ]), Type.Raw);
        writer.write(this.structure.name, Type.String);
        writer.write(this.structure.description, Type.String);
        writer.write(this.structure.revision, Type.Short);
        writer.write(this.structure.id, Type.Int);
        writer.write(this.structure.version, Type.Short);
        writer.write(this.structure.binaryVersion, Type.Short);
        writer.write(this.structure.options._flags, Type.Byte);
        writer.write(this.structure.songId, Type.Int);
        writer.write(this.structure.songOffset, Type.Float);
        writer.write(this.structure.speed, Type.Byte);
        writer.write(this.structure.gamemode, Type.Byte);
        writer.write(this.structure.size, Type.Byte);
        writer.write(this.structure.background, Type.Byte);
        writer.write(this.structure.ground, Type.Byte);
        writer.write(this.structure.line, Type.Byte);
        writer.write(this.structure.font, Type.Byte);

        return writer.buffer;
    }
}

module.exports = LevelMetadataBlock;