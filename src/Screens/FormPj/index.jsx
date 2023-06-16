import { VStack, useToast } from "native-base";
import { StepsLayout } from "../../Components/StepsLayout.jsx";
import { FormInput } from "../../Components/InputItem";
import { useState } from "react";
import { FileItem } from "../../Components/FileItem";
import { CreatePeople } from "../../Database/index.js";

export const FormPj = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    cnpj: "",
    muni: "",
    nameRep: "",
    tel: "",
    fundDate: "",
    isValidate: false,
    invalidFields: [],
  });

  const [isFetching, setIsFetching] = useState(false);
  const toast = useToast();

  const showError = () => {
    toast.show({ description: "Preencha os campos corretamente" });
  };

  const handleContinue = () => {
    if (step === 1) {
      setUserData({ ...userData, isValidate: true });
      let invalidFields = [];

      if (userData.name.length <= 3) {
        invalidFields.push("name");

        setUserData({
          ...userData,
          invalidFields: invalidFields,
        });
      }

      if (userData.cnpj.length < 18) {
        invalidFields.push("cpf");

        setUserData({
          ...userData,
          invalidFields: invalidFields,
        });
      }

      if (userData.nameRep.length < 4) {
        invalidFields.push("nameRep");

        setUserData({
          ...userData,
          invalidFields: invalidFields,
        });
      }

      if (userData.tel.length < 15) {
        invalidFields.push("tel");

        setUserData({
          ...userData,
          invalidFields: invalidFields,
        });
      }

      if (userData.fundDate.length < 10) {
        invalidFields.push("fundDate");

        setUserData({
          ...userData,
          invalidFields: invalidFields,
        });
      }

      if (invalidFields.length > 0) {
        showError();
      } else {
        setStep(2);
      }
    }

    if (step === 2) {
      setIsFetching(true);

      const newPeople = {
        name: userData.name,
        cnpj: userData.cnpj,
        address: userData.address,
        nameRep: userData.nameRep,
        tel: userData.tel,
        fundDate: userData.fundDate,
      };

      CreatePeople(newPeople, "pj")
        .then(() => {
          setStep(3);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  };

  return (
    <StepsLayout
      type="pj"
      step={step}
      handleContinue={handleContinue}
      navigation={navigation}
      isFetching={isFetching}
    >
      {step === 1 && <Form userData={userData} setUserData={setUserData} />}

      {step === 2 && <Docs />}
    </StepsLayout>
  );
};

const Form = ({ userData, setUserData }) => {
  const maskCnpj = (value) => {
    return value
      .replace(/\D+/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const maskPhone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})(\d)/, "$1-$2");
  };

  const maskDate = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1");
  };

  const handleChangeValue = (newValue, entry) => {
    const oldData = userData;
    const invalidEntry = oldData.invalidFields.indexOf(entry);

    if (invalidEntry > -1) {
      oldData.invalidFields.splice(invalidEntry, 1);
    }

    if (entry === "cnpj") {
      newValue = maskCnpj(newValue);
    }

    if (entry === "tel") {
      newValue = maskPhone(newValue);
    }

    if (entry === "fundDate") {
      newValue = maskDate(newValue);
    }
    oldData[entry] = newValue;
    setUserData({ ...oldData });
  };

  return (
    <VStack w="100%" py="4" space={2}>
      <FormInput
        label="Razão Social"
        placeholder="Nome"
        value={userData.name}
        type="name"
        handleChangeValue={handleChangeValue}
        isInvalid={userData.invalidFields.includes("name")}
      />

      <FormInput
        label="Representante legal"
        placeholder="Nome completo"
        value={userData.nameRep}
        type="nameRep"
        handleChangeValue={handleChangeValue}
        isInvalid={userData.invalidFields.includes("nameRep")}
      />

      <FormInput
        label="CNPJ"
        placeholder="Número do CNPJ"
        value={userData.cnpj}
        type="cnpj"
        handleChangeValue={handleChangeValue}
        keyboardType="number-pad"
        maxLength={18}
        isInvalid={userData.invalidFields.includes("cnpj")}
      />

      <FormInput
        label="Inscrição municipal"
        placeholder="Número da inscrição municipal"
        value={userData.muni}
        type="muni"
        handleChangeValue={handleChangeValue}
        isInvalid={userData.invalidFields.includes("muni")}
      />
      <FormInput
        label="Data de fundação"
        placeholder="DD/MM/AAAA"
        value={userData.fundDate}
        type="fundDate"
        keyboardType="numeric"
        maxLength={10}
        handleChangeValue={handleChangeValue}
        isInvalid={userData.invalidFields.includes("fundDate")}
      />

      <FormInput
        label="Telefone para contato"
        placeholder="Número de telefone/celular"
        value={userData.tel}
        type="tel"
        maxLength={15}
        keyboardType="numeric"
        handleChangeValue={handleChangeValue}
        isInvalid={userData.invalidFields.includes("tel")}
      />
    </VStack>
  );
};

const Docs = () => {
  return (
    <VStack my="12" w="full" alignItems="center" space={6}>
      <FileItem name="Contrato Social ou Estatuto" />

      <FileItem name="Alvará de funcionamento" />
    </VStack>
  );
};
