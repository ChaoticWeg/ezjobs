import path from "path";
import fs from "fs";

import Queries from "./index";

describe("readAllFromFile", () => {

    const filename = path.resolve(path.join(__dirname, "Test.sql"));
    const expected = "CREATE TABLE dummy (test TEXT);";

    const content = fs.readFileSync(filename, { encoding: "utf8" }).trim();
    expect(content).not.toBeNull();
    expect(content).toEqual(expected);

    test("without extension", async () => {
        const actualNoExt = await Queries.readAllFromFile("Test");
        expect(actualNoExt).toContain(expected);
        expect(actualNoExt[0]).toStrictEqual(expected);
        expect(actualNoExt.length).toStrictEqual(1);
    });

    test("with extension", async () => {
        const actualWithExt = await Queries.readAllFromFile("Test.sql");
        expect(actualWithExt).toContain(expected);
        expect(actualWithExt[0]).toStrictEqual(expected);
        expect(actualWithExt.length).toStrictEqual(1);
    });

    test("bubbles error up", async () => {
        const fn = () => Queries.readAllFromFile("bad.sql");
        return expect(fn).rejects.not.toBeNull();
    });

});
 