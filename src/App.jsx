import React, { useState } from 'react'; // 🛠️ You were missing useState import
import './App.css';
import InputBox from './components/InputBox';
import useCurrencyInfo from './hooks/useCurrencyinfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = currencyInfo && typeof currencyInfo === 'object' ? Object.keys(currencyInfo) : [];

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    } else {
      setConvertedAmount(0);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/bg.jpg')" }}
    >
      <nav className="w-full backdrop-blur-sm h-20 flex items-center ">
        <span className="text-white text-4xl sm:text-5xl md:text-6xl font-extralight ml-4 sm:ml-8 md:ml-12">
          CurrencySync
        </span>
        <div className="dollar">
          <img
            src="/assets/dollar1.png"
            alt="Dollar"
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 ml-2 mr-4 sm:mr-8 md:mr-12"
          />
        </div>
      </nav>

      <main>
        <div className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10">
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 backdrop-blur-xl transition duration-500 hover:scale-105 bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-3">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>

              <div className="relative w-full h-0.5 mb-3">
                <button
                  type="button"
                  onClick={swap}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 hover:bg-green-500 transition duration-700 text-white px-3 py-1 text-sm sm:text-base"
                >
                  Swap
                </button>
              </div>

              <div className="w-full mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div> 

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-green-500 transition duration-700 text-white px-4 py-3 rounded-lg text-sm sm:text-base"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;
