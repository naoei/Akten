class Metadata {
    constructor(data) {
        /**
         * The last time the level was edited.
         * @type {Date}
         */
        this.lastEdit = new Date(data.lastEdit);
        
        /**
         * The date the level was created.
         * @type {Date}
         */
        this.creationDate = new Date(data.creationDate);
        
        /**
         * The version of the software used to create the level.
         * @type {number}
         */
        this.softwareVersion = data.softwareVersion;

        /**
         * The Geometry Dash version that was used to create the level.
         * @type {number}
         */
        this.levelVersion = data.levelVersion;
    }
}

module.exports = Metadata;