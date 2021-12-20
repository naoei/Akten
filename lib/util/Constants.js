exports.Separator = 0x1D;

exports.BlockType = {
    Metadata: 0xF1,
    LevelMetadata: 0xF2,

    // Collections
    ColorChannels: 0xE1,
    Guidelines: 0xE2,

    // End of file
    EndOfFile: 0xFF
}

exports.Type = {
    String: 0,
    Byte: 1,
    UByte: 1,
    Int8: 1,
    Raw: 2,
    Int: 3,
    Long: 4,
    Float: 5,
    Short: 6,
    UInt: 7,
    ULong: 8,
    ArrayOfValues: 9,
    UShort: 10,
};