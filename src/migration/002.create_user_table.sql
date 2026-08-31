CREATE TABLE
    IF NOT EXISTS USERS (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        role VARCHAR(100) NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
        hashed_password TEXT,
        google_id VARCHAR(255) UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW (),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW ()
    );