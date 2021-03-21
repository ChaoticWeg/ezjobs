import {Job} from "./Job";

import path from "path";
import os from "os";

describe("initialization", () => {
    const cmd = "echo hi";

    test("populates with default options", () => {
        const job = new Job(cmd);
    
        expect(job.command).toBe(cmd);
        expect(job.cwd).toBe(path.resolve(__dirname));
    });
    
    test("populates with custom cwd", () => {
        const job = new Job(cmd, {cwd: os.tmpdir()});
    
        expect(job.command).toBe(cmd);
        expect(job.cwd).toBe(os.tmpdir());
    });

    test("runs dummy command", () => {
        const job = new Job(cmd);
        try {
            job.run();
        } catch (err) {
            fail(err);
        }
    });
});
