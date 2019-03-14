import { ParserInterface } from "../Service";

export const Cashka: ParserInterface = (params: URLSearchParams) => {
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
