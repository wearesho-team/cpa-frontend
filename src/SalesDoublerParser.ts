import { ParserInterface } from "./CpaIntegration";

export const SalesDoublerParser: ParserInterface = (params: URLSearchParams) => {
    const source = params.get("utm_source");

    if (
        (source !== "cpanet_salesdoubler" && source !== "cpanet_salesdubler" && source !== "salesdoubler")
        || !params.has("aff_sub")
    ) {
        return;
    }

    return {
        source: "sales-doubler",
        config: {
            clickId: params.get("aff_sub"),
            aid: params.get("utm_campaign") || params.get("aff_id"), // web master identifier
        }
    }
};
