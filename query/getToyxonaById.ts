import $axios from '~/http'

export const getToyxonaById = async (id: string) => {
  const { data } = await $axios.get('/toyxonalar/detail', { params: { id } })
  return data.data // yoki mos ravishda data.toyxona
}
