import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Layout from "../components/Layout";
import MealItem from "../components/MealItem"

export default function Meals() {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);

  async function loadMeals() {
    try {
      const response = await api.get("/meals");
      setMeals(response.data);
    } catch {
      navigate("/login");
    }
  }

  useEffect(() => {
    loadMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Minhas Refeições">
      <Link to="/meals/new">
        <button style={{ width: "100%", marginBottom: 20 }}>
          + Registrar refeição
        </button>
      </Link>

      <Link to="/metrics">
        <button style={{ width: "100%", marginBottom: 20 }}>
          Ver Métricas
        </button>
      </Link>

      <ul
        style={{
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {meals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    </Layout>
  );
}
