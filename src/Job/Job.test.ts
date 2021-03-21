import {Job} from "./Job";

import path from "path";
import os from "os";

const cmd = "echo test";

describe("initialization", () => {
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
});

describe("run() ", () => {
    test("success", () => {
        const job = new Job(cmd);

        const promise = new Promise<void>((resolve, reject) => {
            job.run();
            expect(job.pid).toBeDefined();
            expect(job.child).toBeDefined();

            job.child?.on("error", (err) => reject(err));
            job.child?.on("exit", () => resolve());
        });

        return expect(promise).resolves.toBe(undefined);
    });

    test("has no pid nor child before run", () => {
        const job = new Job(cmd);
        expect(job.child).toBeUndefined();
        expect(job.pid).toBeUndefined();
    });

    test("has pid and child after run", () => {
        const job = new Job(cmd);
        job.run();
        expect(job.child).toBeDefined();
        expect(job.pid).toBeDefined();
    })

    test("throws on error", () => {
        // Test with error: echo not defined outside of shell
        const job = new Job(cmd, {shell: false});

        const promise = new Promise<void>((resolve, reject) => {
            job.run();
            job.child?.on("error", (err) => reject(err));
            job.child?.on("exit", () => resolve());
        });

        return expect(promise).rejects.toBeDefined();
    });
});
