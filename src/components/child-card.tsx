import { Button, Card, CardBody, HStack, Input } from "@chakra-ui/react";

export default function ChildCard({
  parentId,
  childId,
  childName,
  removeChild,
  handleChangeChild,
}) {
  return (
    <Card>
      <CardBody>
        <HStack>
          <Input
            onChange={(e) =>
              handleChangeChild({ parentId, childId, value: e.target.value })
            }
            placeholder={childName}
          />
          <Button
            onClick={() => removeChild(parentId, childId)}
            colorScheme="red"
            variant="ghost"
          >
            Remove
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );
}
