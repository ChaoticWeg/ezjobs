CREATE VIEW IF NOT EXISTS view_jobs AS
    SELECT
        j.id,
        j.command,
        js.status,
        jp.pid
    FROM jobs j
    LEFT JOIN job_statuses js ON j.id = js.job_id
    LEFT JOIN job_pids jp ON j.id = jp.job_id
;

CREATE VIEW IF NOT EXISTS view_job_errors AS
    SELECT
        j.id,
        je.message
    FROM jobs j
    LEFT JOIN job_errors je ON j.id = je.job_id
;
