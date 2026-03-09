import Spinner from 'react-bootstrap/Spinner';

function SpinnerComponent() {
    const spinnerText: string = "Loading...";
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">{spinnerText}</span>
        </Spinner>
    );
}

export default SpinnerComponent;