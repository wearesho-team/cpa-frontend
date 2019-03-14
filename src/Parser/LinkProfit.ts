import { ParserInterface } from "../Service";

export const LinkProfit: ParserInterface = (params: URLSearchParams) => {
    if (
        params.get("utm_source") !== "linkprofit"
        || !params.has("wm_id")
        || !params.has("click_hash")
    ) {
        return;
    }

    return {
        source: "link-profit",
        config: {
            clickHash: params.get("click_hash"),
            refId: params.get("wm_id"),
        }
    }
};
