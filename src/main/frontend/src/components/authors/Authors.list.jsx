import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { config } from '../../constants/global.constants';
import { deleteAuthor, deleteAuthorClear, getAuthors, getAuthorsClear } from '../../core/store/actions/authors.action'; 
import LoadingComponent from '../Loading.component'; 
import MainContainer from '../Main.container';

const columnsConfig = [
    {
        key : "first_name",
        width : "30%",
        title : "First name"
    },
    {
        key : "last_name",
        width : "30%",
        title : "Last name"
    },
    {
        key : "birth_date",
        width : "30%",
        title : "Birthdate"
    },
    {
        key : "$$column_actions",
        width : "10%",
        title : "Actions"
    }
]

export default () => {

    const [page, setPage] = useState({
        number : 0,
        size: config.pageSize
    });

    const dispatch = useDispatch();
    const authorsList = useSelector(state => state.authors);
    const {deleted,totalPages, loading, errors, list} = authorsList;
  

     
    useEffect(() => {
        dispatch(getAuthors(page.number,page.size ));
        return () => {
            // Clean author list
            dispatch(getAuthorsClear());
        }
    }, [page]);

    useEffect(() => {
        if(deleted){
            toggle();
            dispatch(getAuthors(page.number,page.size ));
        }
    }, [deleted])



    const [modal, setModal] = useState(false);
    const [theIdToDelete, setIdToDelete] = useState(-1);
    const toggle = () => {
        if(modal){ 
            dispatch(deleteAuthorClear());
        }
        setModal(!modal);
    }

    const remove = (id) => {
        toggle();
        setIdToDelete(id);
    }
    const dismiss = ()=> {
        toggle();
        setIdToDelete(-1);
    }

    const executedRemove = () =>{ 
        dispatch(deleteAuthor(theIdToDelete));
    }


    const Actions = ({id }) => (
        <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/authors/" + id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => remove(id)}>Delete</Button>
        </ButtonGroup>
    );
    
 
     return (<>
     <MainContainer 
                        loading={loading} 
                        list = {list} 
                        pagesCount = {totalPages}
                        containerConfig={{
                            title :"Authors",
                            addButtonLabel : "Add new author",
                            addAction : "new", 
                            columnsConfig,
                            Actions, 
                            setPage, 
                            page }}/>
      <Modal isOpen={modal}
        toggle={toggle}
        modalTransition={{ timeout: 200 }}>
        <ModalBody>
            Voulez vous supprimer ce author?
        </ModalBody>
        <ModalFooter>
            <Button color="danger" onClick={executedRemove}>Supprimer</Button>
            <Button color="primary" onClick={dismiss}>Annuler</Button>
        </ModalFooter>
    </Modal>
     
     </>)
}
