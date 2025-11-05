import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export const createUser = async (req, res) => {
  const { name, email, password } = req.body
  const hash = await bcrypt.hash(password, 8)

  const user = await prisma.user.create({
    data: { name, email, password: hash }
  })

  return res.json(user)
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).json({ error: "Senha incorreta" })

  const token = jwt.sign({ id: user.id }, "chave_secreta", { expiresIn: "1d" })
  res.json({ token })
}

export const getMeal = async (req, res) => {
  const { id } = req.params

  const meal = await prisma.meal.findFirst({
    where: { id, userId: req.userId }
  })

  if (!meal) return res.status(404).json({ error: "Refeição não encontrada" })

  return res.json(meal)
}

export const updateMeal = async (req, res) => {
  const { id } = req.params
  const { name, description, datetime, inDiet } = req.body

  const meal = await prisma.meal.updateMany({
    where: { id, userId: req.userId },
    data: {
      name,
      description,
      datetime: new Date(datetime),
      inDiet
    }
  })

  if (meal.count === 0) return res.status(404).json({ error: "Refeição não encontrada" })

  return res.json({ message: "Atualizada com sucesso" })
}

export const deleteMeal = async (req, res) => {
  const { id } = req.params

  const meal = await prisma.meal.deleteMany({
    where: { id, userId: req.userId }
  })

  if (meal.count === 0) return res.status(404).json({ error: "Refeição não encontrada" })

  return res.json({ message: "Refeição excluída" })
}