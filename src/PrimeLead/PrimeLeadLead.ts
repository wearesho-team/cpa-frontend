import {PrimeLeadLeadFactory} from "./PrimeLeadLeadFactory";
import {AbstractLead} from "../AbstractLead";

export class PrimeLeadLead extends AbstractLead {
    public transactionId: string;

    constructor(transactionId: string) {
        super();
        this.transactionId = transactionId;
    }

    get data(): object {
        return {
            utm_source: PrimeLeadLeadFactory.utmSource,
            [PrimeLeadLeadFactory.transactionIdParam]: this.transactionId,
        };
    }
}
