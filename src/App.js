import React from "react";
import styled from "@emotion/styled";
import BusinessHours from "./components/business-hours";
import demoDays from "./data/demoDays.json";
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
  const printLogs = (val) => {
    console.log(val)
  }
  return (
    <div className='App'>
      <DemoContainer>
        <h1>Special opening Hours</h1>
        <DemoComponent>
          <h2>Business Hours</h2>
          <BusinessHours days={demoDays} time-increment={15} hour-format24={true}></BusinessHours>
        </DemoComponent>
        <DemoComponent>
          <h2>Holiday Hours</h2>
          <BusinessHours
            datePick={true}
            days={demoHolidays}
            name='holidayHours'
            color='#00af0b'
            time-increment={60}
            hour-format24={true}
            updatedValues={printLogs}
          ></BusinessHours>
        </DemoComponent>
      </DemoContainer>
    </div>
  );
}

export default App;
