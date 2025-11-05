import { Link, useNavigate } from "react-router-dom"

export default function Layout({ title, children }) {
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="container">
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30
      }}>
        <h2>{title}</h2>
        <button onClick={logout} className="btn-danger">Sair</button>
      </header>

      {children}
    </div>
  )
}
