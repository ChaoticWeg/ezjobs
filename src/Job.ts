import EventEmitter from "events";
import {ChildProcess, spawn} from "child_process";
import path from "path";

interface IJobOptions {
    cwd: string;
}

interface IJob {
    command: string;
    cwd: string;
    pid?: number;
}

export class Job extends EventEmitter implements IJob {

    private static DefaultOptions: IJobOptions = {
        cwd: path.resolve(__dirname)
    };

    private _child?: ChildProcess;

    private _command: string;
    public get command(): string { return this._command; }

    private _pid?: number;
    public get pid(): number | undefined { return this._pid; }

    private _cwd: string;
    public get cwd(): string { return this._cwd; }

    constructor(command: string, options?: Partial<IJobOptions>) {
        super();

        this._command = command;
        this._cwd = options?.cwd ?? Job.DefaultOptions.cwd;
    }

    run() {
        this._child = spawn(this.command, {
            cwd: this.cwd
        });


    }

}
