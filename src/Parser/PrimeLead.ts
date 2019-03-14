import { ParserInterface } from "../Service";

export const PrimeLead: ParserInterface = (params: URLSearchParams) => {
    if (
        !params.has("transaction_id")
        || params.get("utm_source") !== "primelead"
    ) {
        return;
    }

    return {
        source: "prime-lead",
        config: {
            transactionId: params.get("transaction_id"),
        }
    }
};
