
DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NULL,
  route VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


INSERT INTO roles (name,route,created_at,updated_at)
VALUES ('CLIENT','client/products/list',NOW(),NOW());
VALUES ('RESTAURANTE','restaurants/orders/list',NOW(),NOW()); 
VALUES ('REPARTIDOR','delivery/orders/list',NOW(),NOW())
