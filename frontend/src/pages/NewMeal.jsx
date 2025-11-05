import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"
import Layout from "../components/Layout"

export default function NewMeal() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [datetime, setDatetime] = useState("")
  const [inDiet, setInDiet] = useState(true)
  const [error, setError] = useState("")

  async function handleCreateMeal(e) {
    e.preventDefault()
    setError("")

    try {
      await api.post("/meals", {
        name,
        description,
        datetime,
        inDiet
      })
      navigate("/meals")
    } catch (err) {
      console.log(err)
      setError("Erro ao salvar refeição")
    }
  }

  return (
    <Layout title="Nova Refeição">
      <form onSubmit={handleCreateMeal} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="text"
          placeholder="Nome da refeição"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />

        <input
          type="datetime-local"
          value={datetime}
          onChange={e => setDatetime(e.target.value)}
          required
        />

        <div style={{ display: "flex", gap: 10 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <input
              type="radio"
              name="diet"
              value="true"
              checked={inDiet === true}
              onChange={() => setInDiet(true)}
            />
            Dentro da dieta
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <input
              type="radio"
              name="diet"
              value="false"
              checked={inDiet === false}
              onChange={() => setInDiet(false)}
            />
            Fora da dieta
          </label>
        </div>

        <button type="submit">Salvar Refeição</button>
      </form>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </Layout>
  )
}
