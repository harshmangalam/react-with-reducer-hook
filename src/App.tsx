import {
  Button,
  Container,
  GridItem,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import ParentCard from "./components/parent-card";
import useParentData from "./useParentData";

export default function App() {
  const {
    addNewParent,
    state,
    addNewChild,
    removeParent,
    removeChild,
    handleChangeParent,
    handleChangeChild,
  } = useParentData();
  const handleSendData = () => {
    console.log(state);
  };
  return (
    <Container maxW={"container.md"} py="8">
      <HStack justify={"flex-end"} mb="4">
        <Button onClick={addNewParent} colorScheme="twitter" variant="solid">
          Add Parent
        </Button>
        <Button onClick={handleSendData} colorScheme="whatsapp" variant="solid">
          Send Data
        </Button>
      </HStack>
      <SimpleGrid spacing={"6"}>
        {state.parents.map((parent) => (
          <GridItem key={parent.parentId}>
            <ParentCard
              removeParent={removeParent}
              addNewChild={addNewChild}
              removeChild={removeChild}
              handleChangeChild={handleChangeChild}
              handleChangeParent={handleChangeParent}
              {...parent}
            />
          </GridItem>
        ))}
      </SimpleGrid>
    </Container>
  );
}
