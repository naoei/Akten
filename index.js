let Akten = require('./lib/Akten');
const ColorChannel = require('./lib/structures/ColorChannel');
const Guideline = require('./lib/structures/Guideline');
let level = new Akten("level.gdx");

level.metadata.options.FadesIn = true;
level.metadata.options.FadesOut = true;

level.colors.push(new ColorChannel({ id: 1, red: 255, green: 0, blue: 0 }));
level.colors.push(new ColorChannel({ id: 2, red: 0, green: 255, blue: 0 }));
level.colors.push(new ColorChannel({ id: 3, red: 0, green: 0, blue: 255 }));

level.guidelines.push(new Guideline({ color: Guideline.Colors.Green, timestamp: 0 }))
level.guidelines.push(new Guideline({ color: Guideline.Colors.Yellow, timestamp: 100.25 }))
level.guidelines.push(new Guideline({ color: Guideline.Colors.Orange, timestamp: 25.6263 }))

console.log(level.metadata.options._flags);
console.log(level.metadata.options.Verified);

console.log(level.colors);
console.log(level.guidelines);

level.Save();