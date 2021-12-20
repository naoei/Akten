const fs = require('fs');
const ColorChannelsBlock = require('./blocks/ColorChannelsBlock');
const EndOfFileBlock = require('./blocks/EndOfFileBlock');
const GuidelinesBlock = require('./blocks/GuidelinesBlock');
const LevelMetadataBlock = require('./blocks/LevelMetadataBlock');
const MetadataBlock = require('./blocks/MetadataBlock');
const ColorChannel = require('./structures/ColorChannel');
const Guideline = require('./structures/Guideline');
const LevelMetadata = require('./structures/LevelMetadata');
const BinaryReader = require('./util/BinaryReader');
const { BlockType, Type } = require('./util/Constants');

class Akten {
    constructor(file) {
        this.path = file;

        /**
         * The metadata of the level.
         * @type {LevelMetadata}
         */
        this.metadata = new LevelMetadata({});

        /**
         * The color channels of the level.
         * @type {ColorChannel[]}
         */
        this.colors = [];

        /**
         * The guidelines of the level.
         * @type {Guideline[]}
         */
        this.guidelines = [];

        if (!fs.existsSync(file)) {
            this._CreateWriteHeader();

            return;
        }

        this.buffer = fs.readFileSync(file);
    
        if (this.buffer.byteLength <= 0) {
            this._CreateWriteHeader();

            return;
        }

        this.reader = new BinaryReader(this.buffer);

        if (!this.reader.buffer.slice(0, 5).toString() === "GDEXT") {
            throw new Error("Invalid file format.");
        } else {
            this.reader.offset = 5;
            let formatVersion = this.reader.read(Type.UShort);
            let metadata = MetadataBlock.read(this.reader);

            while (this.reader.reading) {
                let type = this.reader.read(Type.Byte);

                switch (type) {
                    case BlockType.LevelMetadata:
                        this.metadata = LevelMetadataBlock.read(this.reader);
                        break;

                    case BlockType.ColorChannels:
                        this.colors = ColorChannelsBlock.read(this.reader);
                        break;

                    case BlockType.Guidelines:
                        this.guidelines = GuidelinesBlock.read(this.reader);
                        break;

                    case BlockType.EndOfFile:
                        if (EndOfFileBlock.read(this.reader)) {
                            this.reader.reading = false;
                            break;
                        }
                        
                        throw new Error("The calculated hash does not match the hash in the file.");
                }
            }

            this.fileData = {
                formatVersion,
                metadata: metadata.structure
            }
        }
    }

    _CreateWriteHeader() {
        let text = Buffer.from("GDEXT");
        let num = Buffer.alloc(2);
        num.writeUIntLE(1, 0, 2);

        let epoch = Math.round(Date.now() / 1000);
        let metadata = new MetadataBlock(epoch, epoch, 1, 32).write();
        let levelMetadata = new LevelMetadataBlock(this.metadata).write();

        let endOfFile = new EndOfFileBlock().write(Buffer.concat([ text, num, metadata, levelMetadata ]));

        fs.writeFileSync(this.path, Buffer.concat([ text, num, metadata, levelMetadata, endOfFile ]));
    }

    Save() {
        let text = Buffer.from("GDEXT");
        let num = Buffer.alloc(2);
        num.writeUIntLE(1, 0, 2);

        let epoch = Math.round(Date.now() / 1000);
        let metadata = new MetadataBlock(epoch, epoch, 1, 32).write();
        let levelMetadata = new LevelMetadataBlock(this.metadata).write();
        let channels = new ColorChannelsBlock({ blocks: this.colors }).write();
        let guidelines = new GuidelinesBlock({ blocks: this.guidelines }).write();

        let endOfFile = new EndOfFileBlock().write(Buffer.concat([ text, num, metadata, levelMetadata, channels, guidelines ]));
        fs.writeFileSync(this.path, Buffer.concat([ text, num, metadata, levelMetadata, channels, guidelines, endOfFile ]));
    }
}

module.exports = Akten;