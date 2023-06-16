import { VStack, useToast } from "native-base";
import { StepsLayout } from "../../Components/StepsLayout.jsx";
import { FormInput } from "../../Components/InputItem";
import { useEffect, useState } from "react";
import { FileItem } from "../../Components/FileItem";
import { CreatePeople } from "../../Database";

export const FormPf = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    cpf: "",
    address: "",
    tel: "",
    nascDate: "",
    isValidate: false,
    invalidFields: [],
  });
  const [isFetching, setIsFetching] = useState(false);
  const toast = useToast();

  const showError = () => {
    toast.show({ description: "Preencha os campos corretamente" });
  };

  const handleContinue = async () => {
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

      if (userData.cpf.length < 14) {
        invalidFields.push("cpf");

        setUserData({
          ...userData,
          invalidFields: invalidFields,
        });
      }

      if (userData.address.length < 4) {
        invalidFields.push("address");

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

      if (userData.nascDate.length < 10) {
        invalidFields.push("nascDate");

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
        cpf: userData.cpf,
        address: userData.address,
        tel: userData.tel,
        nascDate: userData.nascDate,
      };

      CreatePeople(newPeople, "pf")
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
      type="pf"
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
  const maskCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
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

    if (entry === "cpf") {
      newValue = maskCPF(newValue);
    }

    if (entry === "tel") {
      newValue = maskPhone(newValue);
    }

    if (entry === "nascDate") {
      newValue = maskDate(newValue);
    }

    oldData[entry] = newValue;
    setUserData({ ...oldData });
  };

  return (
    <VStack w="100%" py="4" space={2}>
      <FormInput
        label="Nome completo"
        placeholder="Nome"
        value={userData.name}
        type="name"
        handleChangeValue={handleChangeValue}
        isInvalid={userData.invalidFields.includes("name")}
      />
      <FormInput
        label="CPF"
        placeholder="Número do CPF"
        value={userData.cpf}
        type="cpf"
        handleChangeValue={handleChangeValue}
        keyboardType="number-pad"
        maxLength={14}
        isInvalid={userData.invalidFields.includes("cpf")}
      />

      <FormInput
        label="Endereço residencial"
        placeholder="Endereço"
        value={userData.address}
        type="address"
        handleChangeValue={handleChangeValue}
        isInvalid={userData.invalidFields.includes("address")}
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

      <FormInput
        label="Data de nascimento"
        placeholder="DD/MM/AAAA"
        value={userData.nascDate}
        type="nascDate"
        handleChangeValue={handleChangeValue}
        keyboardType="numeric"
        maxLength={10}
        isInvalid={userData.invalidFields.includes("nascDate")}
      />
    </VStack>
  );
};

const Docs = () => {
  return (
    <VStack my="12" w="full" alignItems="center" space={6}>
      <FileItem name="Carteira de Identidade" />
    </VStack>
  );
};
