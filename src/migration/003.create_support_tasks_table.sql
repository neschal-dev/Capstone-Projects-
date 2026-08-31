CREATE TABLE
    IF NOT EXISTS support_tasks (
        task_id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        title VARCHAR(1000) NOT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'RESOLVED', 'IN_PROGRESS')),
        user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW (),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW ()
    );