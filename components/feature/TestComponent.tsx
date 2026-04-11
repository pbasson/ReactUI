import { useState } from "react";
import appstyle from "../StyleSheets/AppStyles.module.css";


function InputTable()
{
    const [getRange, setRange] = useState(0);
    // const [getDate, setDate] = useState( new Date());

    const handleOnChangeRange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRange(Number(event.target.value));
    };

    // const handleOnChangeDate = (event: React.ChangeEvent<HTML >) => {
    //     setDate(event.target.value);
    // };

    return (
    <>
        <h1>Test_Result</h1>
        <form className={appstyle.containerStyle} onSubmit={SubmitForm} style={{paddingLeft: "35%"}}>
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td> Radio: </td>
                        <td> <input type="radio" /> </td>
                    </tr>
                    <tr>
                        <td> Checkbox: </td>
                        <td> <input type="checkbox" /> </td>
                    </tr>
                    <tr>
                        <td> Text: </td>
                        <td> <input type="text" placeholder="Please Make Entry" /> </td>
                    </tr>
                    <tr>
                        <td> email: </td>
                        <td> <input type="email" placeholder="Please enter Email" /> </td>
                    </tr>
                    <tr>
                        <td> number: </td>
                        <td> <input type="number" placeholder="Please enter Number" /> </td>
                    </tr>
                    <tr>
                        <td> search: </td>
                        <td> <input type="search" placeholder="Search...." /> </td>
                    </tr>
                    <tr>
                        <td> textarea:</td>
                        <td><textarea placeholder="Please Text Entry"></textarea></td>
                    </tr>
                    <tr>
                        <td> datetime: </td>
                        <td> <input type="datetime-local"  /> </td>
                    </tr>
                    <tr>
                        <td> date: </td>
                        <td> <input type="date"  /> </td>
                    </tr>
                    <tr>
                        <td> time: </td>
                        <td> <input type="time" /> </td>
                    </tr>
                    <tr>
                        <td> range: </td>
                        <td> <input type="range" value={getRange} min={0} max={50} step={10} onChange={handleOnChangeRange} /> </td>
                    </tr>
                    <tr>
                        <td> hidden: </td>
                        <td> <input type="hidden" /> </td>
                    </tr>
                    <tr>
                        <td> color: </td>
                        <td> <input type="color" /> </td>
                    </tr>
                    </tbody>

                </table>

                <button type="submit" > Submit </button>
            </div>

        </form>
    </>
)
}    

function SubmitForm()
{
    return(
        alert("Form Submitted")
    );
}

export const TestComponent = { 
    InputTable,
};
