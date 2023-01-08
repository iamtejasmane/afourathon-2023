import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { statusAction } from "../../slice/statusSlice";

const customStyles = {
  control: (base) => ({
    ...base,
    width: 250,
    height: 43,
    minHeight: 35,
  }),
};

const ProjectSelector = () => {
  const [option, setOptions] = useState([]);
  const { selectedProjectForStatusUpdate } = useSelector(
    (store) => store.status
  );
  const { projectList } = useSelector((store) => store.project);
  const dispatch = useDispatch();

  const handleProjectSelectChange = (value) => {
    dispatch(statusAction.setselectedProjectForStatusUpdate(value));
  };

  useEffect(() => {
    const filteredProjectList =
      projectList.length > 0 &&
      projectList.reduce((acc, curr) => {
        return [
          ...acc,
          {
            value: curr.project_name,
            label: curr.project_name,
            ...curr,
          },
        ];
      }, []);

    setOptions(filteredProjectList);
  }, [projectList]);
  return (
    <div style={{ maxWidth: "250px" }}>
      <Select
        options={option}
        styles={customStyles}
        placeholder="Select Project"
        onChange={handleProjectSelectChange}
        defaultValue={{
          label:
            selectedProjectForStatusUpdate?.project_name || "Select Project",
          value: selectedProjectForStatusUpdate?.project_id,
        }}
      />
    </div>
  );
};

export default ProjectSelector;
