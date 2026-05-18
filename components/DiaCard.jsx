import { StyleSheet, Text, View } from 'react-native'

import GameCard from './GameCard'

import { formatarData } from '../utils/DateFormat'

export default function DiaCard({ data, jogos }) {

  const hoje = formatarData(new Date().toISOString().split('T')[0])

  const isHoje = data === hoje

  return (

    <View style={[styles.card, isHoje && styles.cardHoje]}>

      <Text style={[styles.data, isHoje && styles.dataHoje]}>
        {data}
      </Text>

      {jogos.map((game) => (
        <GameCard
          key={game.id}
          game={game}
        />
      ))}

    </View>
  )
}

const styles = StyleSheet.create({

  card: {
    marginTop: 20,
    backgroundColor: '#0c1b2a',
    width: 320,
    borderRadius: 12,
    padding: 15,
  },

  cardHoje: {
    borderWidth: 2,
    borderColor: '#f2cc2f'
  },

  data: {
    color: '#f2cc2f',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },

  dataHoje: {
    color: '#ffffff'
  }

})