const HSVAdjustment = require("./HSVAdjustment");

const Flags = {
    Blending: 0b01,
    CopyOpacity: 0b10
}

class ColorChannel {
    constructor(data) {
        /**
         * The ID this channel is associated with.
         * @type {number}
         */
        this.id = data.id;

        /**
         * The red value of this channel.
         * @type {number}
         */
        this.red = data.red || 0;

        /**
         * The green value of this channel.
         * @type {number}
         */
        this.green = data.green || 0;

        /**
         * The blue value of this channel.
         * @type {number}
         */
        this.blue = data.blue || 0;

        /**
         * The Player color this channel should copy.
         * @type {number}
         */
        this.copyPlayerId = data.copyPlayerId || 0;

        /**
         * The Opacity value of this channel.
         * @type {number}
         */
        this.opacity = data.opacity || 100;

        /**
         * The ID this channel should copy.
         * @type {number}
         */
        this.copyId = data.copyId || 0;

        /**
         * The HSV adjustment for this channel.
         * @type {HSVAdjustment}
         */
        this.hsvAdjustment = data.hsvAdjustment || new HSVAdjustment({});

        this.options = {
            /**
             * Whether this channel has additive blending.
             */
            get Blending() { return (this._flags & Flags.Blending) != 0; },
            set Blending(value) { this._flags = (this._flags & ~Flags.Blending) | (value ? Flags.Blending : 0); },

            /**
             * Whether this channel should copy the opacity of another channel.
             */
            get CopiesOpacity() { return (this._flags & Flags.CopyOpacity) != 0; },
            set CopiesOpacity(value) { this._flags = (this._flags & ~Flags.CopyOpacity) | (value ? Flags.CopyOpacity : 0); }
        }

        this.options._flags = data.flags || 0b00;
    }
}

module.exports = ColorChannel;

module.exports.Flags = Flags;