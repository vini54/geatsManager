import { VStack, HStack, Text, Pressable, useToast } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const FileItem = ({ name }) => {
  const toast = useToast();
  return (
    <VStack alignItems="center" space={1}>
      <Text fontSize="md" color="#f8f9fa">
        {name}
      </Text>

      <Pressable
        onPress={() => toast.show({ description: "Em breve!" })}
        bg="#32333E"
        p="8"
        rounded="xl"
        _pressed={{ bg: "#292A33" }}
      >
        <HStack alignItems="center" space={2}>
          <MaterialCommunityIcons
            name="file-search"
            size={32}
            color="#D9D9D9"
          />

          <Text fontSize="xl" color="#D9D9D9" fontWeight="medium">
            Carregar arquivo
          </Text>
        </HStack>
      </Pressable>
    </VStack>
  );
};
