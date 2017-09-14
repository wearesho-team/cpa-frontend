import {AbstractLeadFactory, QueryInterface} from "../AbstractLeadFactory";
import {SalesDoublerLead} from "./SalesDoublerLead";
import {LeadInterface} from "../LeadFactory";

export class SalesDoublerLeadFactory extends AbstractLeadFactory {
    public static readonly clickIdParam = "aff_sub";
    public static readonly utmSource = "salesdoubler";

    public fromQuery = (query: QueryInterface): LeadInterface | undefined => {
        if (
            !query.get(SalesDoublerLeadFactory.clickIdParam)
            || query.get("utm_source") !== SalesDoublerLeadFactory.utmSource
        ) {
            return undefined;
        }
        return new SalesDoublerLead(query.get(SalesDoublerLeadFactory.clickIdParam));
    };
}
