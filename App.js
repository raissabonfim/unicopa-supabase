import { StyleSheet, Text, View, Image, ImageBackground, SectionList } from 'react-native'

import { formatarData } from './utils/DateFormat'
import { agruparPorData } from './utils/agruparPorData'

import DiaCard from './components/DiaCard'

import { useEffect, useState } from 'react'

import { supabase } from './utils/supabase'

export default function App() {

  const [jogos, setJogos] = useState([])

  useEffect(() => {

    async function carregarJogos() {

      const { data, error } = await supabase
        .from('jogos')
        .select('*')
        .order('data_brasilia', { ascending: false })

      if (!error) {
        setJogos(data)
      }

    }

    carregarJogos()

  }, [])

  const hoje = formatarData(new Date())

  const jogosOrdenados = [...jogos].sort((a, b) => {

    return (
      new Date(`${a.data_brasilia} ${a.hora_brasilia}`) -
      new Date(`${b.data_brasilia} ${b.hora_brasilia}`)
    )

  })

  const jogosAgrupados = agruparPorData(jogosOrdenados)

  const jogosTratados = Object.keys(jogosAgrupados).map(data => {

    return {
      title: data,
      data: jogosAgrupados[data]
    }

  })

  return (

    <ImageBackground
      style={styles.container}
      source={require('./assets/bg-overlay.png')}
    >

      <Image
        style={styles.logo}
        source={require('./assets/unicopa.png')}
      />

      <Text style={styles.title}>CALENDÁRIO</Text>

      <SectionList
        sections={jogosTratados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={() => null}
        renderSectionHeader={({ section }) => (

          <DiaCard
            data={section.title}
            jogos={section.data}
          />

        )}
      />

    </ImageBackground>

  )
}

const styles = StyleSheet.create({

  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#040b13',
    alignItems: 'center',
  },

  logo: {
    marginTop: 20,
    width: 200,
    height: 50,
    resizeMode: 'contain'
  },

  title: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },

  card: {
    marginTop: 20,
    backgroundColor: '#0c1b2a',
    width: 320,
    borderRadius: 12,
    padding: 15,
  },

  data: {
    color: '#f2cc2f',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },

})