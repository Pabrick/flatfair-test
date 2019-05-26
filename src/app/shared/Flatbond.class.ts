export class Flatbond {
    public amount: number;
    public fee: number;
    public postcode: string;
    public recurrence: string;

    constructor({ amount, fee, postcode, recurrence }) {
        this.amount = amount;
        this.fee = fee;
        this.postcode = postcode;
        this.recurrence = recurrence;
    }
}
