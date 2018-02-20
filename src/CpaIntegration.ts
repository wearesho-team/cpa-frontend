import axios from "axios";

import { LeadInterface } from "./LeadInterface";
import { ParserInterface } from "./ParserInterface";
import { SalesDoublerParser } from "./SalesDoublerParser";

export class CpaIntegration {
    protected static localStorageKey = "bobra.lead";
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
    public onLoad(url: URL) {
        let lead: LeadInterface;
        for (const parser of CpaIntegration.parsers) {
            lead = parser(url.searchParams);
        }
        if (!lead) {
            return;
        }
        localStorage.setItem(CpaIntegration.localStorageKey, JSON.stringify(lead));
    }

    /**
     * This method should be used when user is authorized and we can save lead information
     * related to current user on back-end 
     */
    public onLogin(): void {
        const lead = this.lead;
        axios.post(this.url(lead.source), {
            Lead: lead.config,
        })
            .then(() => localStorage.removeItem(CpaIntegration.localStorageKey));
    }

    protected get lead(): LeadInterface | undefined {
        const ls = localStorage.getItem(CpaIntegration.localStorageKey);
        let lead: LeadInterface;
        try {
            lead = JSON.parse(ls);
            if (
                "object" !== typeof lead
                || !lead.hasOwnProperty("source")
                || !lead.hasOwnProperty("config")
            ) {
                localStorage.removeItem(CpaIntegration.localStorageKey);
                return;
            }
        } catch {
            return;
        }
        return lead;
    }

}
