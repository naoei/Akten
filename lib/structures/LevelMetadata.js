const Flags = {
    Verified:         0b0000_0001,
    Uploaded:         0b0000_0010,
    CustomSong:       0b0000_0100,
    FadeIn:           0b0000_1000,
    FadeOut:          0b0001_0000,
    Dual:             0b0010_0000,
    TwoPlayer:        0b0100_0000,
}

const Speed = {
    Slow: 0,
    Normal: 1,
    Medium: 2,
    Fast: 3,
    VeryFast: 4,
}

const Gamemode = {
    Cube: 0,
    Ship: 1,
    Ball: 2,
    UFO: 3,
    Wave: 4,
    Robot: 5,
    Spider: 6,
    Swing: 7,
}

const Size = {
    Normal: 0,
    Small: 1,
}

class LevelMetadata {
    constructor(data) {
        /**
         * The name of the level.
         * @type {string}
         */
        this.name = data.name || "";

        /**
         * The description of the level.
         * @type {string}
         */
        this.description = data.description || "";

        /**
         * The revision of the level.
         * @type {number}
         */
        this.revision = data.revision || 0;

        /**
         * The uploaded ID of the level. Left as 0 if the level is not uploaded.
         * @type {number}
         */
        this.id = data.id || 0;

        /**
         * The version of the level. Left as 0 if the level is not uploaded.
         * @type {number}
         */
        this.version = data.version || 0;

        /**
         * The binary version of Geometry Dash this level was created with.
         * @type {number}
         */
        this.binaryVersion = data.binaryVersion || 0;

        /**
         * The song ID of the level.
         * @type {number}
         */
        this.songId = data.songId || 0;

        /**
         * The offset the song starts at.
         * @type {number}
         */
        this.songOffset = data.songOffset || 0.0;

        /**
         * The starting speed of the level.
         * @type {LevelMetadata.Speed}
         */
        this.speed = data.speed || Speed.Normal;
    
        /**
         * The starting gamemode of the level.
         * @type {LevelMetadata.Gamemode}
         */
        this.gamemode = data.gamemode || Gamemode.Cube;

        /**
         * The starting player size of the level.
         * @type {LevelMetadata.Size}
         */
        this.size = data.size || Size.Normal;

        /**
         * The background texture to use in the level.
         * @type {number}
         */
        this.background = data.background || 0;

        /**
         * The ground texture to use in the level.
         * @type {number}
         */
        this.ground = data.ground || 0;

        /**
         * The line texture to use in the level.
         * @type {number}
         */
        this.line = data.line || 0;

        /**
         * The font to use in the level.
         * @type {number}
         */
        this.font = data.font || 0;

        /**
         * Flags for the level.
         */
        this.options = {
            // thanks copilot for not making me write this uwu
            /**
             * Whether the level is verified.
             * @type {boolean}
             */
            get Verified() { return (this._flags & Flags.Verified) != 0; },
            set Verified(value) { this._flags = (this._flags & ~Flags.Verified) | (value ? Flags.Verified : 0); },

            /**
             * Whether the level is uploaded.
             * @type {boolean}
             */
            get Uploaded() { return (this._flags & Flags.Uploaded) != 0; },
            set Uploaded(value) { this._flags = (this._flags & ~Flags.Uploaded) | (value ? Flags.Uploaded : 0); },

            /**
             * Whether the level uses a custom song.
             * @type {boolean}
             */
            get UsesCustomSong() { return (this._flags & Flags.CustomSong) != 0; },
            set UsesCustomSong(value) { this._flags = (this._flags & ~Flags.CustomSong) | (value ? Flags.CustomSong : 0); },

            /**
             * Whether the song fades in.
             * @type {boolean}
             */
            get FadesIn() { return (this._flags & Flags.FadeIn) != 0; },
            set FadesIn(value) { this._flags = (this._flags & ~Flags.FadeIn) | (value ? Flags.FadeIn : 0); },

            /**
             * Whether the song fades out.
             * @type {boolean}
             */
            get FadesOut() { return (this._flags & Flags.FadeOut) != 0; },
            set FadesOut(value) { this._flags = (this._flags & ~Flags.FadeOut) | (value ? Flags.FadeOut : 0); },

            /**
             * Whether the level starts in dual mode.
             * @type {boolean}
             */
            get Dual() { return (this._flags & Flags.Dual) != 0; },
            set Dual(value) { this._flags = (this._flags & ~Flags.Dual) | (value ? Flags.Dual : 0); },

            /**
             * Whether the level uses two player mode.
             * @type {boolean}
             */
            get TwoPlayer() { return (this._flags & Flags.TwoPlayer) != 0; },
            set TwoPlayer(value) { this._flags = (this._flags & ~Flags.TwoPlayer) | (value ? Flags.TwoPlayer : 0); },
        }

        this.options._flags = data.flags || 0b0000_0000;
    }
}

module.exports = LevelMetadata;

module.exports.Flags = Flags;
module.exports.Speed = Speed;
module.exports.Gamemode = Gamemode;
module.exports.Size = Size;