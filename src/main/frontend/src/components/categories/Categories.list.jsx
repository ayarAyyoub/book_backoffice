import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { config } from '../../constants/global.constants';
import { deleteCategory, deleteCategoryClear, getCategories, getCategoriesClear } from '../../core/store/actions/categories.action';
 import LoadingComponent from '../Loading.component'; 
import MainContainer from '../Main.container';

const columnsConfig = [
    {
        key : "name",
        width : "40%",
        title : "Category name"
    },
    {
        key : "parentName",
        width : "40%",
        title : "Parent name"
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
    const  {deleted,totalPages, loading, errors, list} = useSelector(state => state.categories);
    

     
    useEffect(() => {
        dispatch(getCategories(page.number,page.size ));
        return () => {
            // Clean author list
            dispatch(getCategoriesClear());
        }
    }, [page]);

    useEffect(() => {
        if(deleted){
            toggle();
            dispatch(getCategories(page.number,page.size ));
        }
    }, [deleted])



    const [modal, setModal] = useState(false);
    const [theIdToDelete, setIdToDelete] = useState(-1);
    const toggle = () => {
        if(modal){ 
            dispatch(deleteCategoryClear());
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
        dispatch(deleteCategory(theIdToDelete));
    }


    const Actions = ({id }) => (
        <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/categories/" + id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => remove(id)}>Delete</Button>
        </ButtonGroup>
    );
    
 
     return (<>
     <MainContainer 
                        loading={loading} 
                        list = {list.map(cat => ({...cat,parentName : cat.parent?.name || '' }))} 
                        pagesCount = {totalPages}
                        containerConfig={{
                            title :"Categories",
                            addButtonLabel : "Add new category",
                            addAction : "new", 
                            columnsConfig,
                            Actions, 
                            setPage, 
                            page }}/>
      <Modal isOpen={modal}
        toggle={toggle}
        modalTransition={{ timeout: 200 }}>
        <ModalBody>
            Voulez vous supprimer cette categorie?
        </ModalBody>
        <ModalFooter>
            <Button color="danger" onClick={executedRemove}>Supprimer</Button>
            <Button color="primary" onClick={dismiss}>Annuler</Button>
        </ModalFooter>
    </Modal>
     
     </>)
}
