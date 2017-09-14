import {utmSource, transactionIdParam} from "../data/PrimeLeadData"
import {AbstractLead} from "../AbstractLead";

export class PrimeLeadLead extends AbstractLead {
    public transactionId: string;

    constructor(transactionId: string) {
        super();
        this.transactionId = transactionId;
    }

    get data(): object {
        return {
            utm_source: utmSource,
            [transactionIdParam]: this.transactionId,
        };
    }
}
