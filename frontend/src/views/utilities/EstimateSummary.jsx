import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import EmailIcon from "@mui/icons-material/Email";
import { getClientData , estimateListSelector} from "store/reducers/clientReducer";
import { useSelector } from "react-redux";
import { fetchGeneralSettings, generalSettingsSelector } from "store/reducers/generalReducer";
import { getWorkItem, workItemSelector } from "store/reducers/workitemReducer";
import { useDispatch } from "react-redux";
import { API_STATUS } from "utils/constants";
const EstimateSummary = () => {
  const { clientId } = useParams();

  const [sendByEmail, setSendByEmail] = useState(false);
  const [download, setDownload] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [estimateSummary, setEstimateSummary] = useState(false);
  const [modularComponents, setModularComponents] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [estimatedBy, setEstimatedBy] = useState("");
  const [estimatedOn, setEstimatedOn] = useState("");
  const [version, setVersion] = useState("");
  const [documentVersion, setDocumentVersion] = useState("");
  const [hoursPerStoryPoint, setHoursPerStoryPoint] = useState("");
  const [ratePerHour, setRatePerHour] = useState("");
  
  const [overallCosting, setOverallCosting] = useState(0);
  const [totalDevEffortHours, setTotalDevEffortHours] = useState(0);
  const [totalDevEffortStoryPoints, setTotalDevEffortStoryPoints] = useState(0);
  const clientloading = useSelector(estimateListSelector).clientloading;
  const workitemloading = useSelector(workItemSelector).workitemloading;
  const generalSettingsloading = useSelector(generalSettingsSelector).status
  const clientloadData = useSelector(estimateListSelector).clientloadData
  const workitemData = useSelector(workItemSelector).workitemloadData;
  const generalSettingsData = useSelector(generalSettingsSelector).data
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    let totalCosting = 0;
    let totalDevEffort = 0;
    let totalHours = 0
    let totalStoryPoints = 0

    tableData.forEach((row) => {
      const finalEffort = parseFloat(row.finalEffort) || 0;
      totalHours += finalEffort * 8
      totalStoryPoints = totalHours/ hoursPerStoryPoint
      totalCosting = totalHours * ratePerHour; 
      totalDevEffort += finalEffort
      console.log(totalDevEffort)
      setOverallCosting(totalCosting)
      setTotalDevEffortHours(totalHours)
      setTotalDevEffortStoryPoints(totalStoryPoints)

    
    })})

  const handleCreateNew = () => {
    setSendByEmail(false);
    setDownload(false);
    setCreateNew(true);
    setModularComponents(false);
    setEstimateSummary(false);
    navigate("/generate-estimation"); // Navigates to '/generate-estimate' route
  };

  const handleEstimateSummary = () => {
    setEstimateSummary(!estimateSummary);
    setModularComponents(false);
    setSendByEmail(false);
    setDownload(false);
    setCreateNew(false);
  };

  const handleModularComponents = () => {
    setModularComponents(!modularComponents);
    setEstimateSummary(false);
    setSendByEmail(false);
    setDownload(false);
    setCreateNew(false);
  
  };


useEffect(()=>{
  dispatch(getClientData({clientId: clientId}))
  dispatch(fetchGeneralSettings())
  dispatch(getWorkItem({clientId}))
}, [dispatch, clientId])

useEffect(()=> {
  console.log(clientloading, 'clientloading')
  if (clientloading === API_STATUS.FULFILLED){
    const clientData = clientloadData
    setProjectName(clientData.clientName);
    setEstimatedBy(clientData.createdBy);
    setEstimatedOn(clientData.createdAt.substring(0, 10));
  }
  if (clientloading === API_STATUS.REJECTED){
    console.log('client data not got')
  }
}, [clientloading])

useEffect(()=> {
  console.log(generalSettingsloading, 'generalSettingsloading')
  if (generalSettingsloading === API_STATUS.FULFILLED){
    setVersion(generalSettingsData.version.toString());
    setDocumentVersion(generalSettingsData.document_version.toString());
    setHoursPerStoryPoint(
      generalSettingsData.hours_per_story_point.toString()
    );
    setRatePerHour(generalSettingsData.rate_per_hour.toString());
  }
  if (generalSettingsloading === API_STATUS.REJECTED){
    console.log('general settings data not got')
  }
}, [generalSettingsloading])

