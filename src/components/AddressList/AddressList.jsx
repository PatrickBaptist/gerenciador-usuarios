import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "../AddressList/AddressList.css";
import { fetchEndereco } from "../../services/utils";
import api from "../../services/api";

const fetchAddresses = async () => {
  const { data } = await api.get("/usuarios");
  return data;
};

const updateAddress = async (id, formData) => {
  await api.put(`/usuarios/${id}`, formData);
};

const deleteAddress = async (id) => {
  await api.delete(`/usuarios/${id}`);
};

export default function AddressList() {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const queryClient = useQueryClient();

  const { data: addresses, isLoading, isError } = useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddresses,
  });

  const updateMutation = useMutation({
    mutationFn: (updatedData) => updateAddress(updatedData.id, updatedData.formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
      alert("Atualizado com sucesso!");
    },
    onError: (err) => {
      console.error(err);
      alert("Erro ao atualizar.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
      alert("Excluído com sucesso!");
    },
    onError: (err) => {
      console.error(err);
      alert("Erro ao excluir.");
    },
  });

  const handleEdit = (id, address) => {
    setEditingId(id);
    setFormData(address);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "cep" && value.length === 8) {
      fetchEndereco(value)
        .then((newData) => {
          setFormData((prevData) => ({
            ...prevData,
            logradouro: newData.logradouro || prevData.logradouro,
            bairro: newData.bairro || prevData.bairro,
            cidade: newData.cidade || prevData.cidade,
            estado: newData.estado || prevData.estado,
          }));
        })
        .catch((err) => {
          console.error("Erro ao buscar o endereço:", err);
        });
    }
  };

  const handleUpdate = () => {
    updateMutation.mutate({ id: editingId, formData });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar os dados.</p>;

  return (
    <div className="form-list">
      {addresses.map((address) => (
        <ul className="content-list bg-white p-4 rounded-lg shadow-md space-y-2" key={address.id}>
          {editingId === address.id ? (
            <>
              <li className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Nome:</span>
                <input
                  name="nome"
                  value={formData.nome || ""}
                  onChange={handleChange}
                  className="block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </li>
              <li className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">CPF:</span>
                <input
                  name="cpf"
                  value={formData.cpf || ""}
                  onChange={handleChange}
                  className="block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </li>
              <li className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">CEP:</span>CEP:&nbsp;
                <input
                  name="cep"
                  value={formData.cep || ""}
                  onChange={handleChange}
                  className="block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </li>
              <li className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Lograd.:</span>
                <input
                  className="block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  name="logradouro"
                  value={formData.logradouro || ""}
                  readOnly
                />
              </li>
              <li className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Bairro:</span>
                <input
                  className="block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  name="bairro"
                  value={formData.bairro || ""}
                  readOnly
                />
              </li>
              <li className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Cidade:</span>
                <input
                  className="block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  name="cidade"
                  value={formData.cidade || ""}
                  readOnly
                />
              </li>
              <li className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Estado:</span>
                <input
                  className="block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  name="estado"
                  value={formData.estado || ""}
                  readOnly
                />
              </li>
              <button onClick={handleUpdate} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Salvar</button>
              <button onClick={() => setEditingId(null)} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Cancelar</button>
            </>
          ) : (
            <>
              <li className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Nome:</span>
            <span className="name text-gray-800">{address.nome}</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">CPF:</span>
            <span className="text-gray-800">{address.cpf}</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">CEP:</span>
            <span className="text-gray-800">{address.cep}</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Lograd.:</span>
            <span className="text-gray-800">{address.logradouro}</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Bairro:</span>
            <span className="text-gray-800">{address.bairro}</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Cidade:</span>
            <span className="text-gray-800">{address.cidade}</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Estado:</span>
            <span className="text-gray-800">{address.estado}</span>
          </li>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => handleEdit(address.id, address)}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Editar
            </button>
            <button
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
              onClick={() => handleDelete(address.id)}
            >
              Excluir
            </button>
          </div>
            </>
          )}
        </ul>
      ))}
    </div>
  );
}