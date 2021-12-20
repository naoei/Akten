const Colors = {
    Green: 0,
    Yellow: 1,
    Orange: 2
}

class Guideline {
    constructor(data) {
        /**
         * The timestamp this line is created.
         * @type {number}
         */
        this.timestamp = data.timestamp;
        
        /**
         * The color of this guideline.
         * @type {Colors}
         */
        this.color = data.color || Colors.Green;
    }
}

module.exports = Guideline;

module.exports.Colors = Colors;