useEffect(()=> {
  console.log(workitemloading, 'workitemloading')
  if (workitemloading === API_STATUS.FULFILLED){
   setTableData(workitemData)
  }
  if (workitemloading === API_STATUS.REJECTED){
    console.log('general settings data not got')
  }
}, [workitemloading])
  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [clientsResponse, workItemsResponse, generalSettingsResponse] =
  //         await Promise.all([
  //           axios.get(`http://localhost:3002/clients`, {
  //             params: { id: clientId },
  //           }),
  //           axios.get("http://localhost:3002/workItems", {
  //             params: { clientId: clientId },
  //           }),
  //           axios.get("http://localhost:3002/generalSettings"),
  //         ]);

  //       if (
  //         clientsResponse.status === 200 &&
  //         workItemsResponse.status === 200 &&
  //         generalSettingsResponse.status === 200
  //       ) {
  //         const clientData = clientsResponse.data;
  //         // const workItemsData = workItemsResponse.data;
  //         const generalSettingsData = generalSettingsResponse.data;
          // setProjectName(clientData.clientName);
          // setEstimatedBy(clientData.createdBy);
          // setEstimatedOn(clientData.createdAt.substring(0, 10));

  //         setTableData(workItemsResponse.data);
          // setVersion(generalSettingsData.version.toString());
          // setDocumentVersion(generalSettingsData.document_version.toString());
          // setHoursPerStoryPoint(
          //   generalSettingsData.hours_per_story_point.toString()
          // );
          // setRatePerHour(generalSettingsData.rate_per_hour.toString());
  //         setDataLoaded(true);
  //       } else {
  //         console.error("Error fetching data:", clientsResponse.status);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [clientId]);

  const handleDownload = () => {
    const workbook = XLSX.utils.book_new();

    const estimateSummaryData = [
      ["Project Name", projectName],
      ["Estimated By", estimatedBy],
      ["Estimated On", estimatedOn],
      ["Version", version],
      ["Document Version", documentVersion],
      ["Hours per Story Point", hoursPerStoryPoint],
      ["Rate per Hour", ratePerHour],
      ["Overall Costing", `$${overallCosting}`],
      ["Total Dev Effort(in hours)", totalDevEffortHours],
      ["Total Dev Effort(in story points)", totalDevEffortStoryPoints]
    ];

    const estimateSummarySheet = XLSX.utils.aoa_to_sheet(estimateSummaryData);
    XLSX.utils.book_append_sheet(
      workbook,
      estimateSummarySheet,
      "Estimate Summary"
    );

    const modularComponentsData = tableData.map((row, index) => [
      index + 1,
      row.module,
      row.userType,
      row.appType,
      row.componentName,
      row.comments,
      row.description,
      row.componentType,
      row.complexity,
      row.buildEffort,
      row.effortOverride,
      row.finalEffort,
    ]);

    const modularComponentsSheet = XLSX.utils.aoa_to_sheet([
      [
        "Sno",
        "Module",
        "User Type",
        "App Type",
        "Component Name",
        "Comments",
        "Description",
        "Component Type",
        "Complexity",
        "Build Effort (in Days)",
        "Effort Override (in Days)",
        "Final Effort (in Days)",
      ],
      ...modularComponentsData,
    ]);
    XLSX.utils.book_append_sheet(
      workbook,
      modularComponentsSheet,
      "Modular Components"
    );

    XLSX.writeFile(workbook, "estimate_summary.xlsx");
  };

  const handleSendByEmail = () => {
    handleDownload();
    const emailClientLink =
      "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new";
    window.open(emailClientLink, "_blank");
  };

  return (
    <div>
      <h1 className="estimate-heading">Estimate Summary</h1>
      <div className="inform-btns">
        <button onClick={handleSendByEmail}>
          Send by Email
          <EmailIcon />
        </button>
        <button onClick={handleDownload}>
          Download
          <ArrowCircleDownIcon />
        </button>
        <button onClick={handleCreateNew}>
          New
          <AddCircleOutlineIcon />
        </button>
      </div>
      <div className="estimate-headers">
        <button
          onClick={handleEstimateSummary}
          style={{ backgroundColor: estimateSummary ? "#0d9ccead" : "#211d1d" }}
        >
          Estimate Summary
        </button>
        <button
          onClick={handleModularComponents}
          style={{
            backgroundColor: modularComponents ? "#0d9ccead" : "#211d1d",
          }}
        >
          Modular Components
        </button>
      </div>
      {sendByEmail && <p>Send by Email functionality is displayed</p>}
      {download && <p>Download functionality is displayed</p>}
      {createNew && <p>New functionality is displayed</p>}
      {estimateSummary && (
        <div className="table-overall">
          <h2 className="estimate-head">Estimate Summary</h2>
          <div>
            <table className="work-item-table" id="estimate-summary-table">
              <tbody>
                <tr className="workitem-tab">
                  <td>Project Name</td>
                  <td>
                    <input type="text" value={projectName} readOnly />
                  </td>
                </tr>
                <tr className="workitem-tab">
                  <td>Estimated By</td>
                  <td>
                    <input type="text" value={estimatedBy} readOnly />
                  </td>
                </tr>
                <tr className="workitem-tab">
                  <td>Estimated On</td>
                  <td>
                    <input type="text" value={estimatedOn} readOnly />
                  </td>
                </tr>
                <tr className="workitem-tab">
                  <td>Version</td>
                  <td>
                    <input type="text" value={version} readOnly />
                  </td>
                </tr>
                <tr className="workitem-tab">
                  <td>Document Version</td>
                  <td>
                    <input type="text" value={documentVersion} readOnly />
                  </td>
                </tr>
                <tr className="workitem-tab">
                  <td>Hours per Story Point</td>
                  <td>
                    <input type="text" value={hoursPerStoryPoint} readOnly />
                  </td>
                </tr>
                <tr className="workitem-tab">
                  <td>Rate per Hour</td>
                  <td>
                    <input type="text" value={ratePerHour} readOnly />
                  </td>
                </tr>
                <tr className="workitem-tab">
                  <td>Overall Costing</td>
                  <td>
                  <input type="text" value={`$${overallCosting}`} readOnly />
                  </td>
                </tr>
                <tr className="workitem-tab">
                  <td>Total Dev Effort (in Hours)</td>
                  <td>
                  <input type="text" value={totalDevEffortHours} readOnly />
                  </td>
                </tr>
                <tr className="workitem-tab">
                  <td>Total Dev Effort (in Story Points)</td>
                  <td>
                  <input type="text" value={totalDevEffortStoryPoints} readOnly />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modularComponents && (
        <div className="work-item-container">
          <h2 className="summary-title">Modular Components</h2>
          <table className="work-item-table" id="modular-components-table">
            <thead>
              <tr className="">
                <th>S.No</th>
                <th>Module</th>
                <th>User Type</th>
                <th>App Type</th>
                <th>Component Name</th>
                <th>Comments</th>
                <th>Description</th>
                <th>Component Type</th>
                <th>Complexity</th>
                <th>Build Effort (in Days)</th>
                <th>Effort Override (in Days)</th>
                <th>Final Effort (in Days)</th>
              </tr>
            </thead>
            <tbody className="workitem-tab">
              {tableData.map((row, index) => (
                <tr key={row.id}>
                  <td className="workitem-data ">
                    <div className="col-1">{index + 1}</div>{" "}
                  </td>
                  <td className="workitem-data">
                    <div className="col-2  differ-1">{row.module}</div>{" "}
                  </td>
                  <td className="workitem-data ">
                    <div className="col-2 differ-2">{row.userType}</div>
                  </td>
                  <td className="workitem-data ">
                    <div className="col-3 differ-3">{row.appType}</div>
                  </td>
                  <td className="workitem-data">
                    <div className="col-4  differ-4">{row.componentName}</div>
                  </td>
                  <td className="workitem-data ">
                    <div className="col-5 differ-3">{row.comments}</div>
                  </td>
                  <td className="workitem-data ">
                    {" "}
                    <div className="descript-box "> {row.description}</div>
                  </td>
                  <td className="workitem-data differ-7">
                    <div className="col-7 differ-2">{row.componentType}</div>
                  </td>
                  <td className="workitem-data differ-8">
                    <div className="col-8 differ-2">{row.complexity}</div>
                  </td>
                  <td className="workitem-data differ-9">
                    <div className="col-9 differ-3">{row.buildEffort}</div>
                  </td>
                  <td>
                    <div className="col-10 differ-3">{row.effortOverride}</div>
                  </td>
                  <td className="workitem-data differ-9">
                    <div className="col-2 differ-3">{row.finalEffort}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EstimateSummary;
