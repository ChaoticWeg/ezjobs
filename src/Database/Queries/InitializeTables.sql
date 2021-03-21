CREATE TABLE jobs (
    id TEXT PRIMARY KEY,
    command TEXT
);

CREATE TABLE job_statuses (
    id TEXT PRIMARY KEY,
    job_id TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

CREATE TABLE job_errors (
    id TEXT PRIMARY KEY,
    job_id TEXT NOT NULL,
    message TEXT NOT NULL,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

CREATE TABLE job_pids (
    id TEXT PRIMARY KEY,
    job_id TEXT NOT NULL,
    pid TEXT
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);
