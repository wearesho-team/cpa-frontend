import {AbstractLeadFactory, QueryInterface} from "../AbstractLeadFactory";
import {SalesDoublerLead} from "./SalesDoublerLead";
import {LeadInterface} from "../LeadFactory";
import {utmSource, clickIdParam} from "../data/SalesDoublerData";

export class SalesDoublerLeadFactory extends AbstractLeadFactory {
    public fromQuery = (query: QueryInterface): LeadInterface | undefined => {
        if (
            !query.get(clickIdParam)
            || query.get("utm_source") !== utmSource
        ) {
            return undefined;
        }
        return new SalesDoublerLead(query.get(clickIdParam));
    };
}
