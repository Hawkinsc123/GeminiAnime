export async function getAnimeCharacterImage(name) {
  const endpoint = 'https://api.jikan.moe/v4/characters'
  const options = {
    headers: {
      'accept': 'application/json'
    }
  }

  const response = await fetch(`${endpoint}?q=${encodeURIComponent(name)}`, options)
  const json = await response.json()

  // Jikan API returns data in a different structure
  return json.data[0]?.images?.jpg?.image_url || null
}
