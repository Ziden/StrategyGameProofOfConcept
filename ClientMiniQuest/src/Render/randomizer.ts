
export default class Randomizer {
    seed:number
    m:number
    a:number
    c:number
    state:number

    constructor(seed:number) {
        this.seed = seed;
        this.state = seed;

        this.m = 0x80000000; 
        this.a = 1103515245;
        this.c = 12345;
    }

    nextInt() {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state;
    }

    nextFloat() {
        // returns in range [0,1]
        return this.nextInt() / (this.m - 1);
    }

    nextRange(start:number, end:number) {
        var rangeSize = end - start;
        var randomUnder1 = this.nextInt() / this.m;
        return start + Math.floor(randomUnder1 * rangeSize);
    }

    choice(array) {
        return array[this.nextRange(0, array.length)];
    }
}
