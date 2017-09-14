import {LeadInterface} from "../LeadFactory";
import {AbstractLeadFactory, QueryInterface} from "../AbstractLeadFactory";
import {PrimeLeadLead} from "./PrimeLeadLead";

export class PrimeLeadLeadFactory extends AbstractLeadFactory {
    public static readonly utmSource = "primelead";
    public static readonly transactionIdParam = "transaction_id";

    public fromQuery = (query: QueryInterface): LeadInterface | undefined => {
        if (
            query.get("utm_source") !== PrimeLeadLeadFactory.utmSource
            || !query.get(PrimeLeadLeadFactory.transactionIdParam)
        ) {
            return undefined;
        }

        return new PrimeLeadLead(query.get(PrimeLeadLeadFactory.transactionIdParam));
    };
}
