
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {week} from '../data/info';
import moment from 'moment';
import {Colors} from '../constants/color';

export const DaySelectorComponent = props => {

  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (props.dateRange) {
      let i = 0;
      let dates = [];
      let currentDate = moment(props?.dateRange['Monday']);

      while (i < 5) {
        dates.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'days');
        i++;
      }
      setDates([...dates]);
    }
  }, [props.dateRange]);

  return (
    <View style={styles.baseView}>
      {Object.keys(week).map((item, index) => {
        return (
          <TouchableOpacity key={index}
            onPress={() => {
               props.updateSelectedDate(dates[index], index)
            }}
            style={{
              width: '12%',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              margin: 15,
              borderRadius: 32,
              backgroundColor: moment(props.selectedDate).isSame(dates[index])
                ? Colors.electricBlue
                : Colors.grey,
            }}>
            <View style={{justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: moment(props.selectedDate).isSame(dates[index]) ? Colors.white : Colors. black}}>{week[item]}</Text>
            </View>
            <View
              style={{
                height: 24,
                width: 24,
                borderRadius: 22,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: moment(props.selectedDate).isSame(dates[index]) ? Colors.white : Colors.grey
              }}>
              <Text style={{color: moment(props.selectedDate).isSame(dates[index]) ? Colors.electricBlue : Colors.black}}>{moment(dates[index]).format('DD')}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  baseView: {
    flexDirection: 'row',
    flex: 1,
  },
});
