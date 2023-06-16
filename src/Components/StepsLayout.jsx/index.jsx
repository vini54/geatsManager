import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  ScrollView,
  Spinner,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export const StepsLayout = ({
  navigation,
  children,
  type,
  handleContinue,
  step,
  isFetching,
}) => {
  return (
    <Box h="100%" bg="#9A0007">
      <Box
        w="100%"
        display="flex"
        p="2"
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
          Cadastro
        </Text>
      </Box>

      <HStack px="4" pb="3">
        <Box space={2} py="1" pb="1.5" px="3" rounded="full" bg="#32333E">
          <Text fontSize="sm" color="#ADB5BD">
            {type === "pj" ? "Pessoa jurídica" : "Pessoa física"}
          </Text>
        </Box>
      </HStack>

      <VStack
        height="100%"
        display="flex"
        bg="#17181C"
        roundedTop="3xl"
        p="4"
        pt="8"
      >
        <HStack alignItems="center" justifyContent="space-between" space="2">
          <Box
            w="30%"
            bg={step >= 1 ? "#D32F2F" : "#D9D9D9"}
            rounded="full"
            h="8px"
          />
          <Box
            w="30%"
            bg={step >= 2 ? "#D32F2F" : "#D9D9D9"}
            rounded="full"
            h="8px"
          />
          <Box
            w="30%"
            bg={step >= 3 ? "#D32F2F" : "#D9D9D9"}
            rounded="full"
            h="8px"
          />
        </HStack>

        {step !== 3 && (
          <ScrollView>
            <VStack
              height="80%"
              py="8"
              space={4}
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl" color="#f8f9fa">
                {step === 1
                  ? "Dados pessoais"
                  : step === 2
                  ? "Documento(s) (opcional)"
                  : null}
              </Text>

              {children}

              <Button
                onPress={() => handleContinue()}
                w="75%"
                variant="solid"
                rounded="full"
                bg="#9A0007"
                py="2"
                _pressed={{ bg: "#9a0008c1" }}
              >
                <HStack alignItems="center" space={2}>
                  {isFetching && <Spinner size="sm" />}
                  <Text color="#f8f9fa" fontSize="xl" pb="0.5">
                    {step === 1 ? "Continuar" : "Pular"}
                  </Text>
                </HStack>
              </Button>
            </VStack>
          </ScrollView>
        )}

        {step === 3 && (
          <VStack h="75%" alignItems="center" justifyContent="space-between">
            <VStack
              h="80%"
              alignItems="center"
              justifyContent="center"
              space={4}
            >
              <Text
                maxWidth="75%"
                textAlign="center"
                fontSize="xl"
                color="#f8f9fa"
                fontWeight="medium"
              >
                Pessoa cadastrada com sucesso!
              </Text>

              <Box bg="#9A0007" rounded="full">
                <Feather name="check-circle" size={80} color="#f8f9fa" />
              </Box>
            </VStack>

            <Button
              onPress={() => navigation.navigate("home")}
              mt="16"
              w="75%"
              variant="solid"
              rounded="full"
              bg="#9A0007"
              py="2"
              _pressed={{ bg: "#9a0008c1" }}
              _text={{ color: "#f8f9fa", fontSize: "xl", pb: 0.5 }}
            >
              Inicio
            </Button>
          </VStack>
        )}
      </VStack>
    </Box>
  );
};
