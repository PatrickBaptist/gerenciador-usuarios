import React, { useState } from "react";
import AddressForm from "./components/Form/AddressForm";
import AddressList from "./components/AddressList/AddressList";
import "./App.css";

function App() {
  const [updateList, setUpdateList] = useState(false);

  const refreshList = () => {
    setUpdateList(!updateList);
  };

  return (
    <div className="App bg-gray-100 min-h-screen">
      <header>
        <h1 className="text-center text-3xl font-bold">Gerenciador de Endereços</h1>
      </header>
      
      <main>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Adicionar Endereço</h2>
          <AddressForm fetchAddresses={refreshList} />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Endereços</h2>
          <AddressList updateList={updateList} />
        </section>
      </main>
    </div>
  );
}

export default App;