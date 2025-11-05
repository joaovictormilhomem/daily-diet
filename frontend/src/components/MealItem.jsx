import { Link } from "react-router-dom"

export default function MealItem({ meal }) {
  return (
    <li
      style={{
        background: "#fff",
        padding: 16,
        borderRadius: "var(--radius)",
        display: "flex",
        justifyContent: "space-between",
        borderLeft: `6px solid ${meal.inDiet ? 'green' : 'red'}`
      }}
    >
      <div>
        <strong>{meal.name}</strong><br />
        {new Date(meal.datetime).toLocaleString("pt-BR")}
      </div>

      <Link to={`/meals/${meal.id}`}>
        <button>Ver</button>
      </Link>
    </li>
  )
}
