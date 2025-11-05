import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { api } from "../services/api"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleLogin(e) {
    e.preventDefault()
    setError("")

    try {
      const response = await api.post("/login", { email, password })
      localStorage.setItem("token", response.data.token)
      navigate("/meals")
    } catch (err) {
      console.log(err)
      setError("Credenciais inválidas")
    }
  }

  return (
    <div style={{ maxWidth: 350, margin: "60px auto", textAlign: "center" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p style={{ marginTop: 16 }}>
        Não possui conta? <Link to="/register">Criar conta</Link>
      </p>
    </div>
  )
}