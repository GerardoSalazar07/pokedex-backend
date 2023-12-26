import { Router } from 'express'

import { getPokemons } from '../controllers/pokemons.js'

const router = Router()

router.get('/', getPokemons)

export default router