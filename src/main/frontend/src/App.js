import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Navigate, Route,Routes as Switch } from 'react-router-dom';
 
import HeaderComponent from './components/Header.component';
import { routes } from './constants/routes.constant'; 
import AuthorPage from './pages/Author.page';
import CategoriesPage from './pages/Categories.page';
import BooksPage from './pages/Books.page';
import { Provider } from 'react-redux';
import store from './core/store'; 
import AuthorsForm from './components/authors/Authors.form';
import AuthorsList from './components/authors/Authors.list';
import CategoriesList from './components/categories/Categories.list';
import CategoriesForm from './components/categories/Categories.form';
import BooksList from './components/books/Books.list';
import BooksForm from './components/books/Books.form';

 
 
function App() {
  return (
    <Provider store={store}> 
      <Router>
        <HeaderComponent />
        <Switch>
          <Route exact path="/" element={<BooksPage />}/> 
          <Route path={`${routes.authors.path}/*`} element={<AuthorPage />}>
            <Route exact path='' element={<AuthorsList />} />
            <Route path=':id' element={<AuthorsForm />} />
          </Route>
          <Route path={`${routes.categories.path}/*`} element={<CategoriesPage />}>
            <Route exact path='' element={<CategoriesList />} />
            <Route path=':id' element={<CategoriesForm />} />
          </Route>
          <Route path={`${routes.books.path}/*`} element={<BooksPage />}>
            <Route exact path='' element={<BooksList />} />
            <Route path=':id' element={<BooksForm />} />
          </Route> 
          <Route
              path="*"
              element={<Navigate to="/" />}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
