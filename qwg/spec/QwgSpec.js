describe("Qwg", function () {
    beforeEach(function () {
        var schema = {
            "bill":  {
                "hardcoded":"hardcodedQuery"
            },
            "bob":   {
                "simplefunction":function (query) {
                    return "iWasCalledWith " + query;
                }
            },
            "bond":  {
                "moore":  "mooreQuery",
                "craig":  "craigQuery",
                "connery":"conneryQuery",
                "dalton": "daltonQuery",
                "lazenby":"lazenbyQuery"
            },
            "rita":  {
                "higherOrderFunctions":function (query) {
                    return {
                        "dynamic":function (query2) {
                            return "secondTier " + query2;
                        }
                    };
                }
            },
            "thomas":{
                "injectedString":"queryGoesHere_$QUERY$_"
            }
        };

        qwg = new Qwg(schema);
    });

    describe("suggestions", function () {
        it("for whitespace only input should return list of first level items", function () {
            expect(qwg.suggestions(" ")).toEqual(["bill", "bob", "bond", "rita", "thomas"]);
        });

        it("should narrow down input to just matching items", function () {
            expect(qwg.suggestions(" b")).toEqual(["bill", "bob", "bond"]);
            expect(qwg.suggestions(" bo")).toEqual(["bob", "bond"]);
            expect(qwg.suggestions(" bon")).toEqual(["bond"]);
        });

        it("should ignore function values if they return a string (and are hence a leaf)", function () {
            expect(qwg.suggestions("bob simplefunction")).toEqual(["bob simplefunction"]);
        });

        it("should use function values if they return an object (and are hence a node)", function () {
            expect(qwg.suggestions("rita higherOrderFunctions")).toEqual(["rita higherOrderFunctions dynamic"]);
        });

        it("should display second tier items", function () {
            expect(qwg.suggestions(" bond ")).toEqual(["bond connery", "bond craig", "bond dalton", "bond lazenby", "bond moore"]);
        });

        it("should narrow down second tier input to just matching items", function () {
            expect(qwg.suggestions(" bond c")).toEqual(["bond connery", "bond craig"]);
        });

        it("should be able to support hardcoded end-values", function () {
            expect(qwg.suggestions(" bill hardcoded ")).toEqual(["name bob "]);
        });
    });

    describe("queries", function () {
        describe("when incomplete", function () {
            describe("should not resolve to a url for", function () {
                it("empty queries", function () {
                    expect(qwg.resolveUrl(" ")).toEqual(undefined);
                });
                it("partial words", function () {
                    expect(qwg.resolveUrl(" b")).toEqual(undefined);
                });
                it("when there are deeper levels", function () {
                    expect(qwg.resolveUrl(" bill")).toEqual(undefined);
                });
            });
        });

        describe("when complete", function () {
            it("should resolve to a hardcoded url representing the whole tree", function () {
                expect(qwg.resolveUrl(" bill hardcoded")).toEqual("hardcodedQuery");
            });

            describe("should resolve to the result of a function call", function () {
                it("when simple function", function () {
                    expect(qwg.resolveUrl(" bob simplefunction are cool")).toEqual("iWasCalledWith" + " are cool");
                });
                it("when is the result of nested function calls", function () {
                    expect(qwg.resolveUrl(" bob simplefunction are cool")).toEqual("iWasCalledWith" + " are cool");
                });
            });

            it("should resolve to the result of a function call", function () {
                expect(qwg.resolveUrl("rita higherOrderFunctions dynamic something else")).toEqual("secondTier something else");
            });

            it("should replace $QUERY$ with the contents of the query", function () {
                expect(qwg.resolveUrl(" thomas injectedString query term")).toEqual("queryGoesHere_query term_");
            });
        });
    });
});