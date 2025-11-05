import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { api } from "../services/api"
import Layout from "../components/Layout"

export default function Metrics() {
  const navigate = useNavigate()
  const [metrics, setMetrics] = useState(null)

  async function loadMetrics() {
    try {
      const response = await api.get("/meals/metrics")
      setMetrics(response.data)
    } catch {
      navigate("/login")
    }
  }

  useEffect(() => {
    loadMetrics()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!metrics) return null

  return (
    <Layout title="Métricas">
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20, textAlign: "center" }}>
        <div style={{ background: "#bdc3c7", padding: 16, borderRadius: 8 }}>
          <strong>Total de refeições:</strong><br />
          {metrics.total}
        </div>

        <div style={{ background: "#d7ffd7", padding: 16, borderRadius: 8 }}>
          <strong>Dentro da dieta:</strong><br />
          {metrics.totalInDiet}
        </div>

        <div style={{ background: "#ffd7d7", padding: 16, borderRadius: 8 }}>
          <strong>Fora da dieta:</strong><br />
          {metrics.totalOutDiet}
        </div>

        <div style={{ background: "#e3e3ff", padding: 16, borderRadius: 8 }}>
          <strong>Melhor sequência dentro da dieta:</strong><br />
          {metrics.bestSequence}
        </div>

        <Link to="/meals">
          <button style={{ width: "100%", marginTop: 20 }}>
            Voltar
          </button>
        </Link>
      </div>
    </Layout>
  )
}
