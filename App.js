import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  SectionList,
  TouchableOpacity
} from 'react-native'

import { formatarData } from './utils/DateFormat'
import { agruparPorData } from './utils/agruparPorData'

import DiaCard from './components/DiaCard'

import { useEffect, useState } from 'react'

import { supabase } from './utils/supabase'

import jogosJson from './data/jogos.json'

export default function App() {

  const [jogos, setJogos] = useState([])
  const [grupoSelecionado, setGrupoSelecionado] = useState(null)

  useEffect(() => {

    async function importarJogos() {

      for (const jogo of jogosJson) {

        const { data } = await supabase
          .from('jogos')
          .select('id')
          .eq('id', jogo.id)

        if (data.length === 0) {

          await supabase
            .from('jogos')
            .insert(jogo)

        }

      }

    }

    async function carregarJogos() {

      const { data, error } = await supabase
        .from('jogos')
        .select('*')
        .order('data_brasilia', { ascending: false })

      if (!error) {
        setJogos(data)
      }

    }

    importarJogos()
    carregarJogos()

  }, [])

  const hoje = formatarData(new Date())

  const jogosFiltrados = grupoSelecionado
    ? jogos.filter(jogo => jogo.grupo === grupoSelecionado)
    : jogos

  const jogosOrdenados = [...jogosFiltrados].sort((a, b) => {

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

      <View style={styles.filtros}>

        {['A', 'B', 'C', 'D'].map((grupo) => (

          <TouchableOpacity
            key={grupo}
            style={[
              styles.botaoGrupo,
              grupoSelecionado === grupo &&
              styles.botaoGrupoAtivo
            ]}
            onPress={() =>
              setGrupoSelecionado(
                grupoSelecionado === grupo
                  ? null
                  : grupo
              )
            }
          >

            <Text style={styles.textoGrupo}>
              Grupo {grupo}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      {jogosTratados.length === 0 ? (

        <View style={styles.semJogos}>

          <Text style={styles.textoSemJogos}>
            Nenhum jogo carregado
          </Text>

        </View>

      ) : (

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

      )}

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

  filtros: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 15,
  },

  botaoGrupo: {
    backgroundColor: '#1e2d3d',
    padding: 10,
    borderRadius: 8
  },

  botaoGrupoAtivo: {
    backgroundColor: '#f2cc2f'
  },

  textoGrupo: {
    color: 'white',
    fontWeight: 'bold'
  },

  semJogos: {
    marginTop: 50,
    backgroundColor: '#0c1b2a',
    padding: 20,
    borderRadius: 10
  },

  textoSemJogos: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
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