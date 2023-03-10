import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  GridItem,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import ChildCard from "./child-card";

export default function ParentCard({
  parentId,
  parentName,
  addNewChild,
  children,
  removeParent,
  removeChild,
  handleChangeParent,
  handleChangeChild,
}) {
  return (
    <Card>
      <CardBody>
        <Input
          size="lg"
          placeholder="Enter parent name"
          onChange={(e) => handleChangeParent(parentId, e.target.value)}
        />
        <Flex justify={"flex-end"} mt="8" mb="4">
          <Button onClick={() => addNewChild(parentId)} colorScheme="purple">
            Add Child
          </Button>
        </Flex>
        <SimpleGrid>
          {children.map((child) => (
            <GridItem key={child.childId}>
              <ChildCard
                handleChangeChild={handleChangeChild}
                parentId={parentId}
                removeChild={removeChild}
                {...child}
              />
            </GridItem>
          ))}
        </SimpleGrid>
      </CardBody>
      <CardFooter>
        <Button onClick={() => removeParent(parentId)} colorScheme={"red"}>
          Remove {parentName}
        </Button>
      </CardFooter>
    </Card>
  );
}
