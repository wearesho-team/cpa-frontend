import {PrimeLeadLeadFactory} from "./PrimeLead/PrimeLeadLeadFactory";
import {SalesDoublerLeadFactory} from "./SalesDoubler/SalesDoublerLeadFactory";

export interface LeadInterface {
    readonly url: string;
    readonly cookie: string;
}

export interface LeadFactoryInterface {
    fromUrl(url: string): LeadInterface | undefined;
    fromCookie(url: string): LeadInterface | undefined;
}

export class LeadFactory implements LeadFactoryInterface {
    public factories: LeadFactoryInterface[];

    public constructor() {
        this.factories = [
            new PrimeLeadLeadFactory(),
            new SalesDoublerLeadFactory(),
        ];
    }

    public fromUrl = (url: string): LeadInterface | undefined => {
        return this.factories
            .reduce((lead: LeadInterface | undefined, factory: LeadFactoryInterface): LeadInterface | undefined => {
                return lead || factory.fromUrl(url);
            }, undefined);
    };

    public fromCookie = (cookie: string): LeadInterface | undefined => {
        return this.factories
            .reduce((lead: LeadInterface | undefined, factory: LeadFactoryInterface): LeadInterface | undefined => {
                return lead || factory.fromCookie(cookie);
            }, undefined);
    };
}
