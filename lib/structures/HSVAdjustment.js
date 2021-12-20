const { Type } = require("../util/Constants");

const Flags = {
    Saturation: 0b01,
    Brightness: 0b10
}

class HSVAdjustment {
    constructor(data) {
        /**
         * The hue to offset to.
         * @type {number}
         */
        this.hue = data.hue || 0;

        /**
         * The saturation to offset to.
         * @type {number}
         */
        this.saturation = data.saturation || 0;

        /**
         * The brightness to offset to.
         * @type {number}
         */
        this.brightness = data.brightness || 0;

        this.options = {
            /**
             * The saturation mode. If true, the saturation will be multiplicative. If false, the saturation will be additive.
             * @type {boolean}
             */
            get SaturationMode() { return (this._flags & Flags.Saturation) != 0; },
            set SaturationMode(value) { this._flags = (this._flags & ~Flags.Saturation) | (value ? Flags.Saturation : 0); },

            /**
             * The brightness mode. If true, the brightness will be multiplicative. If false, the brightness will be additive.
             * @type {boolean}
             */
            get BrightnessMode() { return (this._flags & Flags.Brightness) != 0; },
            set BrightnessMode(value) { this._flags = (this._flags & ~Flags.Brightness) | (value ? Flags.Brightness : 0); }
        }

        this.options._flags = data.flags || 0b00;
    }

    static read(reader) {
        let hue = reader.read(Type.Short);
        let saturation = reader.read(Type.Float);
        let brightness = reader.read(Type.Float);
        let flags = reader.read(Type.UByte);

        return new HSVAdjustment({
            hue,
            saturation,
            brightness,
            flags
        })
    }

    write(writer) {
        writer.write(this.hue, Type.Short);
        writer.write(this.saturation, Type.Float);
        writer.write(this.brightness, Type.Float);
        writer.write(this.options._flags, Type.UByte);
    }
}

module.exports  = HSVAdjustment;

module.exports.Flags = Flags;