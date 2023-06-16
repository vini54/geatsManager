import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Pressable,
  Input,
  Icon,
  ScrollView,
  FlatList,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ListItem } from "./Item";
import { EmptyItem } from "./Empty";
import { DeletePerson, GetPeopleList } from "../../Database";
import { RefreshControl } from "react-native";

export const ListRegisters = ({ navigation }) => {
  const [filter, setFilter] = useState("all");
  const [peopleList, setPeopleList] = useState([]);
  const [isFetchingDelete, setIsFetchingDelete] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  const getFilterData = () => {
    return filter !== "all"
      ? peopleList.filter((item) => item.type == filter)
      : peopleList;
  };

  const FetchData = async () => {
    const data = await GetPeopleList();

    if (data) {
      setPeopleList(data);
    }
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);

    FetchData();
  };

  const handleDeletePerson = async (id) => {
    setIsFetchingDelete(true);

    await DeletePerson(id).then(() => {
      FetchData();
    });

    setIsFetchingDelete(false);
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <Box height="100%" bg="#9A0007">
      <Box
        w="100%"
        display="flex"
        p="4"
        flexDirection="row"
        alignItems="center"
      >
        <Button
          onPress={() => navigation.goBack()}
          variant="ghost"
          p="3"
          rounded="md"
          zIndex={2}
        >
          <AntDesign name="arrowleft" size={24} color="#F8F8F8" />
        </Button>

        <Text
          fontSize="2xl"
          fontWeight="semibold"
          color="#f8f8f8"
          alignSelf="center"
          position="absolute"
          left="4"
          w="100%"
          textAlign="center"
        >
          Registros
        </Text>
      </Box>

      <HStack
        space={2}
        w="100%"
        mb="4"
        px="4"
        display="flex"
        flexDirection="row"
      >
        <Button
          variant="solid"
          rounded="full"
          _pressed={{ bg: "#4B4C52" }}
          bg="#32333E"
          py="1"
          pb="1.5"
          px="3"
          onPress={() => setFilter("all")}
        >
          <HStack
            space={1}
            display="flex"
            alignItems="center"
            flexDirection="row"
          >
            <Text fontSize="sm" color="#ADB5BD">
              Todos
            </Text>
            {filter === "all" && (
              <Entypo name="check" size={16} color="#ADB5BD" />
            )}
          </HStack>
        </Button>

        <Button
          variant="solid"
          rounded="full"
          _pressed={{ bg: "#4B4C52" }}
          bg="#32333E"
          py="1"
          pb="1.5"
          px="3"
          onPress={() => setFilter("pf")}
        >
          <HStack
            space={1}
            display="flex"
            alignItems="center"
            flexDirection="row"
          >
            <Text fontSize="sm" color="#ADB5BD">
              Pessoa física
            </Text>
            {filter === "pf" && (
              <Entypo name="check" size={16} color="#ADB5BD" />
            )}
          </HStack>
        </Button>

        <Button
          variant="solid"
          rounded="full"
          _pressed={{ bg: "#4B4C52" }}
          bg="#32333E"
          py="1"
          pb="1.5"
          px="3"
          onPress={() => setFilter("pj")}
        >
          <HStack
            space={1}
            display="flex"
            alignItems="center"
            flexDirection="row"
          >
            <Text fontSize="sm" color="#ADB5BD">
              Pessoa jurídica
            </Text>
            {filter === "pj" && (
              <Entypo name="check" size={16} color="#ADB5BD" />
            )}
          </HStack>
        </Button>
      </HStack>

      <Box height="100%" bg="#17181C" roundedTop="3xl" p="4" pt="8">
        <Input
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          w="100%"
          size="md"
          color="#f8f8f8"
          placeholder="Pesquisar"
          variant="filled"
          bg="rgba(173, 181, 189, 0.1)"
          py="2"
          borderWidth={0}
          InputLeftElement={
            <Icon
              size={6}
              ml="3"
              as={<Ionicons name="search-sharp" size={20} color="#ADB5BD" />}
            />
          }
        />

        <FlatList
          mt="6"
          height="100%"
          display="flex"
          data={
            searchText.length > 0
              ? getFilterData().filter((item) =>
                  item.values.name.includes(searchText)
                )
              : getFilterData()
          }
          renderItem={({ item }) => {
            return (
              <ListItem
                key={item.id}
                name={item.values.name}
                date={item.date}
                type={item.type}
                handleClearItem={handleDeletePerson}
                isFetching={isFetchingDelete}
                id={item.id}
              />
            );
          }}
          ListEmptyComponent={() => {
            return <EmptyItem />;
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        ></FlatList>
      </Box>
    </Box>
  );
};
