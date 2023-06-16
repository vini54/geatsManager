import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Pressable,
  Skeleton,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useToast } from "native-base";
import { GetPeopleList, GetPeopleListByType } from "../../Database";
import { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView } from "react-native";

export const Dashboard = ({ navigation }) => {
  const toast = useToast();
  const [isFetching, setIsFetching] = useState(true);
  const [listResult, setListResult] = useState({
    total: 0,
    pf: 0,
    pj: 0,
  });

  const [refreshing, setRefreshing] = useState(false);

  const FetchData = async () => {
    setIsFetching(true);

    const data = await GetPeopleList();
    console.log(data);

    if (data) {
      setListResult({
        total: data.length,
        pf: [...data].filter((item) => {
          return item.type == "pf";
        }).length,
        pj: [...data].filter((item) => {
          return item.type == "pj";
        }).length,
      });
    } else {
      setListResult({ total: 0, pj: 0, pf: 0 });
    }

    setIsFetching(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);

    FetchData();
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#17181C" }}>
      <ScrollView
        style={{ height: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Box height="100%" bg="#17181C" p="4">
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Button
              onPress={() => toast.show({ description: "Em breve!" })}
              variant="ghost"
              rounded="full"
              p={3}
            >
              <MaterialIcons name="menu" size={24} color="#F8F8F8" />
            </Button>

            <Button
              onPress={() => navigation.navigate("config")}
              variant="ghost"
              rounded="full"
              p={3}
            >
              <MaterialIcons name="settings" size={24} color="#F8F8F8" />
            </Button>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            px={4}
            py={6}
            my={4}
            rounded="2xl"
            bg="#9A0007"
          >
            <MaterialCommunityIcons name="database" size={48} color="#D9D9D9" />

            <VStack space={0} ml={2}>
              <Text fontSize="lg" fontWeight="bold" color="#D9D9D9">
                {listResult.total > 0 ? listResult.total + " " : null}
                Pessoas Registradas
              </Text>

              {isFetching ? (
                <Skeleton.Text lines={1} w="50%" />
              ) : (
                <Text fontSize="sm" color="#ADB5BD">
                  {listResult.pf > 0 || listResult.pj > 0
                    ? `${listResult.pf} CPF | ${listResult.pj} CNPJ`
                    : "Nenhum registratro encontrado"}
                </Text>
              )}
            </VStack>
          </Box>

          <Box
            my={4}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Pressable w="46%" onPress={() => navigation.navigate("formPf")}>
              {({ isPressed }) => {
                return (
                  <VStack
                    display="flex"
                    alignItems="center"
                    p={4}
                    borderWidth="1"
                    bg={isPressed ? "rgba(173, 181, 189, 0.15)" : "transparent"}
                    borderColor="#ADB5BD"
                    rounded="xl"
                    space={1}
                  >
                    <MaterialCommunityIcons
                      name="account-circle-outline"
                      size={40}
                      color="#F8F8F8"
                    />

                    <Text fontSize="lg" color="#f8f8f8" textAlign="center">
                      Cadastrar Pessoa Física
                    </Text>
                  </VStack>
                );
              }}
            </Pressable>

            <Pressable w="46%" onPress={() => navigation.navigate("formPj")}>
              {({ isPressed }) => {
                return (
                  <VStack
                    display="flex"
                    alignItems="center"
                    p={4}
                    bg={isPressed ? "rgba(173, 181, 189, 0.15)" : "transparent"}
                    borderWidth="1"
                    borderColor="#ADB5BD"
                    rounded="xl"
                    space={1}
                  >
                    <FontAwesome5 name="building" size={40} color="#F8F8F8" />

                    <Text fontSize="lg" color="#f8f8f8" textAlign="center">
                      Cadastrar Pessoa Jurídica
                    </Text>
                  </VStack>
                );
              }}
            </Pressable>
          </Box>

          <Pressable
            w="100%"
            my={4}
            onPress={() => navigation.navigate("list")}
          >
            {({ isPressed }) => {
              return (
                <HStack
                  display="flex"
                  alignItems="center"
                  py={6}
                  px={4}
                  bg={isPressed ? "rgba(173, 181, 189, 0.15)" : "transparent"}
                  borderWidth="1"
                  borderColor="#ADB5BD"
                  rounded="xl"
                  space={3}
                >
                  <Feather name="pie-chart" size={40} color="#F8F8F8" />

                  <Text
                    fontSize="xl"
                    fontWeight="medium"
                    color="#f8f8f8"
                    textAlign="center"
                  >
                    Lista de cadastros
                  </Text>
                </HStack>
              );
            }}
          </Pressable>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
