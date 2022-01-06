 
import React, { useEffect, useState } from 'react'
import {   FlatList  } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import BookCard from '../components/BookCard';
import globalConstants from '../core/constants/globalConstants';
import { getBooks, getBooksClear } from '../core/state/actions/book.action';

export default ()=> {
  
    const dispatch = useDispatch();
    const {books, errors, loading, totalPages } = useSelector(state => state.books);
    const [pagination, setPagination] = useState({
        currentPage : 0
    })

    useEffect(() => {
        dispatch(getBooks(pagination.currentPage, globalConstants.defaultPageSize));
        return () => {
           dispatch(getBooksClear());
        }
    }, [pagination]);

   

    const renderItem = ({item})=> <BookCard book={item} />;

    return (  
            <FlatList
            data={books}
            renderItem={renderItem}
            keyExtractor={book =>book.book_id}
            /> 
    )
}

 
  
 
