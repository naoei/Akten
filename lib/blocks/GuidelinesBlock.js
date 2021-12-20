const Guideline = require('../structures/Guideline');
const { BlockType, Type } = require('../util/Constants.js');
const CollectionBlock = require('./CollectionBlock.js');

class GuidelinesBlock extends CollectionBlock {
    constructor(data) {
        super({
            type: BlockType.Guidelines,
            blocks: data.blocks || []
        });
    }

    static readSection(reader) {
        let timestamp = reader.read(Type.Float);
        let color = reader.read(Type.UByte);

        return new Guideline({
            timestamp,
            color
        });
    }

    writeSection(data, writer) {
        writer.write(data.timestamp, Type.Float);
        writer.write(data.color, Type.UByte);
    }
}

module.exports = GuidelinesBlock;