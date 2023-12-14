-- PostgreSQL


DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(80) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    password VARCHAR(255) NOT NULL,
    is_available BOOLEAN NULL,
    session_token VARCHAR(255) NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(
    name,
    lastname,
    email,
    phone,
    image,
    password,
    is_available,
    session_token,
    create_at,
    update_at
) VALUES(
    'Jhon',
    'Doe',
    'joe@gmail.com',
    '123456789',
    'https://concepto.de/wp-content/uploads/2018/08/persona-e1533759204552.jpg',
    '123456789',
    true,
    '123456789',
    '2021-01-01 00:00:00',
    '2021-01-01 00:00:00'
)

    

