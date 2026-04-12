import { useState } from "react";
import appstyle from "../StyleSheets/AppStyles.module.css";


function InputTable()
{
    const [getRange, setRange] = useState(0);
    const [getDate, setDate] = useState( new Date());

    const handleOnChangeRange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRange(Number(event.target.value));
    };

    // const handleOnChangeDate = (event: React.ChangeEvent<HTML >) => {
    //     setDate(event.target.value);
    // };


    function getPlaceholder(input: string) : string
    {
        return (`Please enter ${input}`);
    }

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
                        <td> <input type="text" placeholder={getPlaceholder("Text")} /> </td>
                        
                    </tr>
                    <tr>
                        <td> Email: </td>
                        <td> <input type="email" placeholder={getPlaceholder("Email")} /> </td>
                    </tr>
                    <tr>
                        <td> Number: </td>
                        <td> <input type="number" placeholder={getPlaceholder("Number")} /> </td>
                    </tr>
                    <tr>
                        <td> Search: </td>
                        <td> <input type="search" placeholder="Search...." /> </td>
                    </tr>
                    <tr>
                        <td> Textarea:</td>
                        <td><textarea placeholder={getPlaceholder("TextArea")}></textarea></td>
                    </tr>
                    <tr>
                        <td> Datetime: </td>
                        <td> <input type="datetime-local" readOnly value={new Date().toLocaleDateString()}  /> </td>
                    </tr>
                    <tr>
                        <td> Date: </td>
                        <td> <input type="date" value={new Date().toLocaleDateString().split('T')[0]} /> </td>
                    </tr>
                    <tr>
                        <td> Time: </td>
                        <td> <input type="time" /> </td>
                    </tr>
                    <tr>
                        <td> Range: </td>
                        <td> <input type="range" value={getRange} min={0} max={50} step={10} onChange={handleOnChangeRange} /> </td>
                    </tr>
                    <tr>
                        <td> Hidden: </td>
                        <td> <input type="hidden" /> </td>
                    </tr>
                    <tr>
                        <td> Color: </td>
                        <td> <input type="color" /> </td>
                    </tr>
                    <tr>
                        <td> Dropdown: </td>
                        <td>
                            <select>
                                <option value={0}>Select...</option>
                                <option value={1}>Op01</option>
                                <option value={2}>Op02</option>
                                <option value={3}>Op03</option>
                                <option value={4}>Op04</option>
                                <option value={5}>Op05</option>
                            </select>
                        </td>
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
