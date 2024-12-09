import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserTypeSelector = ({
  userType,
  setUserType,
  onClickHandler,
}: UserTypeSelectorParams) => {
  const onChangeHandler = (value: UserType) => {
    setUserType(value);
    onClickHandler && onClickHandler(value);
    console.log(userType,value)
  };
  return (
    <Select
      value={userType}
      onValueChange={(value: UserType) => onChangeHandler(value)}
    >
      <SelectTrigger className="shad-select">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-none bg-dark-200">
        <SelectItem value="viewer" className="shad-select-item">
          can view
        </SelectItem>
        <SelectItem value="editor" className="shad-select-item">
          can edit
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserTypeSelector