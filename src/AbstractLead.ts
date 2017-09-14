import {LeadInterface} from "./LeadFactory";

export abstract class AbstractLead implements LeadInterface {
    get url(): string {
        const data = this.data;

        return Object.keys(data)
            .map((key: string): string => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
            .join("&");
    }

    get cookie(): string {
        return JSON.stringify(this.data);
    }

    public abstract readonly data: object;
}
