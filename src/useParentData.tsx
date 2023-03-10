import { useReducer } from "react";

type Child = {
  childId: string;
  childName: string;
};

type Parent = {
  parentId: string;
  parentName: string;
  children: Child[];
};

type State = {
  parents: Parent[];
};

enum ActionTypeEnum {
  AddParent,
  AddChild,
  RemoveParent,
  RemoveChild,
  UpdateParentName,
  UpdateChildName,
}

type Action = {
  type: ActionTypeEnum;
  payload: any;
};

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case ActionTypeEnum.AddParent:
      return {
        ...state,
        parents: [...state.parents, payload],
      };

    case ActionTypeEnum.AddChild:
      return {
        ...state,
        parents: state.parents.map((parent) => {
          if (parent.parentId === payload.parentId) {
            return {
              ...parent,
              children: [...parent.children, payload.child],
            };
          }
          return parent;
        }),
      };

    case ActionTypeEnum.RemoveParent:
      return {
        ...state,
        parents: state.parents.filter((parent) => parent.parentId !== payload),
      };

    case ActionTypeEnum.RemoveChild:
      return {
        ...state,
        parents: state.parents.map((parent) => {
          if (parent.parentId === payload.parentId) {
            return {
              ...parent,
              children: parent.children.filter(
                (child) => child.childId !== payload.childId
              ),
            };
          }

          return parent;
        }),
      };

    case ActionTypeEnum.UpdateParentName:
      return {
        ...state,
        parents: state.parents.map((parent) => {
          if (parent.parentId === payload.parentId) {
            return {
              ...parent,
              parentName: payload.value,
            };
          }
          return parent;
        }),
      };

    case ActionTypeEnum.UpdateChildName:
      return {
        ...state,
        parents: state.parents.map((parent) => {
          if (parent.parentId === payload.parentId) {
            return {
              ...parent,
              children: parent.children.map((child) => {
                if (child.childId === payload.childId) {
                  return {
                    ...child,
                    childName: payload.value,
                  };
                }
                return child;
              }),
            };
          }

          return parent;
        }),
      };
  }
};

const initialState: State = {
  parents: [],
};

export default function useParentData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addNewParent() {
    const parent: Parent = {
      parentId: crypto.randomUUID(),
      parentName: "New Parent",
      children: [],
    };
    console.log(parent);
    dispatch({ type: ActionTypeEnum.AddParent, payload: parent });
  }

  function addNewChild(parentId: string) {
    const child: Child = {
      childId: crypto.randomUUID(),
      childName: "New Child",
    };

    console.log(parentId, child);
    dispatch({ type: ActionTypeEnum.AddChild, payload: { parentId, child } });
  }

  function removeParent(parentId: string) {
    dispatch({ type: ActionTypeEnum.RemoveParent, payload: parentId });
  }

  function removeChild(parentId: string, childId: string) {
    dispatch({
      type: ActionTypeEnum.RemoveChild,
      payload: {
        parentId,
        childId,
      },
    });
  }

  function handleChangeParent(parentId: string, value: string) {
    dispatch({
      type: ActionTypeEnum.UpdateParentName,
      payload: {
        parentId,
        value,
      },
    });
  }

  function handleChangeChild({
    parentId,
    childId,
    value,
  }: {
    parentId: string;
    childId: String;
    value: string;
  }) {
    dispatch({
      type: ActionTypeEnum.UpdateChildName,
      payload: {
        parentId,
        childId,
        value,
      },
    });
  }
  return {
    addNewParent,
    state,
    addNewChild,
    removeParent,
    removeChild,
    handleChangeParent,
    handleChangeChild,
  };
}
