import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchComplexity, complexitySelector } from "../../store/reducers/complexityReducer";
import { API_STATUS } from "../../utils/constants";
import { componentSelector, fetchComponents } from "../../store/reducers/componentReducer";
import { submitWorkItem, workItemSelector} from "../../store/reducers/workitemReducer"
const WorkItem = ( ) => {
  const { clientId } = useParams();
  const [rows, setRows] = useState([{}]);

  const [showEstimateSummary, setShowEstimateSummary] = useState(false);
  const [componentTypes, setComponentTypes] = useState([]);
  const [complexities, setComplexities] = useState([]);
  const [defaultComponent, setDefaultComponent] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const complexityloading = useSelector(complexitySelector).complexityloading
  const componentloading = useSelector(componentSelector).componentloading
  const workitemloading = useSelector(workItemSelector).workitemloading
  const data = useSelector(complexitySelector).loadData
  const componentData = useSelector(componentSelector).loadData
 
  

  useEffect(() => {
    dispatch(fetchComponents());
    dispatch(fetchComplexity());
    
  }, [dispatch]);
 
  useEffect(() => {
    console.log(componentloading, "loading")
    if (componentloading === API_STATUS.FULFILLED) {
      
      console.log("Component data got Successfully!");
      setComponentTypes(componentData)
      
      console.log(componentTypes)
    
    }
    if (componentloading === API_STATUS.REJECTED) {
      
      console.log('Component data got failed');
    }

    console.log(complexityloading, "loading")
    if (complexityloading === API_STATUS.FULFILLED) {
      
      console.log("data got Successfully!");
      setComplexities(
            data)
          console.log(complexities)
             
    
    }
    if (complexityloading === API_STATUS.REJECTED) {
      
      console.log('data got failed');
    }

    console.log(workitemloading, "loading")
    if (workitemloading === API_STATUS.FULFILLED) {
      
      console.log("workitem data submitted got Successfully!");
       

     
        setRows([]);
        navigate(`/estimate-summary/${clientId}`);
         setShowEstimateSummary(true);
      // }
    
    
    }
    if (workitemloading === API_STATUS.REJECTED) {
      
      console.log('data got failed');
    }
  }, [componentloading, complexityloading, workitemloading]);

  useEffect(() => {
    const defaultComponentData = componentTypes.find(
      (component) => component.default === 'default'
    );

    if (defaultComponentData && defaultComponentData.name) {
      setDefaultComponent(defaultComponentData.name);
      console.log(defaultComponentData.name);
    }
  }, [componentTypes]);
      

  const selectedComplexity =
    complexities.length > 0 ? complexities[0].complexity : "";
  const selectedBuildEffort = selectedComplexity? complexities[0].days: "0"

  const addRow = () => {
    setRows([...rows, {}]);
  };
  useEffect(()=> console.log(selectedBuildEffort))

  const deleteRow = () => {
    setRows((prevRows) => {
      if (prevRows.length > 1) {
        return prevRows.slice(0, prevRows.length - 1);
      }
      return prevRows;
    });
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index][name] = value;

      if (name === "complexity") {

        const selectedComplexity = value;
        
        const selectedBuildEffort =
          selectedComplexity === "simple"
            ? "1"
            : selectedComplexity === "medium"
              ? "2"
              : selectedComplexity === "complex"
                ? "3"
                : "";

        updatedRows[index]["buildEffort"] = selectedBuildEffort;
        
      }

      return updatedRows;
      
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
      let isFormValid = true;

      for (const row of rows) {
     
        const finalEffort =
          row.effortOverride || row.buildEffort || selectedBuildEffort;

        const workItem = {
          module: row.module || "",
          userType: row.userType || "",
          appType: row.appType || "",
          componentName: row.componentName || "",
          comments: row.comments || "must",
          description: row.description || "",
          componentType: row.componentType || defaultComponent,
          complexity: selectedComplexity || row.complexity,
          buildEffort: row.buildEffort || selectedBuildEffort,
          effortOverride: row.effortOverride || "0",
          finalEffort: finalEffort, // Use the calculated finalEffort
          clientId: clientId,
        };
        console.log(workItem);
        console.log(finalEffort)

        // Check if any of the required fields are empty
        const requiredFields = [
          "module",
          "userType",
          "appType",
          "componentName",
          "comments",
          "description",
          "componentType",
          "complexity",
          "buildEffort",
        ];

        for (const field of requiredFields) {
          if (!workItem[field]) {
            isFormValid = false;
            // Handle the validation error appropriately (e.g., display error messages to the user)
            console.error(`${field} is required`);
          }
        }

        if (isFormValid) {
          dispatch(submitWorkItem({workItem}))
          
        }
      }

   
  };
  useEffect(() => {
    // Update finalEffort when buildEffort changes
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        finalEffort: row.effortOverride || selectedBuildEffort,
      }))
    );
  }, [selectedBuildEffort]);

  const renderTableHeader = () => {
    const headers = [
      "S.No",
      "Module",
      "User Type",
      "App Type",
      "Component Name",
      "Comments",
      "Description",
      "Component Type",
      "Complexity",
      "Build Effort (in days)",
      "Effort Override (in days)",
      "Final Effort (in days",
      "Action",
    ];

    return headers.map((header, index) => <th key={index}>{header}</th>);
  };

  const renderTableBody = () => {
    return rows.map((row, index) => {
      
      const effortOverride = parseFloat(row.effortOverride) || 0;
      const finalEffort = effortOverride ? effortOverride : row.buildEffort || selectedBuildEffort; 
      
      const showDeleteButton = index !== 0; // Show delete button for all rows except the first row
    

      return (
       
          
       
        <tr className="items-row" key={index}>
          <td className="workitem-data">
            <div className="col-1">{index + 1}</div>
          </td>
          <td className="workitem-data">
            <input
              className="col-2"
              type="text"
              name="module"
              value={row.module}
              onChange={(e) => handleChange(e, index)}
              required
            />
          </td>
          <td className="workitem-data">
            <input
              className="col-2"
              type="text"
              name="userType"
              value={row.userType}
              onChange={(e) => handleChange(e, index)}
              required
            />
          </td>
          <td className="workitem-data">
            <input
              className="col-3"
              type="text"
              name="appType"
              value={row.appType}
              onChange={(e) => handleChange(e, index)}
              required
            />
          </td>
          <td className="workitem-data">
            <input
              type="text"
              className="col-4"
              name="componentName"
              value={row.componentName}
              onChange={(e) => handleChange(e, index)}
              required
            />
          </td>
          <td className="workitem-data">
            <select
              name="comments"
              className="col-5"
              value={row.comments || "must"}
              onChange={(e) => handleChange(e, index)}
              required
            >
              <option value="must">Must to have</option>
              <option value="good">Good to have</option>
              <option value="nice">Nice to have</option>
            </select>
          </td>
          <td className="workitem-data">
            <textarea
              value={row.description}
              onChange={(e) => handleChange(e, index)}
              className="col-6"
              name="description"
              required
              cols=""
              rows=""
            ></textarea>
          </td>
          <td className="workitem-data">
          <select
              name="componentType"
              className="col-7"
              value={row.componentType || ""}
              onChange={(e) => handleChange(e, index)}
              required
            >
              {defaultComponent && (
                <option value={defaultComponent}>{defaultComponent}</option>
              )}
              {componentTypes
                .filter((type) => type.name !== defaultComponent)
                .map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
            </select>
          </td>
          <td className="workitem-data">
            <select
              name="complexity"
              className="col-8"
              value={row.complexity || selectedComplexity}
              onChange={(e) => handleChange(e, index)}
              required
            >
              {complexities.map((complexity) => (
                <option
                  key={complexity.id}
                  value={
                    complexity.complexity === row.complexity
                      ? complexity.complexity
                      : selectedComplexity
                  }
                >
                  {complexity.complexity === row.complexity
                    ? complexity.complexity
                    : selectedComplexity}
                </option>
              ))}
              {selectedComplexity !== "simple" && (
                <option value="simple">Simple</option>
              )}
              {selectedComplexity !== "medium" && (
                <option value="medium">Medium</option>
              )}
              {selectedComplexity !== "complex" && (
                <option value="complex">Complex</option>
              )}
            </select>
          </td>
          <td className="workitem-data">
            <input
              type="text"
              className="col-9"
              name="buildEffort"
              value={row.buildEffort || selectedBuildEffort}
              readOnly
            />
          </td>
          <td className="workitem-data">
            <input
              type="number"
              className="col-10"
              name="effortOverride"
              value={row.effortOverride || ""}
              onChange={(e) => handleChange(e, index)}
            />
          </td>
          <td className="workitem-data">
            <div className="col-10">{finalEffort}</div>
          </td>
          <td className="workitem-data">
            {showDeleteButton ? (
              <button className="delete-row-button col-11" onClick={deleteRow}>
                <DeleteIcon />
              </button>
            ) : (
              <div className="disable-delete">
                <DeleteIcon />{" "}
              </div>
            )}
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="work-item-container">
      {!showEstimateSummary && (
        <div>
          <h2 className="workitem-title">Workitem Table</h2>
          <table className="work-item-table">
            <thead>
              <tr>{renderTableHeader()}</tr>
            </thead>
            <tbody>{renderTableBody()}</tbody>
          </table>
          <button className="add-row-button" onClick={addRow}>
            Add Row
          </button>
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
      
    </div>
  );
};

export default WorkItem;
