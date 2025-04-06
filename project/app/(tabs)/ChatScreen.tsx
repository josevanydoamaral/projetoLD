import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Send } from 'lucide-react-native';
import axios from 'axios';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

type ApiResponse = {
  [key: string]: {
    inProgress: boolean;
    start: string;
    response: string;
  }
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Olá, como te posso ajudar?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [typingMessage, setTypingMessage] = useState('');
  const [conversationId, setConversationId] = useState<number>();
  const typingIndex = useRef(0);
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      console.log('Sending request to API...');
      const prompt =  { prompt: userMessage.text }
      const response = await axios.post<ApiResponse>(`http://127.0.0.1:8080/api/chat/conversation/${conversationId}`, prompt);
      console.log('API Response:', response.data);

      const conversationData = response.data[conversationId || 100];
      if (!conversationData) {
        throw new Error('Invalid response format');
      }

      const botText = conversationData.response;
      
      setTypingMessage('');
      typingIndex.current = 0;

      const interval = setInterval(() => {
        setTypingMessage((prev) => {
          const nextChar = botText.charAt(typingIndex.current);
          typingIndex.current++;

          if (typingIndex.current > botText.length) {
            clearInterval(interval);
            setMessages((prev) => [
              ...prev,
              { id: prev.length + 1, text: botText, sender: 'bot' },
            ]);
            return '';
          }

          return prev + nextChar;
        });
      }, 30);

    } catch (error) {
      console.error('Error in API request:', error);
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: 'Error communicating with API.', sender: 'bot' },
      ]);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, typingMessage]);

  useEffect(() => {
    const newId = Math.floor(100000 + Math.random() * 900000);
    setConversationId(newId);
    console.log('Generated conversationId:', newId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Chat</Text>
        <Text style={styles.subtitle}>Chat with our AI Assistant</Text>
      </View>

      <ScrollView 
        style={styles.chatArea} 
        ref={scrollRef}
        contentContainerStyle={styles.chatContent}
      >
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            style={[
              styles.message, 
              msg.sender === 'user' ? styles.userMessage : styles.botMessage
            ]}
          >
            <Text style={[
              styles.messageText, 
              msg.sender === 'user' ? styles.userMessageText : styles.botMessageText
            ]}>
              {msg.text}
            </Text>
          </View>
        ))}

        {typingMessage !== '' && (
          <View style={[styles.message, styles.botMessage]}>
            <Text style={styles.messageText}>{typingMessage}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={!input.trim()}
        >
          <Send 
            size={24} 
            color="white"
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F5F5' 
  },
  header: { 
    backgroundColor: '#3366FF', 
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: 'white' 
  },
  subtitle: { 
    fontSize: 14, 
    color: 'rgba(255, 255, 255, 0.8)', 
    marginTop: 5 
  },
  chatArea: { 
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 32,
  },
  message: { 
    padding: 12, 
    borderRadius: 20, 
    maxWidth: '80%', 
    marginVertical: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  botMessage: { 
    backgroundColor: '#FFFFFF', 
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4,
  },
  userMessage: { 
    backgroundColor: '#3366FF', 
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
  },
  messageText: { 
    fontSize: 16,
    lineHeight: 24,
  },
  botMessageText: {
    color: '#2C3E50',
  },
  userMessageText: {
    color: 'white',
  },
  inputContainer: { 
    flexDirection: 'row', 
    padding: 16,
    paddingBottom: 24,
    backgroundColor: 'white',
    borderTopWidth: 1, 
    borderColor: '#E5E5E5',
    alignItems: 'flex-end',
  },
  input: { 
    flex: 1, 
    padding: 12,
    paddingTop: 12,
    backgroundColor: '#F8F9FA', 
    borderRadius: 20, 
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: '#3366FF',
    padding: 12,
    borderRadius: 50,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  sendIcon: {
    marginLeft: 2,
  },
});