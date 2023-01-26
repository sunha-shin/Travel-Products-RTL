import React from 'react'

function ErrorBanner({message}) {
    let errorMessage = message || "It is an error"

    return (
        <div
            data-testid={'error-banner'}
            style={{backgroundColor: 'red', color: 'white'}}
        >
            {errorMessage}
        </div>
    )
}

export default ErrorBanner