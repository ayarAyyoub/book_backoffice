
import { isEmpty } from 'lodash'; 
import React, { useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label, List, Table } from 'reactstrap';
import styled from 'styled-components';
import { config } from '../../constants/global.constants';
import { routes } from '../../constants/routes.constant';
import { getAuthors } from '../../core/store/actions/authors.action';
import {  getBook, getBookClear, persistBook } from '../../core/store/actions/books.action';
import { getCategories } from '../../core/store/actions/categories.action';
 
import LoadingComponent from '../Loading.component';

export default () =>{

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    
    const initialState = {
        id : undefined,
        title :undefined,
        total_pages  :undefined,
        published_date : undefined,
        author : undefined,
        photo : undefined,
        categories : []
    }
    const [bookLocal, setBook] = useState(initialState);
    const [page, setPage] = useState({
        number : 0,
        size: config.pageSize
    });
 
    const [action, setAction] = useState("POST");
    const [selectedCats, setSelectedCats] = useState([]);

    const {sended, loading, errors, book, list } = useSelector(state => state.books);
    const { list : categoriesList } = useSelector(state => state.categories);
    const { list : authorsList } = useSelector(state => state.authors);
    useEffect(() => {
        if(id !== "new"){
            dispatch(getBook( id ));
            setAction("PUT");
        }else{
            setAction("POST");
        }
        return () => { 
            dispatch(getBookClear()); 
        }
    }, [id]);

    useEffect(() => {
        if( isEmpty(categoriesList))
            dispatch(getCategories(page.number,page.size ));
        if( isEmpty(authorsList))
            dispatch(getAuthors(page.number,page.size ));
         
    }, [])


    useEffect(() => {
        if( book !== null ){
            setSelectedCats([...book.categories]);
            setBook(book);
            
        }
      
    }, [book]);


    useEffect(() => {
        if( sended ){
            navigate(routes.books.path);
        }
      
    }, [sended]);




    const handleChange = (event) => { 
         
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let tempBook = {...bookLocal};
        tempBook[name] = value;
      
        setBook({...tempBook});
    }

    const handleAuthorSelected = (event) =>{
        let tempBook = {...bookLocal};
        tempBook["author"] = {
            id : event.target.value
        };
        setBook({...tempBook});
    }

    

    const handleCategoriesSelected = (event) =>{  
        setSelectedCats([
            ...selectedCats, 
            categoriesList.filter(c => c.id+'' === event.target.value)[0]]);
    }

    const handlePhotoChange = (event) =>{
        let tempBook = {...bookLocal};
        tempBook["photo"] = {
            link : event.target.value
        };
        setBook({...tempBook});
    }
 

    const handleSubmit = (e) =>{
        e.preventDefault();

        dispatch(persistBook({
            ...bookLocal,
            categories : [...selectedCats]
        },action));
    }


    const remove = (id) =>{
        console.log(id);
        setSelectedCats(old => [...old.filter(c => c.id !== id)]);
    }



 
    return (loading)? <LoadingComponent /> :(
        <CardStyled>
            <CardTitleStyled as="h5">Book form</CardTitleStyled>
            <CardBody>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Title</Label>
                    <Input invalid={errors && errors.name} type="text" name="title" id="title" 
                            value={bookLocal.title || ''}
                            onChange={handleChange}/>
                    <FormFeedback>{errors && errors.title}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="photo">Photo Url</Label>
                    <Input invalid={errors && errors.photo} type="text" name="photo" id="photo" 
                            value={bookLocal.photo?.link || ''}
                            onChange={handlePhotoChange}/>
                    <FormFeedback>{errors && errors.photo}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="total_pages">Total pages</Label>
                    <Input invalid={errors && errors.totalPages} type="number" name="total_pages" id="total_pages" 
                            value={bookLocal.total_pages || ''}
                            onChange={handleChange}/>
                    <FormFeedback>{errors && errors.totalPages}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="birth_date">Published date</Label>
                    <Input  
                        invalid={errors && errors.publishedDate}
                        type="date" 
                        name="published_date" 
                        id="published_date" value={bookLocal.published_date || ''}
                            onChange={handleChange} />
                    <FormFeedback>{errors && errors.publishedDate}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="parent">Author</Label>
                    <Input invalid={errors && errors.author} type="select" name="author" id="author" value={bookLocal.author?.id || ''}
                            onChange={handleAuthorSelected} >
                                <option></option>
                        {
                            authorsList
                            .map(auth => <option key={`author-select-${auth.id}`} value={ auth.id}>{auth.first_name + " "+ auth.last_name}</option>)
                        }
                    </Input>
                            <FormFeedback>{errors && errors.author}</FormFeedback>
                </FormGroup> 

                <TableStyled >
                    <tbody>
                    {
                        selectedCats.map(el=> (<tr key={`cats-select-${el.id}`}>
                            <td>{el?.name}</td>
                            <td>
                                <Button size="sm" color="danger" onClick={() => remove(el.id)}>Delete</Button>
                            </td>
                        </tr>))
                    }
                    </tbody>
                </TableStyled>
                
                <FormGroup>
                    <Label for="categories">Categories</Label>
                    <Input invalid={errors && errors.categories} type="select" name="categories" id="categories" 
                            onChange={handleCategoriesSelected} >
                                <option></option>
                                {
                                    categoriesList.filter(el => selectedCats.indexOf(el) < 0)
                                    .map(cat => <option key={`cat-select-${cat.id}`} value={ cat.id}>{cat.name }</option>)
                                }
                    </Input>
                            <FormFeedback>{errors && errors.categories}</FormFeedback>
                </FormGroup> 
 
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to={routes.books.path}>Cancel</Button>
                </FormGroup>
            </Form>
            </CardBody>
        </CardStyled>
    )
}

const CardTitleStyled = styled(CardTitle)`  
    
`;

const CardStyled = styled(Card)`  
    margin: auto;
    margin-top:30px;
    padding : 10px 20px;
    width: 90%;
`;

const TableStyled = styled(Table)`  
    width: 30%;
`;
 




