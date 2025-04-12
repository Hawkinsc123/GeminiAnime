export async function getBirdImage(name) {
  const endpoint = 'https://nuthatch.lastelm.software/v2/birds'
  const options = {
    headers: {
      'accept': 'application/json',
      'API-Key': process.env.BIRD_API_KEY
    }
  }

  const response = await fetch(`${endpoint}?page=1&pageSize=100&name=${name}&region=North%20America&operator=AND`, options)
  const json = await response.json()

  return json.entities[0].images[0]
}
