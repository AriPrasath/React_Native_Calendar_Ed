import React, { useEffect, useRef, useState } from 'react';
import {Text, View, FlatList, Dimensions, StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {timeTable, weekDays} from '../data/info';
import {Colors} from '../constants/color';
import moment from 'moment';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

const {width, height} = Dimensions.get('window');

export const TimeTableCarousel = props => {

    const carouselRef = useRef(null);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        Object.keys(dates).map((key,index) => {
            if(dates[key] === props.selectedDate) {

                carouselRef.current?.scrollTo({index: index});
                return;
            }
        })
    }, [dates])

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
      }, [props.dateRange, props.selectedDate]);

    const updateDate = (index) => {
        let newDate;
        if( index - props.dateIndex >= 1) {
            newDate = moment(props.selectedDate).add(1,'days').format('YYYY-MM-DD')
        } else if(props.index==0){
            // newDate = moment(props.selectedDate).add(1,'days').format('YYYY-MM-DD')
        } else if(index - props.dateIndex < 0){
            newDate = moment(props.selectedDate).subtract(1,'days').format('YYYY-MM-DD')
        }
        if(newDate) {
            props.updateSelectedDate(newDate, index);
        }
    }

  return (
    <View style={styles.baseContainer}>
      <Carousel
        width={width * 0.91}
        height={height * 0.8}
        data={weekDays}
        loop={false}
        ref={(e) => carouselRef.current = e}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 60,
        }}
        // style={{alignSelf: 'center', alignItems: "center", justifyContent :"center",}}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        // scrollAnimationDuration={1000}
        onSnapToItem={index => {
            updateDate(index)}
        }
        renderItem={({index}) => {
          return (
            <View
              style={styles.baseCarouselView}>
              <FlatList
                data={timeTable[index][weekDays[index]]}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {

                  return (
                    <View
                      style={{...styles.flatListBaseView,backgroundColor: item.color,borderColor: item.color}}>
                      <Text
                        style={styles.flatListText}>
                        {item.title}
                      </Text>
                      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: "center"}}>
                        <EvilIcon name={"clock"} size={16} style={{ padding: 2, height: 18}}/>
                      <Text>{` ${item.startTime} - ${item.endTime}`}</Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
    baseContainer: {flex: 1},
    baseCarouselView: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: width * 0.87,
        height: height * 0.735,
      },
      flatListBaseView: {
        flexDirection: 'row',
        height: width * 0.13,
        marginVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: width * 0.7,
        flex: 0.8,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      flatListText: {
        fontWeight: '500',
        fontSize: 16,
        color: Colors.black,
      }
})