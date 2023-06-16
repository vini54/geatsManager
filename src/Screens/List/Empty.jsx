import { Box, Text, VStack } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const EmptyItem = () => {
  return (
    <VStack
      mt="24"
      my="8"
      alignItems="center"
      justifyContent="center"
      space={4}
    >
      <Text
        maxWidth="65%"
        textAlign="center"
        fontSize="2xl"
        color="#f8f9fa"
        fontWeight="medium"
      >
        Nenhum cadastro encontrado!
      </Text>

      <Box>
        <MaterialCommunityIcons
          name="folder-alert-outline"
          size={120}
          color="#9A0007"
        />
      </Box>
    </VStack>
  );
};
