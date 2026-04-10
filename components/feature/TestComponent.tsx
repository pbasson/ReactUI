function InputTable()
{
    return (
    <>
        <h1>Test_Result</h1>
        <form onSubmit={SubmitForm}>
            <table >
                <tbody>

                <tr>
                    <td> Checkbox: </td>
                    <td> <input type="checkbox" /> </td>
                </tr>
                <tr>
                    <td> Text: </td>
                    <td> <input type="text" /> </td>
                </tr>
                <tr>
                    <td> email: </td>
                    <td> <input type="email" /> </td>
                </tr>
                <tr>
                    <td> number: </td>
                    <td> <input type="number" /> </td>
                </tr>
                <tr>
                    <td> radio: </td>
                    <td> <input type="radio" /> </td>
                </tr>
                <tr>
                    <td> datetime: </td>
                    <td> <input type="datetime-local" /> </td>
                </tr>
                <tr>
                    <td> date: </td>
                    <td> <input type="date" /> </td>
                </tr>
                <tr>
                    <td> time: </td>
                    <td> <input type="time" /> </td>
                </tr>
                <tr>
                    <td> range: </td>
                    <td> <input type="range" /> </td>
                </tr>
                  <tr>
                    <td> hidden: </td>
                    <td> <input type="hidden" /> </td>
                </tr>
                <tr>
                    <td> search: </td>
                    <td> <input type="search" /> </td>
                </tr>
                <tr>
                    <td> color: </td>
                    <td> <input type="color" /> </td>
                </tr>
                <tr>
                    <td> textarea:</td>
                    <td><textarea></textarea></td>
                </tr>
                </tbody>

            </table>

            <button type="submit" > Submit </button>
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
