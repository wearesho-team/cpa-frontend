import axios from "axios";
import Cookies from "js-cookie";

import { LeadInterface } from "./LeadInterface";
import { ParserInterface } from "./ParserInterface";
import { SalesDoublerParser } from "./SalesDoublerParser";

export class CpaIntegration {
    protected static cookieKey = "bobra.lead";
    protected static parsers: Array<ParserInterface> = [
        SalesDoublerParser,
    ];
    protected url: (source: string) => string;

    constructor(url: CpaIntegration["url"]) {
        this.url = url;
    }

    /**
     * This method should be used when page is loaded and we can use URL to detect lead info.
     * It will store lead information in localStorage until we identify current user.
     * Make sure that it will be called before `onLogin` in any scenario.
     */
    public onLoad(url: URLSearchParams) {
        let lead: LeadInterface | undefined;
        lead = CpaIntegration.parsers.reduce((lead: LeadInterface | undefined, parser) => lead || parser(url), lead);
        if (!lead) {
            return;
        }
        Cookies.set(CpaIntegration.cookieKey, JSON.stringify(lead));
    }

    /**
     * This method should be used when user is authorized and we can save lead information
     * related to current user on back-end 
     */
    public async onLogin(): Promise<void> {
        const lead = this.lead;

        if (!lead) {
            return;
        }

        await axios.post(this.url(lead.source), {
            LeadForm: lead.config,
        });
        Cookies.remove(CpaIntegration.cookieKey);
    }

    protected get lead(): LeadInterface | undefined {
        const ls = Cookies.get(CpaIntegration.cookieKey);
        if (!ls) {
            return;
        }

        try {
            const lead = JSON.parse(ls);
            if (
                "object" !== typeof lead
                || !lead.hasOwnProperty("source")
                || !lead.hasOwnProperty("config")
            ) {
                localStorage.removeItem(CpaIntegration.cookieKey);
                return;
            }
            return lead;
        } catch {
            return;
        }
    }
}
