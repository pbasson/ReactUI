// "use client";
import appstyle from "@/components/StyleSheets/AppStyles.module.css";

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
          <td><h4><b>{getDateName({ input: DateHolder.datetime })}</b></h4></td>
          <td><h4>{getdateTime.toLocaleDateString()} - {getdateTime.toLocaleTimeString()}</h4></td>
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
    datetime = "Datetime",
    date = "Date",
    time = "Time"
}

export const TimeComponent = {
    DateTable,
}
