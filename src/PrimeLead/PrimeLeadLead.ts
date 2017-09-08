import {LeadInterface} from "../LeadFactory";

export class PrimeLeadLead implements LeadInterface {
    public transactionId: string;

    constructor(transactionId: string) {
        this.transactionId = transactionId;
    }

    // @todo: implement
    get url(): string {
        return undefined;
    }

    get cookie(): string {
        return undefined;
    }
}