import { VStack, Text, Input } from "native-base";

export const FormInput = ({
  label,
  placeholder,
  value,
  handleChangeValue,
  type,
  isInvalid,
  keyboardType,
  maxLength,
}) => {
  return (
    <VStack w="full" alignItems="flex-start" space={1}>
      <Text fontSize="md" color="#D9D9D9">
        {label}
      </Text>

      <Input
        value={value}
        isInvalid={isInvalid}
        onChangeText={(text) => handleChangeValue(text, type)}
        maxLength={maxLength}
        keyboardType={keyboardType}
        w="100%"
        size="md"
        color="#f8f8f8"
        placeholder={placeholder}
        variant="filled"
        bg="rgba(173, 181, 189, 0.1)"
        borderWidth={0}
        borderBottomWidth={1}
        borderColor="#707070"
        py="1"
      />
    </VStack>
  );
};
