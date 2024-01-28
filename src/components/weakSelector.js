import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../constants/color';

export const WeakSelector = (props) => {
    const {selectDateModal, dateRange={}} = props;
    return (
        <View style={styles.baseView}>
            <TouchableOpacity onPress={() => {props.moveToPreviousWeek()}} style={styles.iconView}>
                <Entypo name="chevron-small-left" size={40}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {selectDateModal()}} style={styles.calendarView}>
            <Text style={styles.calendarText}>{`${moment(dateRange['Monday']).format('Do MMM')} - ${moment(dateRange['Sunday']).format('Do MMM')}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.moveToNextWeek()}} style={styles.iconView}>
                <Entypo name="chevron-small-right" size={40}/>
            </TouchableOpacity>
        </View>
    )
}

export const styles=StyleSheet.create({
    baseView: { 
        flexDirection: "row",
        flex:1,
        borderWidth:1,
        borderColor: Colors.grey,
        borderRadius: 10
    },
    iconView: {
        flex:1,
        // borderWidth:1,
        width: "100%",
        height: "100%",
        justifyContent:"center",
        alignItems: "center"
    },
    calendarView: {
        flex: 6,
        borderRightWidth:1,
        borderColor: Colors.grey,
        borderLeftWidth:1,
        justifyContent: "center",
        alignItems: 'center'
    },
    calendarText: {
        color: Colors.black,
        fontSize : 16,
        fontWeight: '800'
    }
});