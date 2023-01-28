import './App.css';
import OrderPage from "./pages/OrderPage/OrderPage.js";
import {OrderContextProvider} from "./contexts/OrderContext.js";
import {useState} from "react";
import SummaryPage from "./pages/SummaryPage/SummaryPage.js";
import CompletePage from "./pages/CompletePage/CompletePage.js";

function App() {

    const [step, setStep] = useState(0);

    return (
        <div style={{padding: "0 4rem"}}>
            <OrderContextProvider>
                {step === 0 && <OrderPage setStep={setStep}/> }
                {step === 1 && <SummaryPage setStep={setStep}/> }
                {step === 2 && <CompletePage setStep={setStep}/> }
            </OrderContextProvider>
        </div>
    );
}

export default App;
