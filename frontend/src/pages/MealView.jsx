import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import Layout from "../components/Layout";

export default function MealView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("");
  const [inDiet, setInDiet] = useState(true);

  async function loadMeal() {
    try {
      const response = await api.get(`/meals/${id}`);
      const meal = response.data;
      setName(meal.name);
      setDescription(meal.description);
      const dt = new Date(meal.datetime);
      const localISO = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setDatetime(localISO);
      setInDiet(meal.inDiet);
    } catch {
      navigate("/meals");
    }
  }

  useEffect(() => {
    loadMeal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleUpdate(e) {
    e.preventDefault();
    await api.put(`/meals/${id}`, { name, description, datetime, inDiet });
    navigate("/meals");
  }

  async function handleDelete() {
    if (confirm("Excluir esta refeição?")) {
      await api.delete(`/meals/${id}`);
      navigate("/meals");
    }
  }

  return (
    <Layout title="Detalhes">
      <form
        onSubmit={handleUpdate}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <input
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          required
        />

        <div style={{ display: "flex", gap: 10 }}>
          <label>
            <input
              type="radio"
              name="diet"
              checked={inDiet === true}
              onChange={() => setInDiet(true)}
            />
            Dentro da dieta
          </label>

          <label>
            <input
              type="radio"
              name="diet"
              checked={inDiet === false}
              onChange={() => setInDiet(false)}
            />
            Fora da dieta
          </label>
        </div>

        <button type="submit">Salvar alterações</button>
      </form>

      <button
        onClick={handleDelete}
        style={{ marginTop: 20, background: "#d93434", width: "100%" }}
      >
        Excluir Refeição
      </button>
      <Link to="/meals">
        <button style={{ width: "100%", marginTop: 20 }}>Voltar</button>
      </Link>
    </Layout>
  );
}
