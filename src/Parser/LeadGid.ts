import { ParserInterface } from "../Service";

export const LeadGid: ParserInterface = (params: URLSearchParams) => {
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
