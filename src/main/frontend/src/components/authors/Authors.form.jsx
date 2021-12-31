
import React, { useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import { routes } from '../../constants/routes.constant';
import { getAuthor, getAuthorClear, persistAuthor } from '../../core/store/actions/authors.action';
import LoadingComponent from '../Loading.component';

export default () =>{

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialState = {
        id : undefined,
        first_name :undefined,
        last_name  :undefined,
        birth_date :undefined
    }
    const [authorLocal, setAuthor] = useState(initialState);
 
    const [action, setAction] = useState("POST");

    const {sended, loading, errors, author } = useSelector(state => state.authors);

    useEffect(() => {
        if(id !== "new"){
            dispatch(getAuthor( id ));
            setAction("PUT");
        }else{
            setAction("POST");
        }
        return () => { 
            dispatch(getAuthorClear()); 
        }
    }, [id]);


    useEffect(() => {
        if( author !== null ){
            setAuthor(author);
        }
      
    }, [author]);

    useEffect(() => {
        if( sended ){
            navigate(routes.authors.path);
        }
      
    }, [sended]);




    const handleChange = (event) => { 
         
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let tempAuthor = {...authorLocal};
        tempAuthor[name] = value;
      
        setAuthor({...tempAuthor});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(persistAuthor(authorLocal,action));
    }



    console.log()
    return (loading)? <LoadingComponent /> :(
        <CardStyled>
            <CardTitleStyled as="h5">Author form</CardTitleStyled>
            <CardBody>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="first_name">First name</Label>
                    <Input invalid={errors && errors.firstName} type="text" name="first_name" id="first_name" 
                            value={authorLocal.first_name || ''}
                            onChange={handleChange}/>
                    <FormFeedback>{errors && errors.firstName}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="last_name">Last name</Label>
                    <Input invalid={errors && errors.lastName} type="text" name="last_name" id="last_name" value={authorLocal.last_name || ''}
                            onChange={handleChange} />
                            <FormFeedback>{errors && errors.lastName}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="birth_date">Birth date</Label>
                    <Input  
                        invalid={errors && errors.birthDate}
                        type="date" 
                        name="birth_date" 
                        id="birth_date" value={authorLocal.birth_date || ''}
                            onChange={handleChange} />
                    <FormFeedback>{errors && errors.birthDate}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to={routes.authors.path}>Cancel</Button>
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

