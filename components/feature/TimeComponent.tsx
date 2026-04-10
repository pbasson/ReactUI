// "use client";
import appstyle from "../StyleSheets/AppStyles.module.css";

import { useState, useEffect } from "react";

function DateTable() {
  const [getdateTime, setDateTime] = useState<Date>( new Date());

  useEffect( () => {
    const interval = setInterval( () => {
      setDateTime(new Date()); }, 1000 );
    
    return () => clearInterval(interval);
  }, []);

  return (
    <table className={appstyle.containerStyle}>
      <tbody>
        <tr>
          <td>{getDateName({ input: DateHolder.date })}</td>
          <td>{getdateTime.toLocaleDateString()}</td>
        </tr>
        <tr>
          <td>{getDateName({ input: DateHolder.time })}</td>
          <td>{getdateTime.toLocaleTimeString()}</td>
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
