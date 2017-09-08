export interface LeadInterface {
    readonly url: string;
    readonly cookie: string;
}

export interface LeadFactoryInterface {
    fromUrl(url: string): LeadInterface | undefined;

    fromCookie(url: string): LeadInterface | undefined;
}

export class LeadFactory {

}
