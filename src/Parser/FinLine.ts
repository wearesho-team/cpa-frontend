import { ParserInterface } from "../Service";

export const FinLine: ParserInterface = (params: URLSearchParams) => {
    if (params.get("utm_source") !== "finline" || !params.has("clickId")) {
        return;
    }

    return {
        source: "fin-line",
        config: {
            clickId: params.get("clickId"),
        },
    };
};
