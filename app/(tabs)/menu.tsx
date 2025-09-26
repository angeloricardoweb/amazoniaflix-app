import DrawerModal from '@/components/DrawerModal';
import ParallaxLayout from '@/components/ParallaxLayout';
import { Colors } from '@/constants/theme';
import useFetchCategorias from '@/hooks/useFetchCategorias';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function MenuScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { data: categorias } = useFetchCategorias();

  const handleSearch = () => {
    router.push('/search');
  };

  const handleCategoryPress = (categoria: any) => {
    router.push(`/category/${categoria.slug}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <ParallaxLayout>
        {/* Header do Menu */}
        <View style={styles.menuHeader}>
          <Text style={[styles.headerTitle, { color: Colors.text }]}>Menu</Text>
          <Text style={[styles.headerSubtitle, { color: Colors.tabIconDefault }]}>Explore nosso conteúdo</Text>
        </View>

        {/* Busca */}
        <View style={styles.categoryContainer}>
          <Text style={[styles.categoryTitle, { color: Colors.text }]}>
            Busca
          </Text>
          <TouchableOpacity
            style={[styles.menuItem, { borderBottomColor: Colors.border }]}
            onPress={handleSearch}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="search-outline"
                size={24}
                color={Colors.text}
                style={styles.menuItemIcon}
              />
              <Text style={[styles.menuItemText, { color: Colors.text }]}>
                Buscar Conteúdo
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.tabIconDefault}
            />
          </TouchableOpacity>
        </View>

        {/* Categorias */}
        <View style={styles.categoryContainer}>
          <Text style={[styles.categoryTitle, { color: Colors.text }]}>
            Categorias
          </Text>

          {!categorias ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={Colors.tint} />
              <Text style={[styles.loadingText, { color: Colors.tabIconDefault }]}>
                Carregando categorias...
              </Text>
            </View>
          ) : categorias.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: Colors.tabIconDefault }]}>
                Nenhuma categoria disponível
              </Text>
            </View>
          ) : (
            categorias.map((categoria, index) => (
              <TouchableOpacity
                key={categoria.id}
                style={[
                  styles.menuItem,
                  { borderBottomColor: Colors.border },
                  index === categorias.length - 1 && styles.lastMenuItem
                ]}
                onPress={() => handleCategoryPress(categoria)}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons
                    name="folder-outline"
                    size={24}
                    color={Colors.text}
                    style={styles.menuItemIcon}
                  />
                  <Text style={[styles.menuItemText, { color: Colors.text }]}>
                    {categoria.titulo}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.tabIconDefault}
                />
              </TouchableOpacity>
            ))
          )}
        </View>

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
      <StatusBar style="light" />
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
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 14,
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 14,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
});
