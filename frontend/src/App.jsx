import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Meals from "./pages/Meals"
import NewMeal from "./pages/NewMeal"
import MealView from "./pages/MealView"
import Metrics from "./pages/Metrics"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/meals" element={<Meals />} />
      <Route path="/meals/new" element={<NewMeal />} />
      <Route path="/meals/:id" element={<MealView />} />
      <Route path="/metrics" element={<Metrics />} />
    </Routes>
  )
}