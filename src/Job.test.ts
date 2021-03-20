import {Job} from "./Job";

import path from "path";
import os from "os";

describe("initialization", () => {
    test("populates with default options", () => {
        const job = new Job("echo.");
    
        expect(job.command).toBe("echo.");
        expect(job.cwd).toBe(path.resolve(__dirname));
    });
    
    test("populates with custom cwd", () => {
        const job = new Job("echo.", {cwd: os.tmpdir()});
    
        expect(job.command).toBe("echo.");
        expect(job.cwd).toBe(os.tmpdir());
    });    
});
