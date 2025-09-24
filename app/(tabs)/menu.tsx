import DrawerModal from '@/components/DrawerModal';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MenuScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [drawerVisible, setDrawerVisible] = useState(false);

  const menuCategories = [
    {
      title: 'Categorias',
      items: [
        {
          title: 'Ação',
          icon: 'flash-outline',
          onPress: () => Alert.alert('Em breve', 'Categoria Ação em desenvolvimento'),
        },
        {
          title: 'Comédia',
          icon: 'happy-outline',
          onPress: () => Alert.alert('Em breve', 'Categoria Comédia em desenvolvimento'),
        },
        {
          title: 'Drama',
          icon: 'film-outline',
          onPress: () => Alert.alert('Em breve', 'Categoria Drama em desenvolvimento'),
        },
        {
          title: 'Terror',
          icon: 'skull-outline',
          onPress: () => Alert.alert('Em breve', 'Categoria Terror em desenvolvimento'),
        },
        {
          title: 'Romance',
          icon: 'heart-outline',
          onPress: () => Alert.alert('Em breve', 'Categoria Romance em desenvolvimento'),
        },
      ],
    },
    {
      title: 'Conteúdo',
      items: [
        {
          title: 'Filmes',
          icon: 'videocam-outline',
          onPress: () => Alert.alert('Em breve', 'Seção de Filmes em desenvolvimento'),
        },
        {
          title: 'Séries',
          icon: 'tv-outline',
          onPress: () => Alert.alert('Em breve', 'Seção de Séries em desenvolvimento'),
        },
        {
          title: 'Documentários',
          icon: 'library-outline',
          onPress: () => Alert.alert('Em breve', 'Seção de Documentários em desenvolvimento'),
        },
        {
          title: 'Animes',
          icon: 'color-palette-outline',
          onPress: () => Alert.alert('Em breve', 'Seção de Animes em desenvolvimento'),
        },
      ],
    },
    {
      title: 'Recursos',
      items: [
        {
          title: 'Buscar',
          icon: 'search-outline',
          onPress: () => Alert.alert('Em breve', 'Funcionalidade de busca em desenvolvimento'),
        },
        {
          title: 'Recomendações',
          icon: 'star-outline',
          onPress: () => Alert.alert('Em breve', 'Recomendações em desenvolvimento'),
        },
        {
          title: 'Top 10',
          icon: 'trophy-outline',
          onPress: () => Alert.alert('Em breve', 'Top 10 em desenvolvimento'),
        },
        {
          title: 'Lançamentos',
          icon: 'calendar-outline',
          onPress: () => Alert.alert('Em breve', 'Lançamentos em desenvolvimento'),
        },
      ],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header do Menu */}
        <View style={[styles.header, { backgroundColor: colors.tint }]}>
          <Text style={styles.headerTitle}>Menu</Text>
          <Text style={styles.headerSubtitle}>Explore nosso conteúdo</Text>
        </View>

        {/* Categorias do Menu */}
        {menuCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.categoryContainer}>
            <Text style={[styles.categoryTitle, { color: colors.text }]}>
              {category.title}
            </Text>
            
            {category.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[styles.menuItem, { borderBottomColor: colors.border }]}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={colors.text}
                    style={styles.menuItemIcon}
                  />
                  <Text style={[styles.menuItemText, { color: colors.text }]}>
                    {item.title}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.tabIconDefault}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Informações da App */}
        <View style={[styles.appInfo, { borderTopColor: colors.border }]}>
          <Text style={[styles.appInfoText, { color: colors.tabIconDefault }]}>
            AmazoniaFlix v1.0.0
          </Text>
          <Text style={[styles.appInfoText, { color: colors.tabIconDefault }]}>
            Sua plataforma de streaming favorita
          </Text>
        </View>
      </ScrollView>

      <DrawerModal 
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  categoryContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    marginRight: 16,
    width: 24,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  appInfo: {
    marginTop: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  appInfoText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
