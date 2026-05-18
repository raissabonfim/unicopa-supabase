import { StyleSheet, Text, View } from 'react-native'

import GameCard from './GameCard'

export default function DiaCard({ data, jogos }) {

  const hoje = new Date()

  const dia = String(hoje.getDate()).padStart(2, '0')
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')

  const dataHoje = `${dia}/${mes}`

  const isHoje = data === dataHoje

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