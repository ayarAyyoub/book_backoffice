import React, { useState } from 'react';
import { Table } from 'reactstrap';

export const ListComponent = ({columns = [],  data = [], Actions }) =>
    (<Table>
        <thead>
            <tr>
                {
                    columns.map(column => <th key={`list-column-${column.key}`} width={column.width}>{ column.title }</th>)
                }
            </tr>
        </thead>
        <tbody>
            {
                data.map(element => (
                    <tr key={element.id}>
                        {
                            columns.filter(col => col.key !== "$$column_actions")
                            .map(column =>(
                                <td key={`list-data${column.key}-${element.id}`} style={{whiteSpace: 'nowrap'}}>{element[column.key]}</td>
                            ))
                        }
                        <td>
                            <Actions id = {element.id}/>
                        </td>
                    </tr>
                ))
            }
        </tbody>
        
    </Table>)