import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { fetchEndereco } from "../../services/utils";
import api from "../../services/api";
import '../Form/AddressForm.css';

const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  cpf: yup
    .string()
    .matches(/^\d{11}$/, "CPF inválido")
    .required("CPF é obrigatório"),
  cep: yup.string().required("CEP é obrigatório"),
});

export default function AddressForm({ fetchAddresses }) {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      await api.post("/usuarios", data);
    },
    onSuccess: () => {
      alert("Endereço salvo com sucesso!");
      fetchAddresses();
    },
    onError: () => {
      alert("Erro ao salvar endereço.");
    },
  });

  const fetchViaCEP = async (cep) => {
    try {
      const data = await fetchEndereco(cep);
      setValue("logradouro", data.logradouro);
      setValue("bairro", data.bairro);
      setValue("cidade", data.cidade);
      setValue("estado", data.estado);
    } catch (err) {
      console.log(err.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      await mutation.mutateAsync(data);
      reset();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao realizar cadastro", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">

      <input placeholder="Nome" name="nome" {...register("nome")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
/>
      {errors.nome && <li className="error">{errors.nome.message}</li>}

      <input placeholder="CPF" name="cpf" {...register("cpf")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      {errors.cpf && <li className="error">{errors.cpf.message}</li>}

      <input
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="CEP"
        name="cep"
        {...register("cep")}
        onBlur={(e) => fetchViaCEP(e.target.value)}
      />
      {errors.cep && <li className="error">{errors.cep.message}</li>}

      <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Logradouro" name="logradouro" {...register("logradouro")} readOnly />
      <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Bairro" name="bairro" {...register("bairro")} readOnly />
      <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Cidade" name="cidade" {...register("cidade")} readOnly />
      <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Estado" name="estado" {...register("estado")} readOnly />

      <button className="bg-blue-500 text-white hover:bg-blue-600" type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}