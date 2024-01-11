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
    console.log(days)
  }

  const submitData = () => {
    let d = [];
    d.push(shopName);
    Object.entries(days.business).map(([i, { day, hours }]) => {
      const tm = hours.map((i) => {
        return (i['open'] && i['close']) ? i['open'] + ":" + i['close'] : "";
      });
      d.push(tm.join(';'));
    })
    let specialHours = [];
    Object.entries(days.special).map(([i, { day, hours }]) => {
      const tm = hours.map((i) => {
        return (i['open'] && i['close']) ? i['open'] + ":" + i['close'] : "";
      });
      specialHours.push(day + ":" + tm);
    })
    d.push(specialHours.join(';'));
    axios.post('http://localhost:3001', d)
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
        <label htmlFor="shop-name">CDC NEO:</label> <input id="shop-name" value={shopName} onChange={(d) => setShopName(d.val)} placeholder="Inserisci il tuo codice farmacia" />
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
