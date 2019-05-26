export interface IFixedMembershipResponse {
    fixed_membership_fee: boolean;
    fixed_membership_fee_amount: number;
}

export class FixedMembership {
    public fee: boolean;
    public feeAmount: number;

    constructor(data: IFixedMembershipResponse) {
        this.fee = data.fixed_membership_fee;
        this.feeAmount = data.fixed_membership_fee_amount;
    }
}
