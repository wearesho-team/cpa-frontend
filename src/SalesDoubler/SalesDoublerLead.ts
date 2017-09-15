import {utmSource, clickIdParam} from "../data/SalesDoublerData"
import {AbstractLead} from "../AbstractLead";

export class SalesDoublerLead extends AbstractLead {
    public clickId: string;

    constructor(clickId: string) {
        super();
        this.clickId = clickId;
    }

    get data(): object {
        return {
            utm_source: utmSource,
            [clickIdParam]: this.clickId,
        };
    }
}
