import { formatarData } from './DateFormat'

export function agruparPorData(jogos) {

  return jogos.reduce((acc, jogo) => {

    const data = formatarData(jogo.data_brasilia)

    if (!acc[data]) {
      acc[data] = []
    }

    acc[data].push(jogo)

    return acc

  }, {})
}