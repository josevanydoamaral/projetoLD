import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ChatScreen from '../(tabs)/ChatScreen';
import ImageGenScreen from '../(tabs)/ImageGenScreen';

type TabParamList = {
  Chat: undefined;
  Imagem: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === 'Chat') iconName = 'chatbubble-outline';
          else iconName = 'image-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3366FF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Imagem" component={ImageGenScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
