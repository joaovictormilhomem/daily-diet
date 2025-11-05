import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { api } from "../services/api"

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleRegister(e) {
    e.preventDefault()
    setError("")

    try {
      await api.post("/register", { name, email, password })
      navigate("/login")
    } catch (err) {
      console.log(err)
      setError("Erro ao criar conta. Verifique os dados e tente novamente.")
    }
  }

  return (
    <div style={{ maxWidth: 350, margin: "60px auto", textAlign: "center" }}>
      <h2>Criar Conta</h2>

      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p style={{ marginTop: 16 }}>
        Já possui conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  )
}