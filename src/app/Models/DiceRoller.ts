export class DiceRoller {

    generate(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    roll(input: string): number {
        var array = input.split("d");
        var diceAmount = +array[0];
        var dice = +array[1];

        var counter: number = 0;
        for (var i = 0; i < diceAmount; i++) {
            counter += this.generate(1, dice);          
        }
        return counter;
    }
}