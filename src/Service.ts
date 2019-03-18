import axios from "axios";
import Cookies from "js-cookie";

import * as Parser from "./Parser";
import { Type } from "./Type";

export interface LeadInterface {
    source: string;
    config: object;
}

export type ParserInterface = (params: URLSearchParams) => LeadInterface | undefined

export class Service {
    protected static cookieKey = "bobra.lead";

    protected cookieDomain: string | undefined;
    protected parsers: { [T in Type]: ParserInterface } = {
        admitAd: Parser.AdmitAd,
        salesDoubler: Parser.SalesDoubler,
        loanGate: Parser.LoanGate,
        doAffiliate: Parser.DoAffiliate,
        cashka: Parser.Cashka,
        primeLead: Parser.PrimeLead,
        leadsSu: Parser.LeadsSu,
        finLine: Parser.FinLine,
        letmeads: Parser.Letmeads,
        leadGid: Parser.LeadGid,
        linkProfit: Parser.LinkProfit,
    };

    constructor(cookieDomain?: string, parsers?: { [T in Type]?: ParserInterface }) {
        this.cookieDomain = cookieDomain;
        if (parsers) {
            Object.assign(this.parsers, parsers);
        }
    }

    /**
     * This method should be used when page is loaded and we can use URL to detect lead info.
     * It will store lead information in cookies until we identify current user.
     * Make sure that it will be called before `onLogin` in any scenario.
     */
    public onLoad(url: URLSearchParams) {
        const lead: LeadInterface | undefined = Object.keys(this.parsers).reduce(
            (parsedLead: LeadInterface | undefined, parserType) => parsedLead || this.parsers[ parserType ](url),
            undefined
        );

        if (!lead) {
            return;
        }

        Cookies.set(Service.cookieKey, lead, {
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

        Cookies.remove(Service.cookieKey, { domain: this.cookieDomain });
    }

    protected get lead(): LeadInterface | undefined {
        const ls = Cookies.get(Service.cookieKey);
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
                Cookies.remove(Service.cookieKey, { domain: this.cookieDomain });
                return;
            }
            return lead;
        } catch {
            return;
        }
    }
}
