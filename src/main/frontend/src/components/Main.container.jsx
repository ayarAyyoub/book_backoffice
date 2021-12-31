import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Container} from 'reactstrap';
import styled from 'styled-components';
import { ListComponent } from './List.component';
import LoadingComponent from './Loading.component';
import PaginatorComponent from './Paginator.component';

export default ({containerConfig,pagesCount,list, loading })=>{
    const {page, setPage, addButtonLabel, title,addAction,columnsConfig,  Actions} = containerConfig;
    return ( 
        <Container fluid>
            <AddButtonContainer>
                <Button color="primary" tag={Link} to={addAction}>{addButtonLabel}</Button>
            </AddButtonContainer>
            <h3>{title}</h3>
            {
                (loading)? <LoadingComponent />:
                (<>
                    <ListComponent 
                        columns = { columnsConfig } 
                        data={list} 
                        Actions={Actions}/>
                    <PaginatorComponent currentPage={page} pagesCount={pagesCount} setPage={setPage} />
                </>)
            }
            
        </Container>
    )
} 


const AddButtonContainer = styled.div`
    padding : 10px;
`;