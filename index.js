let Akten = require('./lib/Akten');
let level = new Akten("level.gdx");

level.metadata.options.FadesIn = true;
level.metadata.options.FadesOut = true;

console.log(level.metadata.options._flags);
console.log(level.metadata.options.Verified);

level._CreateWriteHeader();