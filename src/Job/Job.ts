import EventEmitter from "events";
import {ChildProcess, spawn} from "child_process";
import path from "path";

interface IJobOptions {
    cwd: string;
    shell: boolean;
}

interface IJob {
    command: string;
    cwd: string;
    pid?: number;
    child?: ChildProcess;
}

export class Job extends EventEmitter implements IJob {
    private static DefaultOptions: IJobOptions = {
        cwd: path.resolve(__dirname),
        shell: true
    };

    private _child?: ChildProcess;
    public get child(): ChildProcess | undefined {
        return this._child;
    }

    private _command: string;
    public get command(): string {
        return this._command;
    }

    public get pid(): number | undefined {
        return this._child?.pid;
    }

    private _cwd: string;
    public get cwd(): string {
        return this._cwd;
    }

    private _shell: boolean;
    public get shell(): boolean {
        return this._shell;
    }

    constructor(command: string, options?: Partial<IJobOptions>) {
        super();

        this._command = command;
        this._cwd = options?.cwd ?? Job.DefaultOptions.cwd;
        this._shell = options?.shell ?? Job.DefaultOptions.shell;
    }

    run() {
        this._child = spawn(this.command, {
            cwd: this.cwd,
            shell: this.shell
        });
    }
}
