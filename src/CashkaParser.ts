import { ParserInterface } from "./CpaIntegration";

export const CashkaParser: ParserInterface = (params: URLSearchParams) => {
    if (
        !params.has("transaction_id")
        || params.get("utm_source") !== "cashka"
    ) {
        return;
    }

    return {
        source: "cashka",
        config: {
            transactionId: params.get("transaction_id"),
        }
    }
};
