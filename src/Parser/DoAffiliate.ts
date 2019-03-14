import { ParserInterface } from "../Service";

export const DoAffiliate: ParserInterface = (params: URLSearchParams) => {
    if (params.get("utm_source") !== "doaff" || !params.has("v")) {
        return;
    }
    return {
        source: "do-affiliate",
        config: {
            visitor: params.get("v"),
        }
    }
};
