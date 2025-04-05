import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá, como te posso ajudar?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;
    
    setMessages([...messages, { id: messages.length + 1, text: input, sender: 'user' }]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>IA Chat</Text>
        <Text style={styles.subtitle}>Converse com a nossa assistente IA</Text>
      </View>

      <ScrollView style={styles.chatArea}>
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.message, msg.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escreva a sua mensagem..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#3366FF', padding: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 14, color: 'white', marginTop: 5 },
  chatArea: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  message: { padding: 12, borderRadius: 10, maxWidth: '80%', marginVertical: 5 },
  botMessage: { backgroundColor: '#E3EAFD', alignSelf: 'flex-start' },
  userMessage: { backgroundColor: '#3366FF', alignSelf: 'flex-end' },
  messageText: { fontSize: 16, color: '#333' },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: 'white', borderTopWidth: 1, borderColor: '#DDD' },
  input: { flex: 1, padding: 10, backgroundColor: '#F0F0F0', borderRadius: 10, fontSize: 16 },
  sendButton: { marginLeft: 10, backgroundColor: '#3366FF', padding: 10, borderRadius: 10 },
});

export default ChatScreen;
