import {LeadInterface} from "../LeadFactory";
import {AbstractLeadFactory, QueryInterface} from "../AbstractLeadFactory";
import {PrimeLeadLead} from "./PrimeLeadLead";
import {utmSource, transactionIdParam} from "../data/PrimeLeadData"

export class PrimeLeadLeadFactory extends AbstractLeadFactory {
    public fromQuery = (query: QueryInterface): LeadInterface | undefined => {
        if (
            query.get("utm_source") !== utmSource
            || !query.get(transactionIdParam)
        ) {
            return undefined;
        }

        return new PrimeLeadLead(query.get(transactionIdParam));
    };
}
