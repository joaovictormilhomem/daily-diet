import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createMeal = (req, res) => {
  const { name, description, datetime, inDiet } = req.body

  prisma.meal.create({
    data: {
      name,
      description,
      datetime: new Date(datetime),
      inDiet,
      userId: req.userId
    }
  }).then(meal => res.json(meal))
}

export const listMeals = (req, res) => {
  prisma.meal.findMany({
    where: { userId: req.userId }
  }).then(data => res.json(data))
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

export const getMetrics = async (req, res) => {
  const meals = await prisma.meal.findMany({
    where: { userId: req.userId },
    orderBy: { datetime: "asc" }
  })

  const total = meals.length
  const totalInDiet = meals.filter(m => m.inDiet).length
  const totalOutDiet = meals.filter(m => !m.inDiet).length

  let bestSequence = 0
  let currentSequence = 0

  for (const meal of meals) {
    if (meal.inDiet) {
      currentSequence++
      if (currentSequence > bestSequence) bestSequence = currentSequence
    } else {
      currentSequence = 0
    }
  }

  return res.json({
    total,
    totalInDiet,
    totalOutDiet,
    bestSequence
  })
}
