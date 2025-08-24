import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { tabsScreenProps } from '@/types/app/tabs'

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const tabsScreenList: Array<tabsScreenProps> = [
    {
      name: 'index',
      title: 'Home',
      iconName: 'house.fill'
    },
    {
      name: 'explore',
      title: 'Explore',
      iconName: 'paperplane.fill'
    },
    {
      name: 'test',
      title: 'Test',
      iconName: 'paperplane.fill'
    },
  ]

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      {tabsScreenList.map((item, index) => {
        return (
          <Tabs.Screen
            name={item.name}
            options={{
              title: item.title,
              tabBarIcon: ({ color }) => <IconSymbol size={28} name={item.iconName} color={color} />,
            }}
          />
        )
      })}
    </Tabs>
  );
}
