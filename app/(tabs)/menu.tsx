import DrawerModal from '@/components/DrawerModal';
import ParallaxLayout from '@/components/ParallaxLayout';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MenuScreen() {
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
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <ParallaxLayout>
        {/* Header do Menu */}
        <View style={styles.menuHeader}>
          <Text style={[styles.headerTitle, { color: Colors.text }]}>Menu</Text>
          <Text style={[styles.headerSubtitle, { color: Colors.tabIconDefault }]}>Explore nosso conteúdo</Text>
        </View>

        {/* Categorias do Menu */}
        {menuCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.categoryContainer}>
            <Text style={[styles.categoryTitle, { color: Colors.text }]}>
              {category.title}
            </Text>

            {category.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[styles.menuItem, { borderBottomColor: Colors.border }]}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={Colors.text}
                    style={styles.menuItemIcon}
                  />
                  <Text style={[styles.menuItemText, { color: Colors.text }]}>
                    {item.title}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.tabIconDefault}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Informações da App */}
        <View style={[styles.appInfo, { borderTopColor: Colors.border }]}>
          <Text style={[styles.appInfoText, { color: Colors.tabIconDefault }]}>
            AmazoniaFlix v1.0.0
          </Text>
          <Text style={[styles.appInfoText, { color: Colors.tabIconDefault }]}>
            Sua plataforma de streaming favorita
          </Text>
        </View>
      </ParallaxLayout>

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
  menuHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
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
