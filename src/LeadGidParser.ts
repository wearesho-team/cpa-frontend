import { ParserInterface } from "./CpaIntegration";

export const LeadGidParser: ParserInterface = (params: URLSearchParams) => {
    if (params.get("utm_source") !== "leadgid" || !params.has("click_id")) {
        return;
    }

    return {
        source: "lead-gid",
        config: {
            clickId: params.get("click_id"),
        },
    };
};
