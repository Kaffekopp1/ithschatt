CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(50),
    postalnr INTEGER,
    consent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_status (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    status BOOLEAN DEFAULT FALSE,
    last_active TIMESTAMP
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3);

UPDATE users SET username = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2;

DELETE FROM users WHERE id = $1;

INSERT INTO messages (group_id, sender_id, content) VALUES ($1, $2, $3);

SELECT * FROM messages WHERE group_id = $1 ORDER BY sent_at;

INSERT INTO user_status (user_id, status, last_active) VALUES (1, FALSE, NOW());
