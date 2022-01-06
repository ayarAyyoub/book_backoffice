import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookListPage from './app/pages/BookList.page';
import BookDetailsPage from './app/pages/BookDetails.page';
import { Provider } from 'react-redux';
import store from './app/core/state';

const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}> 
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                name="book-list"
                options={{ title: 'Book list' }}
                component={BookListPage}
              />
            <Stack.Screen
                name="book-detail"
                options={{ title: 'Book details' }}
                component={BookDetailsPage}
              />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
