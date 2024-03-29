import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import BusinessHours from "./components/business-hours";
import days from "./days.json";
import shops from "./shops.json";
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
  const [shopName, setShopName] = useState("Codice Farmacia");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    setPwd(prompt("Enter password to access."));
  }, []);

  useEffect(() => {
    if (pwd !== "CambioNeoapotek24") setPwd(prompt("Enter password to access."));
  }, [pwd]);

  const updateDays = (dayInd, val) => {
    days[dayInd] = val;
  };

  const submitData = () => {
    if (!shopName) {
      alert("You must input shopname!");
      return;
    }
    let d = [];
    d.push(shopName);
    Object.entries(days.business).forEach(([i, { day, hours }]) => {
      const ts = [];
      hours.forEach((i) => {
        if (i.isOpen) {
          if (i["open"] && i["close"])
            ts.push(
              i["open"].slice(0, 2) +
                ":" +
                i["open"].slice(2) +
                "-" +
                i["close"].slice(0, 2) +
                ":" +
                i["close"].slice(2)
            );
        }
      });
      d.push(ts.join(", "));
    });
    let specialHours = [];

    Object.entries(days.special).forEach(([i, { day, hours }]) => {
      hours.forEach((i) => {
        if (i.isOpen) {
          if (i["open"] && i["close"])
            specialHours.push(
              day.slice(6) +
                "-" +
                day.slice(3, 5) +
                "-" +
                day.slice(0, 2) +
                ": " +
                i["open"].slice(0, 2) +
                ":" +
                i["open"].slice(2) +
                "-" +
                i["close"].slice(0, 2) +
                ":" +
                i["close"].slice(2)
            );
        } else {
          specialHours.push(
            day.slice(6) + "-" + day.slice(3, 5) + "-" + day.slice(0, 2) + ": x"
          );
        }
      });
    });
    d.push(specialHours.join(", "));

    axios
      .post(process.env.REACT_APP_BACKEND_ENDPOINT, d)
      .then(function (response) {
        console.log(response);
        setIsSubmitted(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      {pwd === "CambioNeoapotek24" ? (
        <DemoContainer>
          <h1>Modulo per l'aggiornamento degli orari</h1>
          {!isSubmitted ? (
            <>
              <label htmlFor="shop-name">CDC NEO:</label>
              <select
                id="shop-name"
                value={shopName}
                onChange={(d) => setShopName(d.target.value)}
                placeholder="Codice Farmacia"
                style={{ width: "450px" }}
              >
                {shops.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </select>
              <DemoComponent>
                <h2>Orari ordinari</h2>
                <p>
                  Inserisci gli orari ordinari della farmacia, gli orari saranno
                  considerati validi dal momento del caricamento.
                </p>
                <BusinessHours
                  timeIncrement={15}
                  updateDays={(v) => updateDays("business", v)}
                  days={days.business}
                  time-increment={15}
                  hourFormat24={true}
                ></BusinessHours>
              </DemoComponent>
              <DemoComponent>
                <h2>Aperture e chiusure straordinarie</h2>
                <p>
                  Inserire di seguito tutte le aperture o gli orari straordinari
                  della farmacia. Gli orari fanno riferimento a giorni feriali,
                  turni o cambi di orario straordinario. Selezionare il giorno e
                  indicare gli orari di apertura o la chiusura
                </p>
                <BusinessHours
                  timeIncrement={15}
                  updateDays={(v) => updateDays("special", v)}
                  datePick={true}
                  days={days.special}
                  name="holidayHours"
                  color="#00af0b"
                  hourFormat24={true}
                  time-increment={60}
                ></BusinessHours>
              </DemoComponent>
              <button onClick={submitData}>Invia i nuovi orari</button>
            </>
          ) : (
            <p>
              Grazie, i nuovi orari sono stati registrati, verranno aggiornati
              sui nostri sistemi nelle prossime ore.
            </p>
          )}
        </DemoContainer>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
