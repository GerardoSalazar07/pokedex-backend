import axios from 'axios'

const POKEAPI_URL = 'https://pokeapi.co/api/v2'

const getPokemons = async(req = request, res = response) => {
    const { limit = 1302, page = 1, search } = req.query
    const offset = (page - 1) * limit

    const apiUrl = `${POKEAPI_URL}/pokemon/?limit=1302`
    const response = await axios.get(apiUrl)
    let pokemons = response.data.results.map(pokemon => pokemon.name).sort((a, b) => a.localeCompare(b))

    if (search) {
        pokemons = pokemons.filter(pokemon => pokemon.includes(search.toLowerCase()))
    }

    if (offset >= pokemons.length) {
        return res.status(400).json({
            error: '¡No hay Pokémons aquí!'
        })
    }

    pokemons = pokemons.slice(offset, offset + Number(limit))

    res.json({ pokemons })
}

export {
    getPokemons
}