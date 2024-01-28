import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../constants/color';
import {
  DISABLED_DAYS,
  getDaysInMonth,
  getStartAndEndDay,
} from '../core/dateWorker';

export const CalendarPickerModal = props => {

  const [selected, setSelected] = useState(
    props.selectedDate ? props.selectedDate : moment().format('YYYY-MM-DD'),
  );
  const [markedDates, setMarkedDates] = useState({});
  const [dateRange, setDateRange] = useState('');
  useEffect(() => {
    let obj = markedDates;
    obj[selected] = {
      selected: true,
      disableTouchEvent: true,
      selectedColor: Colors.red,
      selectedTextColor: 'white',
      currentDate: true,
    };
    let dateRangeInfo = getStartAndEndDay(selected);
    setDateRange(dateRangeInfo);
    // let dates = getDaysInMonth(
    //     moment(selected).month(),
    //     moment(selected).year(),
    //     selected,
    //     markedDates,
    //     DISABLED_DAYS,
    //     (setSelectedProp = date => {
    //         setSelected(date);
    //     }),
    // );
    setMarkedDates(obj);
  }, [selected]);

  useEffect(() => {
    setMarkedDays();
  }, []);

  const setMarkedDays = () => {
    let dates = getDaysInMonth(
      moment(selected).month(),
      moment(selected).year(),
      selected,
      markedDates,
      DISABLED_DAYS,
      (setSelectedProp = date => {
        setSelected(date);
      }),
    );
    let obj = Object.entries(markedDates).filter((item, index) => {
      return item.selected;
    });
    setMarkedDates(dates);
  };

  return (
    <Modal transparent={true} visible={props.visible}>
      <View
        style={{
          width: '100%',
          height: '100%',
          borderWidth: 1,
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: 'rgba(255,255,255,0.6)',
        }}>
        <View
          style={{
            backgroundColor: Colors.white,
            elevation: 5,
            marginHorizontal: '6%',
            paddingTop: '4%',
            borderRadius: 10,
          }}>
          <View
            style={{
              paddingLeft: 20,
              justifyContent: 'center',
              paddingBottom: 10,
            }}>
            <Text style={{fontWeight: '500', fontSize: 18}}>{`${moment(
              dateRange['Monday'],
            ).format('Do MMM')} - ${moment(dateRange['Sunday']).format(
              'Do MMM',
            )}`}</Text>
          </View>
          <Calendar
            onDayPress={day => {
              let obj = {...markedDates};
              if (
                obj[selected]?.currentDate &&
                !obj[day.dateString]?.disabled
              ) {
                delete obj[selected];
                setMarkedDates({...obj});
                setSelected(day.dateString);
              }
            }}
            // hideExtraDays={true}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: Colors.red,
            }}
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: Colors.grey,
              paddingBottom: 8,
            }}
            current={selected}
            firstDay={1}
            disabledDaysIndexes={[0, 6]}
            markedDates={markedDates}
            onMonthChange={date => {

              let dates = getDaysInMonth(
                date.month - 1,
                date.year,
                selected,
                markedDates,
                DISABLED_DAYS,
                (setSelectedProp = date => {
                  setSelected(date);
                }),
              );

              setMarkedDates(dates);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: '2%',
              borderBottomWidth: 1,
              borderColor: Colors.grey,
            }}>
            <View
              style={{
                width: '1%',
                height: '0.5%',
                borderRadius: 10,
                backgroundColor: 'blue',
                padding: 4,
                margin: 6,
              }}></View>
            <Text>Holiday</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.updateStateFromPickerModal(dateRange, selected);
            }}
            style={{
              backgroundColor: Colors.azure,
              borderRadius: 6,
              width: '80%',
              height: '8%',
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              paddingVertical: 8,
            }}>
            <Text style={{color: Colors.white}}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.onClose();
            }}
            style={{
              backgroundColor: Colors.white,
              borderRadius: 6,
              width: '80%',
              height: 'auto',
              marginVertical: 5,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              paddingTop: 8,
            }}>
            <Text style={{color: Colors.azure}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
