import {LeadFactoryInterface, LeadInterface} from "./LeadFactory";

export interface QueryInterface {
    get(key: string): string | undefined;
}

export abstract class AbstractLeadFactory implements LeadFactoryInterface {
    public abstract fromQuery: (query: QueryInterface) => LeadInterface | undefined;

    public fromUrl = (url: string): LeadInterface | undefined => {
        const search = url.split("?")[1];
        if (search === undefined) {
            return undefined;
        }

        const searchParams = new URLSearchParams(search);
        return this.fromQuery(searchParams);
    };

    public fromCookie = (cookie: string): LeadInterface | undefined => {
        let object: QueryInterface | undefined;

        try {
            object = JSON.parse(cookie);
        } catch (exception) {
            return undefined;
        }

        object.get = (key: string) => object[key];
        return this.fromQuery(object);
    }
}
