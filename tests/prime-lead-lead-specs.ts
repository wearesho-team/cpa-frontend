import {expect} from "chai";
import {PrimeLeadLead} from "../src/PrimeLead";

describe("Test creating url and cookie for PrimeLead lead", () => {
    let lead: PrimeLeadLead;
    const transactionId = Math.random() * (1000000 - 1) + 1;
    const data = {
        utm_source: "primelead",
        transaction_id: transactionId.toString(),
    };

    beforeEach(() => {
        lead = new PrimeLeadLead(transactionId.toString());
    });

    it("Should correctly generate cookie", () => {
        const expected = JSON.stringify(data);
        expect(lead.cookie).to.be.equal(expected);
    });

    it("Should correctly generate url", () => {
        const url = Object.keys(data)
            .map((key: string) => `${key}=${data[key]}`)
            .join("&");
        expect(lead.url).to.be.equal(url);
    });
});
