import moment from "moment";

export const DISABLED_DAYS = ['Saturday', 'Sunday'];

export const getDaysInMonth = (month, year, selectedDate,markedDates ,days, setSelected) => {

    let pivot = moment().month(month).year(year).startOf('month');
    
    
    const end = moment().month(month).year(year).endOf('month');
    let currentDate = selectedDate;
    
    let dates = {};
    dates[selectedDate] = markedDates[selectedDate];
    const disabled = {disabled: true};
    while (pivot.isBefore(end)) {

      days.forEach(day => {
        dateToBeDisabled = pivot.day(day).format('YYYY-MM-DD');
        dates[dateToBeDisabled] = disabled;
        if (moment(currentDate).isSame(dateToBeDisabled)) {

          if (day === DISABLED_DAYS[0])
            currentDate = moment(currentDate)
              .add(2, 'days')
              .format('YYYY-MM-DD');
          else
            currentDate = moment(currentDate)
              .add(1, 'days')
              .format('YYYY-MM-DD');
        }
      });
      pivot.add(7, 'days');
    }
    setSelected(currentDate);
    return dates;
  };


  export const getStartAndEndDay =  date => {

    let month = moment(date).month();
    let year = moment(date).year();

    let pivotNew = moment(date).month(month).year(year);
    
    let dates = {};
    
    new Array('Monday', 'Saturday').forEach(day => {
        if(day === "Saturday") {
            dates["Sunday"] = moment(pivotNew.day(day)).add(1, 'days').format();
        } else {
            dates[day] = pivotNew.day(day).format();
        }

    });
    return dates;
  };