import React, { useEffect } from 'react' 
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default  ({currentPage, setPage, pagesCount}) => {

    
    

   
    const handlePageClick = (e, index) =>{ 
        e.preventDefault();
        setPage(previous =>({
            ...previous,
            number : index
        })) 
    }
    const handlePreviousClick = (e) =>{ 
        e.preventDefault();
        setPage(previous =>({
            ...previous,
            number : previous.number -1
        })) 
    }

   

    return (<Pagination>
                <PaginationItem disabled={currentPage.number <= 0}>
                    <PaginationLink onClick={handlePreviousClick} previous href="#" />
                </PaginationItem>
                { 
                    [...Array(parseInt(pagesCount))].map((_, i) => (
                        <PaginationItem key={`paginator-${i}`}  active={i === currentPage.number} key={i}>
                            <PaginationLink onClick={e => handlePageClick(e, i)} href="#">
                                {i + 1}
                               
                            </PaginationLink>
                        </PaginationItem>
                    ))
                }
                
            </Pagination>)
}
