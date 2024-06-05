/*
 * No Page
 * by Alex JPS
 * 2024-06-05
 *
 * Displays fallback UI when a page is not found or the user does not have access.
 */


import React from 'react';

class NoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // update state so next render shows fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // log error to an error reporting service
        console.error(error, errorInfo);
    }

    render() {
        const messages = {
            "no access": "You do not have access to the requested page.",
            "not found": "The page you are looking for could not be found.",
            "error": "An unexpected error has occurred and you have been redirected to this page."
        }
        const message = messages[this.props.reason] || messages["error"];
        return <>
            <div className={"redirect-error-banner"}>{message}</div>
            {this.props.children}
        </>;
    }
}

export default NoPage;