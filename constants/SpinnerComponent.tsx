import { PageConstants } from '@/constants/PageConstants';
import Spinner from 'react-bootstrap/Spinner';

function SpinnerComponent() {
    
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">{PageConstants.spinnerText}</span>
        </Spinner>
    );
}

export default SpinnerComponent;