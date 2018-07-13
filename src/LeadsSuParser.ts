import { ParserInterface } from "./CpaIntegration";

export const LeadsSuParser: ParserInterface = (params: URLSearchParams) => {
    if (params.get("utm_source") !== "leads-su" || !params.has("transaction_id")) {
        return;
    }

    return {
        source: "leads-su",
        config: {
            transactionId: params.get("transaction_id"),
        }
    }
};
