import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Switch,
  useToast,
  Link,
  AlertDialog,
  Spinner,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { ClearPeopleList } from "../../Database";

export const Config = ({ navigation }) => {
  const toast = useToast();
  const [openAlert, setOpenAlert] = useState(false);
  const [isFetching, setIsfetching] = useState(false);
  const cancelRef = useRef(null);

  const handleClearData = async () => {
    setIsfetching(true);

    await ClearPeopleList().then(() => {
      toast.show({ description: "registros apagados!" });
    });

    setOpenAlert(false);
  };
  return (
    <Box height="100%" bg="#17181C">
      <Box
        w="100%"
        display="flex"
        p="3"
        flexDirection="row"
        alignItems="center"
        bg="#9A0007"
        roundedBottom="3xl"
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
          fontWeight="medium"
          color="#f8f8f8"
          alignSelf="center"
          position="absolute"
          left="4"
          w="100%"
          textAlign="center"
        >
          Configurações
        </Text>
      </Box>

      <VStack space={2} p="4" px="6" mt="8">
        <Text fontSize="xl" color="#f8f9fa">
          Geral
        </Text>

        <HStack
          alignItems="center"
          space={2}
          borderBottomWidth="1"
          borderColor="#707070"
        >
          <MaterialIcons name="brightness-4" size={20} color="#D9D9D9" />

          <Text fontSize="lg" color="#D9D9D9">
            Modo claro
          </Text>

          <Button
            marginLeft="auto"
            p="0"
            py="0"
            variant="unstyled"
            onPress={() => toast.show({ description: "Em breve!" })}
          >
            <Switch size="md" disabled />
          </Button>
        </HStack>

        <HStack
          alignItems="center"
          space={2}
          borderBottomWidth="1"
          borderColor="#707070"
          py="2"
        >
          <Feather name="trash-2" size={20} color="#D9D9D9" />

          <Text fontSize="lg" color="#D9D9D9">
            Limpar dados
          </Text>

          <Button
            marginLeft="auto"
            mr="2"
            p="1"
            px="1.5"
            variant="solid"
            bg="#d90429"
            _pressed={{ bg: "#9d0208" }}
            onPress={() => setOpenAlert(true)}
          >
            <Feather name="trash-2" size={18} color="#f8f9fa" />
          </Button>
        </HStack>
      </VStack>

      <VStack space={4} p="4" px="6" mt="8">
        <Text fontSize="xl" color="#f8f9fa">
          Sobre
        </Text>

        <HStack
          alignItems="center"
          space={2}
          pb="3"
          borderBottomWidth="1"
          borderColor="#707070"
        >
          <Octicons name="info" size={20} color="#f8f9fa" />

          <Text fontSize="lg" color="#f8f9fa">
            Versão da aplicação
          </Text>

          <Text color="#D9D9D9" fontSize="sm" ml="auto">
            1.0 beta
          </Text>
        </HStack>

        <HStack
          alignItems="center"
          space={2}
          pb="3"
          borderBottomWidth="1"
          borderColor="#707070"
        >
          <FontAwesome name="user-circle" size={20} color="#f8f9fa" />

          <Text fontSize="lg" color="#f8f9fa">
            Autor
          </Text>

          <Link ml="auto" isExternal href="https://lovini.dev">
            <HStack space={1} alignItems="center">
              <Text color="#D9D9D9" fontSize="sm">
                Vinícius
              </Text>

              <Feather name="external-link" size={16} color="#D9D9D9" />
            </HStack>
          </Link>
        </HStack>

        <HStack
          alignItems="center"
          space={2}
          pb="3"
          borderBottomWidth="1"
          borderColor="#707070"
        >
          <FontAwesome5 name="github" size={20} color="#f8f9fa" />

          <Text fontSize="lg" color="#f8f9fa">
            Código fonte
          </Text>

          <Link
            ml="auto"
            isExternal
            href="https://github.com/vini54/geatsManager"
          >
            <HStack space={1} alignItems="center">
              <Text color="#D9D9D9" fontSize="sm">
                Github
              </Text>

              <Feather name="external-link" size={16} color="#D9D9D9" />
            </HStack>
          </Link>
        </HStack>
      </VStack>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Body maxW="90%">
            Essa ação irá remover todos os registros de pessoas cadastradas!
          </AlertDialog.Body>
          <AlertDialog.Footer py="2">
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => setOpenAlert(false)}
                ref={cancelRef}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="danger"
                onPress={handleClearData}
                isDisabled={isFetching}
              >
                {isFetching ? <Spinner size="sm" /> : "Excluir"}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};
