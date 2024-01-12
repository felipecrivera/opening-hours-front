import React, { useState } from "react";
import styled from "@emotion/styled";
import BusinessHours from "./components/business-hours";
import days from "./days.json";
import axios from "axios";

const DemoContainer = styled.div`
  margin: 50px auto;
  width: 800px;
  font-family: -apple-system, Helvetica, Arial, sans-serif;
  color: #3d4852;
`;

const DemoComponent = styled.div`
  width: 660px;
  margin-bottom: 50px;
`;

function App() {
  const [shopName, setShopName] = useState("Shop Name")
  const updateDays = (dayInd, val) => {
    days[dayInd] = val
  }

  const submitData = () => {
    if (!shopName) {
      alert("You must input shopname!");
      return;
    }
    let d = [];
    d.push(shopName);
    Object.entries(days.business).forEach(([i, { day, hours }]) => {
      const ts = []
      hours.forEach((i) => {
        if (i.isOpen) {
          if ((i['open'] && i['close']))
            ts.push(i['open'].slice(0, 2) + ":" + i['open'].slice(2) + "-" + i['close'].slice(0, 2) + ":" + i["close"].slice(2));
        }
        else
          ts.push("X")
      });
      d.push(ts.join(', '));
    })
    let specialHours = [];

    Object.entries(days.special).forEach(([i, { day, hours }]) => {
      const tm = hours.forEach((i) => {
        if (i.isOpen) {
          if ((i['open'] && i['close']))
            specialHours.push(day.slice(6) + "-" + day.slice(3, 5) + "-" + day.slice(0, 2) + ": " + i['open'].slice(0, 2) + ":" + i['open'].slice(2) + "-" + i['close'].slice(0, 2) + ":" + i["close"].slice(2));
        }
        else {
          specialHours.push(day.slice(6) + "-" + day.slice(3, 5) + "-" + day.slice(0, 2) + ": x")
        }
      });
    })
    d.push(specialHours.join(', '));
    axios.post(process.env.REACT_APP_BACKEND_ENDPOINT, d)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className='App'>
      <DemoContainer>
        <h1>Modulo per l'aggiornamento degli orari</h1>
        <label htmlFor="shop-name">CDC NEO:</label> <input id="shop-name" value={shopName} onChange={(d) => setShopName(d.target.value)} placeholder="Codice Farmacia" />
        <DemoComponent>
          <h2>Orari ordinari</h2>
          <p>Inserisci gli orari ordinari della farmacia, gli orari saranno considerati validi dal momento del caricamento.</p>
          <BusinessHours timeIncrement={15} updateDays={(v) => updateDays('business', v)} days={days.business} time-increment={15} hourFormat24={true}></BusinessHours>
        </DemoComponent>
        <DemoComponent>
          <h2>Aperture e chiusure straordinarie</h2>
          <p>Inserire di seguito tutte le aperture o gli orari straordinari della farmacia. Gli orari fanno riferimento a giorni feriali, turni o cambi di orario straordinario. Selezionare il giorno e indicare gli orari di apertura o la chiusura</p>
          <BusinessHours
            timeIncrement={15}
            updateDays={(v) => updateDays('special', v)}
            datePick={true}
            days={days.special}
            name='holidayHours'
            color='#00af0b'
            hourFormat24={true}
            time-increment={60}
          ></BusinessHours>
        </DemoComponent>
        <button onClick={submitData}>Invia i nuovi orari</button>
      </DemoContainer>
    </div>
  );
}

export default App;
