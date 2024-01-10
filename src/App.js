import React, { useState } from "react";
import styled from "@emotion/styled";
import BusinessHours from "./components/business-hours";
import days from "./days.json";
import demoDaysErrors from "./data/demoDaysErrors.json";
import demoHolidays from "./data/demoHolidays.json";
import demoDaysSpanish from "./data/demoDaysSpanish.json";
import demoSpanishLocalization from "./data/demoSpanishLocalization.json";

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

const DemoComponentWide = styled.div`
  width: 800px;
`;

function App() {
  const [shopName, setShopName] = useState("")
  const updateDays = (dayInd, val) => {
    days[dayInd] = val
    console.log(days)
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
        <button>Invia i nuovi orari</button>
      </DemoContainer>
    </div>
  );
}

export default App;
