import axios from "axios";
import Cookies from "js-cookie";

import { SalesDoublerParser } from "./SalesDoublerParser";
import { LoanGateParser } from "./LoanGateParser";
import { DoAffiliateParser } from "./DoAffiliateParser";
import { CashkaParser } from "./CashkaParser";
import { AdmitAdParser } from "./AdmitAdParser";
import { PrimeLeadParser } from "./PrimeLeadParser";
import { LeadsSuParser } from "./LeadsSuParser";
import { FinLineParser } from "./FinLineParser";
import { LetmeadsParser } from "./LetmeadsParser";
import { LeadGidParser } from "./LeadGidParser";

export interface LeadInterface {
    source: string;
    config: object;
}
export type ParserInterface = (params: URLSearchParams) => LeadInterface | undefined

export class CpaIntegration {
    protected static cookieKey = "bobra.lead";
    protected static parsers: Array<ParserInterface> = [
        SalesDoublerParser,
        LoanGateParser,
        DoAffiliateParser,
        CashkaParser,
        AdmitAdParser,
        PrimeLeadParser,
        LeadsSuParser,
        FinLineParser,
        LetmeadsParser,
        LeadGidParser,
    ];
    protected cookieDomain: string | undefined;

    constructor(cookieDomain?: string) {
        this.cookieDomain = cookieDomain;
    }

    /**
     * This method should be used when page is loaded and we can use URL to detect lead info.
     * It will store lead information in cookies until we identify current user.
     * Make sure that it will be called before `onLogin` in any scenario.
     */
    public onLoad(url: URLSearchParams) {
        let lead: LeadInterface | undefined;
        lead = CpaIntegration.parsers.reduce(
            (parsedLead: LeadInterface | undefined, parser) => parsedLead || parser(url), lead
        );

        if (!lead) {
            return;
        }

        Cookies.set(CpaIntegration.cookieKey, lead, {
            domain: this.cookieDomain,
            expires: 30,
        });
    }

    /**
     * This method should be used when user is authorized and we can save lead information
     * related to current user on back-end
     */
    public async onLogin(url: (source: string) => string): Promise<void> {
        const lead = this.lead;

        if (!lead) {
            return;
        }

        await axios.post(url(lead.source), {
            LeadForm: lead.config,
        });

        Cookies.remove(CpaIntegration.cookieKey, { domain: this.cookieDomain });
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
                Cookies.remove(CpaIntegration.cookieKey, { domain: this.cookieDomain });
                return;
            }
            return lead;
        } catch {
            return;
        }
    }
}
