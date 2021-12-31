import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { config } from '../../constants/global.constants';
import { deleteBook, deleteBookClear, getBooks, getBooksClear } from '../../core/store/actions/books.action'; 
import LoadingComponent from '../Loading.component'; 
import MainContainer from '../Main.container';

const columnsConfig = [
    {
        key : "title",
        width : "20%",
        title : "Title"
    },
    {
        key : "total_pages",
        width : "10%",
        title : "Total pages"
    },
    {
        key : "published_date",
        width : "10%",
        title : "Published date"
    },
    {
        key : "author_name",
        width : "20%",
        title : "Author name"
    },
    {
        key : "photo_id",
        width : "30%",
        title : "Photo ID"
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
    const  {deleted,totalPages, loading, errors, list}  = useSelector(state => state.books);
  
  

     
    useEffect(() => {
        dispatch(getBooks(page.number,page.size ));
        return () => {
            // Clean author list
            dispatch(getBooksClear());
        }
    }, [page]);

    useEffect(() => {
        if(deleted){
            toggle();
            dispatch(getBooks(page.number,page.size ));
        }
    }, [deleted])



    const [modal, setModal] = useState(false);
    const [theIdToDelete, setIdToDelete] = useState(-1);
    const toggle = () => {
        if(modal){ 
            dispatch(deleteBookClear());
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
        dispatch(deleteBook(theIdToDelete));
    }


    const Actions = ({id }) => (
        <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/books/" + id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => remove(id)}>Delete</Button>
        </ButtonGroup>
    );
    
 
     return (<>
     <MainContainer 
                        loading={loading} 
                        list = {list.map(book =>({
                            ...book,
                            id : book.book_id,
                            photo_id : book.photo.photo_id,
                            author_name : book.author.first_name +  " " + book.author.last_name
                        }))} 
                        pagesCount = {totalPages}
                        containerConfig={{
                            title :"Books",
                            addButtonLabel : "Add new book",
                            addAction : "new", 
                            columnsConfig,
                            Actions, 
                            setPage, 
                            page }}/>
      <Modal isOpen={modal}
        toggle={toggle}
        modalTransition={{ timeout: 200 }}>
        <ModalBody>
            Voulez vous supprimer ce Livre?
        </ModalBody>
        <ModalFooter>
            <Button color="danger" onClick={executedRemove}>Supprimer</Button>
            <Button color="primary" onClick={dismiss}>Annuler</Button>
        </ModalFooter>
    </Modal>
     
     </>)
}
