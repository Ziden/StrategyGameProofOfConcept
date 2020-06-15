// reference: https://referencesource.microsoft.com/#mscorlib/system/guid.cs
export default class Guid {

    private bytes: Array<number>
    private hash: string

    public static get(bytes: Array<number>):Guid {
        var g = new Guid();
        g.bytes = bytes
        g.hash = Guid.toString(bytes);
        return g;
    }

    public toString() : string {
        return this.hash
    }

    private static toString(bytes: Array<number>): string {
        // crazy c# guid logic
        var parsedBytes = bytes
            // reverse first 4 for the first int
            .slice(0, 4).reverse()
            // 4-6 reversed for the short
            .concat(bytes.slice(4,6).reverse())
            // 6-8 reversed for anosther short
            .concat(bytes.slice(6,8).reverse())
            // the random byte
            .concat(bytes.slice(8))
        var s = parsedBytes.map(function(item) {return ('00'+item.toString(16).toUpperCase()).substr(-2,2)})
        return s.join('');
    }

}