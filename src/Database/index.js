import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export function getCurrentDate() {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}/${month < 10 ? `0${month}` : `${month}`}/${year}`;
}

export const GetPeopleList = async () => {
  try {
    const data = await AsyncStorage.getItem("@people:list");

    return data != null ? JSON.parse(data) : null;
  } catch {
    console.log("erro");
    return;
  }
};

export const GetPeopleListByType = async (type) => {
  const TotalPeopleList = await GetPeopleList();

  if (TotalPeopleList) {
    return TotalPeopleList.filter((item) => {
      return item.type == type;
    });
  } else {
    return null;
  }
};

export const CreatePeople = async (values, type) => {
  const PeopleList = await GetPeopleList();

  const newId = uuid.v4();
  const newValue = {
    type,
    id: newId,
    values,
    date: getCurrentDate(),
  };

  if (PeopleList != null) {
    await AsyncStorage.setItem(
      "@people:list",
      JSON.stringify([...PeopleList, newValue])
    );
  } else {
    await AsyncStorage.setItem("@people:list", JSON.stringify([newValue]));
  }
};

export const DeletePerson = async (id) => {
  const PeopleList = await GetPeopleList();

  const NewPeopleList = PeopleList.filter((item) => {
    return item.id != id;
  });

  await AsyncStorage.setItem("@people:list", JSON.stringify(NewPeopleList));
};

export const ClearPeopleList = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};
