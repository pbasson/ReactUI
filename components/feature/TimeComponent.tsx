// "use client";

function DateTable() {
  const date: Date = new Date();
    const className: string = "table-auto border-collapse border border-slate-500";

  return (
    <table className={className}>
      <tbody>
        <tr>
          <td>{getDateName({ input: DateHolder.date })}</td>
          <td>{date.toLocaleDateString()}</td>
        </tr>
        <tr>
          <td>{getDateName({ input: DateHolder.time })}</td>
          <td>{date.toLocaleTimeString()}</td>
        </tr>
      </tbody>
    </table>
  );
}

function getDateName({input} : { input: DateHolder }){
    const current: string = "Current ";
    
    switch(input){
        case DateHolder.time:
                return `${current} ${input}: `;
        default:
            return `${current} ${input}: `;
    }
}

enum DateHolder {
    date = "Date",
    time = "Time"
}

export const TimeComponent = {
    DateTable,
}
