import { ParserInterface } from "../Service";

export const LeadsSu: ParserInterface = (params: URLSearchParams) => {
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
