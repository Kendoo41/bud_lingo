import { List, Datagrid, TextField, ReferenceField } from "react-admin";

export const LessonList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <ReferenceField source="unitId" reference="units" />
        <TextField source="order" />
      </Datagrid>
    </List>
  );
};
