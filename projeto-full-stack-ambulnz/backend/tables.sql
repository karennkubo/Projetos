-- Active: 1656365304886@@35.226.146.116@3306@silveira-21814712-karen-kubo

CREATE TABLE
    Ambulnz_Pizza (
        id VARCHAR(255) PRIMARY KEY NOT NULL,
        name VARCHAR(255) UNIQUE NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        photo_link VARCHAR(512) NOT NULL
    );

CREATE TABLE
    Ambulnz_Ingredient(
        id VARCHAR(255) PRIMARY KEY NOT NULL,
        name VARCHAR(255) UNIQUE NOT NULL
    );

CREATE TABLE
    Ambulnz_PizzaIngredients(
        pizza_id VARCHAR(255) NOT NULL,
        ingredient_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (pizza_id) REFERENCES Ambulnz_Pizza(id),
        FOREIGN KEY (ingredient_id) REFERENCES Ambulnz_Ingredient(id)
    );

CREATE TABLE
    Ambulnz_User(
        id VARCHAR(255) PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE
    Ambulnz_UserOrders (
        user_id VARCHAR(255) NOT NULL,
        pizza_id VARCHAR(255) NOT NULL,
        pizza_name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL DEFAULT 0,
        ordered_at DATE NOT NULL,
        FOREIGN KEY (pizza_id) REFERENCES Ambulnz_Pizza(id),
        FOREIGN KEY (user_id) REFERENCES Ambulnz_User(id)
    );
SELECT * FROM Ambulnz_UserOrders;
