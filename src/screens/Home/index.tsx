import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native"
import { styles } from './styles'

import { Participant } from "../../Components/Participant"

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert("Existe", "Ja existe esse participante")
    }

    if (participantName === '') {
      return Alert.alert("Nao existe", "Nao 'e participante")
    }

    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {


    Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: "Nao",
        style: 'cancel'
      }
    ])

    console.log(`Removeu ${name}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de novembro de 2022
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor='#6B6C6B'
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() =>
              handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguem chegou no evento ainda? Adicione participantes a sua lista de presenca.
          </Text>
        )}
      />

    </View>
  )
}