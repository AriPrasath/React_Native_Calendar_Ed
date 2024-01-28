/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { WeakSelector } from './src/components/weakSelector';
import { CalendarPickerModal } from './src/components/calendarPickerModal';
import moment from 'moment';
import { DISABLED_DAYS, getDaysInMonth, getStartAndEndDay } from './src/core/dateWorker';
import { DaySelectorComponent } from './src/components/daySelectorComponent';
import { TimeTableCarousel } from './src/components/timeTableCarosuel';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<{ string: string }>();
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [dateIndex, setDateIndex] = useState(0);

  useEffect(() => {
    let date = moment(selectedDate);
    getDaysInMonth(
      moment(selectedDate).month(),
      moment(selectedDate).year(),
      selectedDate,
      {},
      DISABLED_DAYS,
      setSelectedProp = (date) => {
        setSelectedDate(date)
      }

    );

  }, []);

  useEffect(() => {
    let date = getStartAndEndDay(selectedDate) as { string: string };

    setDateRange(date);
  }, [selectedDate])

  const updateStateFromPickerModal = (dateRange: { string: string }, selectedValue: string) => {
    setDateRange(dateRange);
    setSelectedDate(selectedValue);
    onClose()
  }

  const onClose = () => {
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.baseContainer}>
      <View style={{ flex: 1 }}>
        <View style={styles.weekSelectorView}>
          <WeakSelector selectDateModal={() => { setModalVisible(true) }} dateRange={dateRange} selectedDate={selectedDate} updateSelectedDate={(date, index) => { setSelectedDate(date), setDateIndex(index) }} moveToNextWeek={() => { setSelectedDate(moment(selectedDate).add(7, 'days').format("YYYY-MM-DD")) }} moveToPreviousWeek={() => { setSelectedDate(moment(selectedDate).subtract(7, 'days').format("YYYY-MM-DD")) }} />
        </View>
        <View style={styles.daySelectorView}>
          <DaySelectorComponent dateRange={dateRange} selectedDate={selectedDate} updateSelectedDate={(date, index) => { setSelectedDate(date), setDateIndex(index) }} />
        </View>
        <View style={styles.timeTableView}>
          <TimeTableCarousel selectedDate={selectedDate} dateRange={dateRange} dateIndex={dateIndex} updateSelectedDate={(date, index) => {
            setSelectedDate(date), setDateIndex(index)
          }} />
        </View>
      </View>
      {modalVisible ? 
        <CalendarPickerModal 
          visible={modalVisible} 
          selectedDate={selectedDate} 
          updateStateFromPickerModal={({dateRange}, selectedDate) =>  {
            updateStateFromPickerModal(dateRange, selectedDate)}
          } 
          onClose={onClose} 
        /> 
      : null
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 10,
    // borderWidth: 1,
  },
  weekSelectorView: {
    flex: 1,
    // borderWidth: 1,
  },
  daySelectorView: {
    flex: 1.5,
    // borderWidth: 1,
  },
  timeTableView: {
    flex: 10,
    // borderWidth: 1,
  }

});

export default App;
