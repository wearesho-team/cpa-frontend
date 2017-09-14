import {expect} from "chai";
import {SalesDoublerLead} from "../src/SalesDoubler/SalesDoublerLead";

describe("Test creating url and cookie for PrimeLead lead", () => {
    let lead: SalesDoublerLead;
    const clickId = Math.random() * (1000000 - 1) + 1;
    const data = {
        utm_source: "salesdoubler",
        aff_sub: clickId.toString(),
    };

    beforeEach(() => {
        lead = new SalesDoublerLead(clickId.toString());
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
