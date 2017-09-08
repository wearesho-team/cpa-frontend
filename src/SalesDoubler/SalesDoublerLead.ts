import {LeadInterface} from "../LeadFactory";

export class SalesDoublerLead implements LeadInterface {
    public clickId: string;

    constructor(clickId: string) {
        this.clickId = clickId;
    }

    // todo: implement
    get url() {
        return undefined;
    }

    // todo: implement
    get cookie() {
        return undefined;
    }
}
