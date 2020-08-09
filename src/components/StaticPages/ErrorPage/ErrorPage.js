import React from 'react'
import './ErrorPage.css'

/**
 * I have to check for error message or simply an error because of I've handled errors in the 
 * reducers. The RTK documentation recommends checking for a promise rejection with value or 
 * with an error; thus, when it rejects with value, there will be a status_message, and if that
 * doesn't happen, there will simply be an error object 
 */
const ErrorPage = props => {
    const { errors } = props

    let errorObjs
    if (Array.isArray(errors)) {
        errorObjs = errors[0] || errors[1] || errors[2]
    }

    const errorType = errorObjs || errors
    const errorMessage = errorType.message ? errorType.message : errorType
    return (
        <div className="ErrorPage">
            <div className="ErrorPage-Items">
                <h2>No matching tiles found.</h2>
                <h2>{errorMessage}</h2>
            </div>
        </div>
    )
}

export default ErrorPage