export class Flatbond {
    public amount: number;
    public fee: number;
    public vat: number;
    public postcode: string;
    public recurrence: string;

    constructor({ amount, fee, vat, postcode, recurrence }) {
        this.amount = amount;
        this.fee = fee;
        this.vat = vat;
        this.postcode = postcode;
        this.recurrence = recurrence;
    }
}
