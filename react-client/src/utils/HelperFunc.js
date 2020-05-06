import React from 'react';

export function formatDate(date){
    let MM = date.getMonth() + 1;
    let DD = date.getDate();
    let dayOfWeek = date.getDay();
        switch (dayOfWeek) {
            case 0:
                dayOfWeek = "Sunday";
                break;
            case 1:
                dayOfWeek = "Monday";
                break;
            case 2:
                dayOfWeek = "Tuesday";
                break;
            case 3:
                dayOfWeek = "Wednesday";
                break;
            case 4:
                dayOfWeek = "Thursday";
                break;
            case 5:
                dayOfWeek = "Friday";
                break;
            case 6:
                dayOfWeek = "Saturday";
        }
    return `${dayOfWeek} ${MM}/${DD}`;
}