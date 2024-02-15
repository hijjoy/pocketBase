import React from "react";
import * as E from "../components/Editor.style";

const FieldData = ({ description, isSelected, click }) => {
  return (
    <E.PickBtn $isSelected={isSelected} onClick={() => click(description)}>
      {description}
    </E.PickBtn>
  );
};

export default FieldData;
