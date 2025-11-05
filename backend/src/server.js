import express from "express"
import cors from "cors"
import { createUser, login } from "./controllers/userController.js"
import { createMeal, listMeals, getMeal, updateMeal, deleteMeal, getMetrics } from "./controllers/mealController.js"
import { auth } from "./middlewares/auth.js"

const app = express()
app.use(express.json())
app.use(cors())

app.post("/register", createUser)
app.post("/login", login)

app.post("/meals", auth, createMeal)
app.get("/meals", auth, listMeals)
app.get("/meals/metrics", auth, getMetrics)
app.get("/meals/:id", auth, getMeal)
app.put("/meals/:id", auth, updateMeal)
app.delete("/meals/:id", auth, deleteMeal)

app.listen(3333, () => console.log("Backend rodando"))
