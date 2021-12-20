const ColorChannel = require("../structures/ColorChannel");
const HSVAdjustment = require("../structures/HSVAdjustment");
const { BlockType, Type } = require("../util/Constants");
const CollectionBlock = require("./CollectionBlock");

class ColorChannelsBlock extends CollectionBlock {
    constructor(data) {
        super({
            type: BlockType.ColorChannels,
            blocks: data.blocks || []
        });
    }

    static readSection(reader) {
        let id = reader.read(Type.Int);
        let red = reader.read(Type.UByte);
        let green = reader.read(Type.UByte);
        let blue = reader.read(Type.UByte);
        let copyPlayerId = reader.read(Type.UByte);
        let opacity = reader.read(Type.Float);
        let copyId = reader.read(Type.Int);
        let hsvAdjustment = HSVAdjustment.read(reader);
        let flags = reader.read(Type.UByte);

        return new ColorChannel({
            id,
            red,
            green,
            blue,
            copyPlayerId,
            opacity,
            copyId,
            hsvAdjustment,
            flags
        })
    }

    writeSection(data, writer) {
        writer.write(data.id, Type.Int);
        writer.write(data.red, Type.UByte);
        writer.write(data.green, Type.UByte);
        writer.write(data.blue, Type.UByte);
        writer.write(data.copyPlayerId, Type.UByte);
        writer.write(data.opacity, Type.Float);
        writer.write(data.copyId, Type.Int);
        data.hsvAdjustment.write(writer);
        writer.write(data.flags, Type.UByte);
    }
}

module.exports = ColorChannelsBlock;