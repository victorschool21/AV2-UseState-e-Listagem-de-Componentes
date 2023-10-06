import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const pacientesAgendados = [
  // ...dados existentes
];

export default function App() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');
  const [pacientes, setPacientes] = useState(pacientesAgendados);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const agendarConsulta = () => {
    const novoPaciente = {
      id: Math.random().toString(),
      nome,
      dataNascimento,
      cpf,
      endereco,
      dataConsulta,
      valorCobrado: '100.00',
    };

    setPacientes([...pacientes, novoPaciente]);
    setModalVisible(false);

    console.table(novoPaciente);
  };

  const excluirPaciente = (id) => {
    const novosPacientes = pacientes.filter((paciente) => paciente.id !== id);
    setPacientes(novosPacientes);
    setSelectedPatient(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultório Médico</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Agendar Consulta</Text>
      </TouchableOpacity>

      <FlatList
        data={pacientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.pacienteItem}
            onPress={() => setSelectedPatient(item)}
          >
            <Text style={styles.pacienteInfo}><Text style={styles.label}>Nome:</Text> {item.nome}</Text>
            <Text style={styles.pacienteInfo}><Text style={styles.label}>Data de Nascimento:</Text> {item.dataNascimento}</Text>
            <Text style={styles.pacienteInfo}><Text style={styles.label}>CPF:</Text> {item.cpf}</Text>
            <Text style={styles.pacienteInfo}><Text style={styles.label}>Endereço:</Text> {item.endereco}</Text>
            <Text style={styles.pacienteInfo}><Text style={styles.label}>Data da Consulta:</Text> {item.dataConsulta}</Text>
            <Text style={styles.pacienteInfo}><Text style={styles.label}>Valor Cobrado:</Text> R$ {item.valorCobrado}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => excluirPaciente(item.id)}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Agendar Consulta</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            onChangeText={(text) => setNome(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            onChangeText={(text) => setDataNascimento(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            onChangeText={(text) => setCpf(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            onChangeText={(text) => setEndereco(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Data da Consulta (AAAA-MM-DD)"
            onChangeText={(text) => setDataConsulta(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={agendarConsulta}
            >
              <Text style={styles.buttonText}>Agendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {selectedPatient && (
        <Modal visible={true} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Detalhes do Paciente</Text>
            <Text style={styles.modalText}><Text style={styles.label}>Nome:</Text> {selectedPatient.nome}</Text>
            <Text style={styles.modalText}><Text style={styles.label}>Data de Nascimento:</Text> {selectedPatient.dataNascimento}</Text>
            <Text style={styles.modalText}><Text style={styles.label}>CPF:</Text> {selectedPatient.cpf}</Text>
            <Text style={styles.modalText}><Text style={styles.label}>Endereço:</Text> {selectedPatient.endereco}</Text>
            <Text style={styles.modalText}><Text style={styles.label}>Data da Consulta:</Text> {selectedPatient.dataConsulta}</Text>
            <Text style={styles.modalText}><Text style={styles.label}>Valor Cobrado:</Text> R$ {selectedPatient.valorCobrado}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedPatient(null)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  pacienteItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pacienteInfo: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  confirmButton: {
    backgroundColor: '#007BFF',
  },
  label: {
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 8,
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
