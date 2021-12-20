class Block {
    constructor(data) {
        this.type = data.type;

        this.buffer = null;
    }

    static read(reader) { }

    write(writer) { }
}

module.exports = Block;