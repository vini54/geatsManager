import {
  Box,
  VStack,
  HStack,
  Text,
  useToast,
  Pressable,
  Button,
  AlertDialog,
  Spinner,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useRef, useState } from "react";

export const ListItem = ({
  name,
  date,
  type,
  handleClearItem,
  isFetching,
  id,
}) => {
  const toast = useToast();
  const [openAlert, setOpenAlert] = useState(false);
  const cancelRef = useRef(null);

  return (
    <HStack my="3" display="flex" space={2} alignItems="center">
      {type === "pf" && (
        <Box p="2" rounded="full" bg="#32333E">
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={32}
            color="#F8F8F8"
          />
        </Box>
      )}

      {type === "pj" && (
        <Box p="3" rounded="full" bg="#32333E">
          <FontAwesome5 name="building" size={24} color="#F8F8F8" />
        </Box>
      )}

      <Text fontSize="lg" color="#f8f8f9" alignSelf="flex-start" w="50%">
        {name}
      </Text>

      <VStack ml="auto" space={2}>
        <Text fontSize="xs" color="#ADB5BD">
          {date}
        </Text>

        <Pressable onPress={() => toast.show({ description: "Em breve!" })}>
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
          {/* <Text fontSize="sm" color="#ADB5BD">
            Detalhes <Entypo name="chevron-right" size={18} color="#ADB5BD" />
          </Text> */}
        </Pressable>
      </VStack>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Body maxW="90%">
            {`Deseja prosseguir em excluir o cadastro de ${name} ?`}
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
                onPress={() => handleClearItem(id)}
                isDisabled={isFetching}
              >
                {isFetching ? <Spinner size="sm" /> : "Excluir"}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </HStack>
  );
};
