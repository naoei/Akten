const DataType = {
    Null: 0x00,
    String: 0x01,
    Byte: 0x02,
    Short: 0x03,
    Int: 0x04,
    Float: 0x05,
    Long: 0x06,
    Double: 0x07,
    Vector: 0x08
};

class Util {
    constructor() {
        throw new Error("This class cannot be instantiated.")
    }

    static asDataType(number) {
        let keys = Object.keys(DataType).sort((a, b) => {
            return DataType[a] - DataType[b];
        });
        
        return keys[number];
    }

    static readDataType(reader, type) {
        let val;
        
        switch (type) {
            // 0x01
            case DataType.String:
                val = reader.read(Type.String);
                break;

            // 0x02
            case DataType.Byte:
                val = reader.read(Type.Byte);
                break;

            // 0x03
            case DataType.Short:
                val = reader.read(Type.Short);
                break;

             // 0x04
             case DataType.Int:
                 val = reader.read(Type.Int);
                 break;

            // 0x05
            case DataType.Float:
               val = reader.read(Type.Float);
               break;

            // 0x06
            case DataType.Long:
                val = reader.read(Type.Long);
                break;

            // 0x07
            case DataType.Double:
                val = reader.read(Type.Long);
                break;

            // 0x07
            case DataType.Vector:
                // later
                break;
        }

        return val;
    }
}

module.exports = Util;
exports.DataType = DataType;