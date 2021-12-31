import React from 'react'
import { Spinner } from 'reactstrap'

export default () => {
    return (
        <div>
            <Spinner
                color="primary"
                type="grow"
            >
                Loading...
            </Spinner>
            <Spinner
                color="secondary"
                type="grow"
            >
                Loading...
            </Spinner>
            <Spinner
                color="success"
                type="grow"
            >
                Loading...
            </Spinner>
        </div>
    )
}
