
import { isEmpty } from 'lodash'; 
import React, { useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import { config } from '../../constants/global.constants';
import { routes } from '../../constants/routes.constant';
import { getCategories, getCategoriesClear, getCategory, getCategoryClear, persistCategory } from '../../core/store/actions/categories.action';
 
import LoadingComponent from '../Loading.component';

export default () =>{

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    
    const initialState = {
        id : undefined,
        name :undefined,
        parent  :undefined
    }
    const [categoryLocal, setCategory] = useState(initialState);
    const [page, setPage] = useState({
        number : 0,
        size: config.pageSize
    });
 
    const [action, setAction] = useState("POST");

    const {sended, loading, errors, category, list } = useSelector(state => state.categories);

    useEffect(() => {
        if(id !== "new"){
            dispatch(getCategory( id ));
            setAction("PUT");
        }else{
            setAction("POST");
        }
        return () => { 
            dispatch(getCategoryClear()); 
        }
    }, [id]);

    useEffect(() => {
        if( isEmpty(list))
        dispatch(getCategories(page.number,page.size ));
        return () => {
            // Clean author list
            dispatch(getCategoriesClear());
        }
    }, [])


    useEffect(() => {
        if( category !== null ){
            setCategory(category);
        }
      
    }, [category]);


    useEffect(() => {
        if( sended ){
            navigate(routes.categories.path);
        }
      
    }, [sended]);




    const handleChange = (event) => { 
         
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let tempCategory = {...categoryLocal};
        tempCategory[name] = value;
      
        setCategory({...tempCategory});
    }

    const handleCategorySelected = (event) =>{
        let tempCategory = {...categoryLocal};
        tempCategory["parent"] = {
            id : event.target.value
        };
        setCategory({...tempCategory});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(persistCategory(categoryLocal,action));
    }



    console.log()
    return (loading)? <LoadingComponent /> :(
        <CardStyled>
            <CardTitleStyled as="h5">Category form</CardTitleStyled>
            <CardBody>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input invalid={errors && errors.name} type="text" name="name" id="name" 
                            value={categoryLocal.name || ''}
                            onChange={handleChange}/>
                    <FormFeedback>{errors && errors.name}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="parent">Parent</Label>
                    <Input invalid={errors && errors.parent} type="select" name="parent" id="parent" value={categoryLocal.parent?.id || ''}
                            onChange={handleCategorySelected} >
                                <option></option>
                        {
                            list
                            .filter(cat=> cat.id != categoryLocal?.id )
                            .map(cat => <option key={`parent-select-${cat.id}`} value={ cat.id}>{cat.name}</option>)
                        }
                    </Input>
                            <FormFeedback>{errors && errors.parent}</FormFeedback>
                </FormGroup> 
 

                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to={routes.categories.path}>Cancel</Button>
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
    width: 70%;
`;

