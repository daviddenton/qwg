describe("Qwg", function () {
    beforeEach(function () {
        var schema = {
            "bill":{
                "hicks":"hicksQuery"
            },
            "bob": {
                "bill":function (text) {
                    return "iWasCalledWith" + text;
                }
            },
            "bond":{
                "moore":  "mooreQuery",
                "craig":  "craigQuery",
                "connery":"conneryQuery",
                "dalton": "daltonQuery",
                "lazenby":"lazenbyQuery"
            },
            "rita":{
                "alan":"alanQuery"
            },
            "sue": {
                "mel":"melQuery"
            }
        };

        qwg = new Qwg(schema);
    });

    describe("suggestions", function () {
        it("for whitespace only input should return list of first level items", function () {
            expect(qwg.suggestions(" ")).toEqual(["bill", "bob", "bond", "rita", "sue"]);
        });

        it("should narrow down input to just matching items", function () {
            expect(qwg.suggestions(" b")).toEqual(["bill", "bob", "bond"]);
            expect(qwg.suggestions(" bo")).toEqual(["bob", "bond"]);
            expect(qwg.suggestions(" bon")).toEqual(["bond"]);
        });

        it("should ignore final function values", function () {
            expect(qwg.suggestions("bob bill")).toEqual(["bob bill"]);
        });

        it("should display second tier items", function () {
            expect(qwg.suggestions(" bond ")).toEqual(["bond connery", "bond craig", "bond dalton", "bond lazenby", "bond moore"]);
        });

        it("should narrow down second tier input to just matching items", function () {
            expect(qwg.suggestions(" bond c")).toEqual(["bond connery", "bond craig"]);
        });
    });

    describe("queries", function () {
        describe("when incomplete", function () {
            describe("should not resolve to a url for", function () {
                it("empty queries", function () {
                    expect(qwg.resolveUrl(" ")).toEqual("");
                });
                it("partial words", function () {
                    expect(qwg.resolveUrl(" b")).toEqual("");
                });
                it("when there are deeper levels", function () {
                    expect(qwg.resolveUrl(" bill")).toEqual("");
                });
            });
        });

        describe("when complete", function () {
            it("should not resolve to a hardcoded url", function () {
                expect(qwg.resolveUrl(" bill hicks")).toEqual("hicksQuery");
            });

            it("should not resolve to the result of a function call", function () {
                expect(qwg.resolveUrl(" bob bill")).toEqual("iWasCalledWith" + " bob bill");
            });
        });
    });
});