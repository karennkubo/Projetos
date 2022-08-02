import { PizzaController } from './Controller/PizzaController';
import { PizzaBusiness } from './Business/PizzaBusiness';
import { UserController } from './Controller/UserController';
import { UserBusiness } from './Business/UserBusiness';
import { app } from "./Controller/app";
import { PizzaData } from './Data/PizzaData';
import { UserData } from './Data/UserData';
import { HashManager } from './Services/HashManager';
import { IdGenerator } from './Services/IdGenerator';
import { TokenGenerator } from './Services/TokenGenerator';
//User
const userBusiness = new UserBusiness(
    new UserData(),
    new PizzaData(),
    new HashManager(),
    new IdGenerator(),
    new TokenGenerator()
);
const userController = new UserController(
    userBusiness
);
app.post("/user/signup", userController.signUp);
app.post("/user/login", userController.login);
app.post("/user/order", userController.order);
app.get("/user/order", userController.history);

//Pizza
const pizzaBusiness = new PizzaBusiness(
    new PizzaData(),
    new IdGenerator()
);
const pizzaController = new PizzaController(
    pizzaBusiness
);

app.post("/pizza", pizzaController.createPizza);
app.post("/ingredient", pizzaController.createIngredient);
app.post("/pizza/ingredients", pizzaController.addIngredientsToPizza);
app.get("/pizza", pizzaController.getAllPizzas);
app.get("/pizza/:id", pizzaController.getPizzaById);
