import {expect} from "chai";
import {SalesDoublerLead, SalesDoublerLeadFactory} from "../src/SalesDoubler";

describe("Test generating lead from url and cookie using SalesDoubler factory", () => {
    let factory: SalesDoublerLeadFactory;
    const clickId = Math.random() * (1000000 - 1) + 1;

    beforeEach(() => {
        factory = new SalesDoublerLeadFactory();
    });

    describe("Test url", () => {
        it("Should not generate lead with url without search parr", () => {
            expect(factory.fromUrl("https://google.com")).to.be.equal(undefined);
        });

        it("Should not generate lead without utm_source", () => {
            expect(factory.fromUrl(`?aff_sub=${clickId}`)).to.be.equal(undefined);
        });

        it("Should not generate lead without aff_sub", () => {
            expect(factory.fromUrl("?utm_source=salesdoubler")).to.be.equal(undefined);
        });

        it("Should not generate lead with incorrect utm_source", () => {
            expect(factory.fromUrl(`?utm_source=123&aff_sub=${clickId}`)).to.be.equal(undefined);
        });

        it("Should generate lead with correct url", () => {
            let url = `?utm_source=salesdoubler&aff_sub=${clickId}`;
            expect(factory.fromUrl(url)).to.be.instanceOf(SalesDoublerLead);

            url = `?aff_sub=${clickId}&utm_source=salesdoubler`;
            expect(factory.fromUrl(url)).to.be.instanceOf(SalesDoublerLead);
        });
    });

    describe("Test cookie", () => {
        it("Should not generate lead with empty cookie", () => {
            expect(factory.fromCookie("")).to.be.equal(undefined);
        });

        it("Should not generate lead with incorrect cookie", () => {
            expect(factory.fromCookie(undefined)).to.be.equal(undefined);
        });

        it("Should not generate lead without utm_source in cookie", () => {
            expect(factory.fromCookie(`{"aff_sub"=${clickId}}`)).to.be.equal(undefined);
        });

        it("Should not generate lead without aff_sub", () => {
            expect(factory.fromCookie("{'utm_source'='salesdoubler'}")).to.be.equal(undefined);
        });

        it("Should correctly generate lead", () => {
            const cookie = JSON.stringify({
                utm_source: "salesdoubler",
                aff_sub: clickId,
            });
            expect(factory.fromCookie(cookie)).to.be.instanceOf(SalesDoublerLead);
        });
    });
});
