import './App.css';
import OrderPage from "./pages/OrderPage/OrderPage.js";
import {OrderContextProvider} from "./contexts/OrderContext.js";

function App() {

    return (
        <div style={{padding: "0 4rem"}}>
            <OrderContextProvider>
                <OrderPage/>
            </OrderContextProvider>
        </div>
    );
}

export default App;
