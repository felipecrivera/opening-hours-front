import PropTypes from "prop-types";
import moment from "moment";
import uniqid from "uniqid";
import styled from "@emotion/styled";
import BusinessHoursDay from "./business-hours-day";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from 'react';

const Container = styled.div`
  display: block;
  width: 100%;
  font-family: -apple-system, Helvetica, Arial, sans-serif;
  font-size: 15px;
  color: #3d4852;
`;

const BusinessHours = props => {
  const [daysObj, setDaysObj] = useState(props.days);

  const updateDays = (dateInd, val) => {
    daysObj[dateInd] = val
    setDaysObj(daysObj)
    props.updateDays(daysObj)
  }
  const addDay = () => {
    const newId = uniqid()
    const d = Object.assign({}, daysObj)

    d[newId] = {
      "day": moment().format("DD-MM-YYYY"),
      "hours": [
        {
          "open": "",
          "close": "",
          "id": uniqid(),
          "isOpen": true
        }
      ]
    }
    setDaysObj(d)
    props.updateDays(daysObj)
  }

  return (
    <Container>
      {Object.entries(daysObj).map(([dayID, { day, hours }]) => (
        <BusinessHoursDay
          uID={dayID}
          datePick={props.datePick ?? false}
          key={dayID}
          day={day}
          hours={hours}
          name={props.name}
          timeIncrement={props.timeIncrement}
          type={props.type}
          color={props.color}
          switchWidth={props.switchWidth}
          hourFormat24={props.hourFormat24}
          localization={props.localization}
          hoursChange={updateDays}
        />
      ))}
      {
        props.datePick &&
        <button onClick={addDay}>Aggiungi un giorno</button>
      }
    </Container>
  );
};

BusinessHours.propTypes = {
  datePick: PropTypes.bool,
  days: PropTypes.object.isRequired,
  name: PropTypes.string,
  timeIncrement: PropTypes.oneOf([15, 30, 60]),
  type: PropTypes.oneOf(["datalist", "select"]),
  color: PropTypes.string,
  switchWidth: PropTypes.number,
  hourFormat24: PropTypes.bool,
  localization: PropTypes.object,
  updatedValues: PropTypes.func
};

BusinessHours.defaultProps = {
  datePick: false,
  name: "businessHours",
  timeIncrement: 30,
  type: "datalist",
  color: "#2779bd",
  switchWidth: 90,
  hourFormat24: false,
  localization: {
    switchOpen: "Aperto",
    switchClosed: "Chiuso",
    placeholderOpens: "Aperto",
    placeholderCloses: "Chiuso",
    addHours: "Aggiungi orario",
    open: {
      invalidInput:
        'Inserisci un orario di apertura nel formato 24 ore (es. 17:00)',
      greaterThanNext:
        "Inserisca un orario di apertura precedente all'orario di chiusura.",
      lessThanPrevious:
        "Inserisca un orario di apertura successivo all'orario di chiusura precedente.",
      midnightNotLast:
        "La mezzanotte può essere selezionata solo per l'ultima ora di chiusura della giornata."
    },
    close: {
      invalidInput:
        'Inserisca un orario di chiusura nel formato 24 ore (es. 17:00). Puoi anche inserire "24 ore" o "Mezzanotte".',
      greaterThanNext:
        "Inserisca un orario di chiusura successivo all'orario di aperture.",
      lessThanPrevious:
        "Inserisca un orario di chiusura antecedente al prossimo orario di apertura.",
      midnightNotLast:
        "La mezzanotte può essere selezionata solo per l'ultima ora di chiusura della giornata."
    },
    t24hours: "24 ore",
    midnight: "Mezzanotte",
    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      newYearsEve: 'New Year\'s Eve', // prettier-ignore
      newYearsDay: 'New Year\'s Day', // prettier-ignore
      martinLutherKingJrDay: "Martin Luther King, Jr. Day",
      presidentsDay: 'Presidents\' Day', // prettier-ignore
      easter: "Easter",
      memorialDay: "Memorial Day",
      independenceDay: "Independence Day",
      fourthOfJuly: "4th of July",
      laborDay: "Labor Day",
      columbusDay: "Columbus Day",
      veteransDay: "Veterans Day",
      thanksgivingDay: "Thanksgiving Day",
      christmasEve: "Christmas Eve",
      christmas: "Christmas"
    }
  },
  updatedValues: val => {
    return val;
  }
};

export default BusinessHours;
