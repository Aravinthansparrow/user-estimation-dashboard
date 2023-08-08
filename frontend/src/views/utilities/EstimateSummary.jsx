import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import EmailIcon from '@mui/icons-material/Email';
import { getClientData, estimateListSelector } from 'store/reducers/clientReducer';
import { useSelector } from 'react-redux';
import { fetchGeneralSettings, generalSettingsSelector } from 'store/reducers/generalReducer';
import { getWorkItem, workItemSelector } from 'store/reducers/workitemReducer';
import { useDispatch } from 'react-redux';
import { API_STATUS } from 'utils/constants';
import { activitiesSelector, fetchActivities } from 'store/reducers/activityReducer';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { useTheme } from '@emotion/react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button, Paper, Box, Typography } from '@mui/material';

const EstimateSummary = () => {
  const { id } = useParams();
  const theme = useTheme();
  const themeMode = useSelector((state) => state.customization.themeMode);
  const [sendByEmail, setSendByEmail] = useState(false);
  const [download, setDownload] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [estimateSummary, setEstimateSummary] = useState(false);
  const [modularComponents, setModularComponents] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [estimatedBy, setEstimatedBy] = useState('');
  const [estimatedOn, setEstimatedOn] = useState('');
  const [version, setVersion] = useState('');
  const [documentVersion, setDocumentVersion] = useState('');
  const [hoursPerStoryPoint, setHoursPerStoryPoint] = useState('');
  const [ratePerHour, setRatePerHour] = useState('');
  const [overallCosting, setOverallCosting] = useState(0);
  const [totalDevEffortHours, setTotalDevEffortHours] = useState(0);
  const [totalSecondColumn, setTotalSecondColumn] = useState('');
  const [totalDevEffortStoryPoints, setTotalDevEffortStoryPoints] = useState(0);

  //Import useSelector
  const clientloading = useSelector(estimateListSelector).clientloading;
  const getworkitemloading = useSelector(workItemSelector).getworkitemloading;
  const generalSettingsloading = useSelector(generalSettingsSelector).status;
  const activitiesloading = useSelector(activitiesSelector).activitiesloading;
  const activitiesLoadData = useSelector(activitiesSelector).loadData;
  const clientloadData = useSelector(estimateListSelector).clientloadData;
  const workitemData = useSelector(workItemSelector).workitemloadData;
  const generalSettingsData = useSelector(generalSettingsSelector).data;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let totalCosting = 0;
    let totalDevEffort = 0;
    let totalHours = 0;
    let totalStoryPoints = 0;

    tableData.forEach((row) => {
      const finalEffort = parseFloat(row.finalEffort) || 0;
      totalHours += finalEffort * 8;
      totalStoryPoints = totalHours / hoursPerStoryPoint;
      totalCosting = totalHours * ratePerHour;
      totalDevEffort += finalEffort;
      console.log(totalDevEffort);
      setOverallCosting(totalCosting);
      setTotalDevEffortHours(totalHours);
      setTotalDevEffortStoryPoints(totalStoryPoints);
    });
  });
  console.log(overallCosting);
  const handleCreateNew = () => {
    setSendByEmail(false);
    setDownload(false);
    setCreateNew(true);
    setModularComponents(false);
    setEstimateSummary(false);
    navigate('/utils/generate-estimation'); // Navigates to '/generate-estimate' route
    window.location.reload(true);
  };

  const handleEstimateSummary = () => {
    setEstimateSummary(true);
    setModularComponents(false);
    setSendByEmail(false);
    setDownload(false);
    setCreateNew(false);
  };

  const handleModularComponents = () => {
    setModularComponents(true);
    setEstimateSummary(false);
    setSendByEmail(false);
    setDownload(false);
    setCreateNew(false);
  };

  useEffect(() => {
    dispatch(getClientData(id));
    dispatch(fetchGeneralSettings());
    dispatch(getWorkItem(id));
    dispatch(fetchActivities());
  }, [dispatch, id]);

  useEffect(() => {
    console.log(clientloading, 'clientloading');
    if (clientloading === API_STATUS.FULFILLED) {
      const clientData = clientloadData;
      setProjectName(clientData.clientName);
      setEstimatedBy(clientData.createdBy);
      setEstimatedOn(clientData.createdAt);
    }
    if (clientloading === API_STATUS.REJECTED) {
      console.log('client data not got');
    }
  }, [clientloading]);

  useEffect(() => {
    console.log(generalSettingsloading, 'generalSettingsloading');
    if (generalSettingsloading === API_STATUS.FULFILLED) {
      setVersion(generalSettingsData.version.toString());
      setDocumentVersion(generalSettingsData.document_version.toString());
      setHoursPerStoryPoint(generalSettingsData.hours_per_story_point.toString());
      setRatePerHour(generalSettingsData.rate_per_hour.toString());
    }
    if (generalSettingsloading === API_STATUS.REJECTED) {
      console.log('general settings data not got');
    }
  }, [generalSettingsloading]);

  useEffect(() => {
    console.log(getworkitemloading, '3workitemloading');
    if (getworkitemloading === API_STATUS.FULFILLED) {
      setTableData(workitemData);
    }
    if (getworkitemloading === API_STATUS.REJECTED) {
      console.log('general settings data not got');
    }
  }, [getworkitemloading]);

  useEffect(() => {
    let totalSecondColumn = 0;
    activityData.forEach((row) => {
      const percentagesplit = parseFloat(row.percentagesplit) || 0;

      totalSecondColumn += Math.round((percentagesplit * totalDevEffortStoryPoints) / 100);
    });
    setTotalSecondColumn(totalSecondColumn);
    console.log(totalSecondColumn);
  });

  useEffect(() => {
    console.log(activitiesloading, 'activitiesloading');
    if (activitiesloading === API_STATUS.FULFILLED) {
      setActivityData(activitiesLoadData);
    }
    if (activitiesloading === API_STATUS.REJECTED) {
      console.log('general settings data not got');
    }
  }, [activitiesloading]);

  const handleDownload = () => {
    const workbook = XLSX.utils.book_new();

    const estimateSummaryData = [
      ['Project Name', projectName],
      ['Estimated By', estimatedBy],
      ['Estimated On', dayjs(estimatedOn).locale('en').format('DD-MM-YYYY')],
      ['Version', version],
      ['Document Version', documentVersion],
      ['Hours per Story Point', hoursPerStoryPoint],
      ['Rate per Hour', ratePerHour],
      ['Overall Costing', `$${overallCosting}`],
      ['Total Dev Effort(in hours)', totalDevEffortHours],
      ['Total Dev Effort(in story points)', totalDevEffortStoryPoints]
    ];

    const estimateSummarySheet = XLSX.utils.aoa_to_sheet(estimateSummaryData);
    XLSX.utils.book_append_sheet(workbook, estimateSummarySheet, 'Estimate Summary');

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
      row.finalEffort
    ]);

    const modularComponentsSheet = XLSX.utils.aoa_to_sheet([
      [
        'Sno',
        'Module',
        'User Type',
        'App Type',
        'Component Name',
        'Comments',
        'Description',
        'Component Type',
        'Complexity',
        'Build Effort (in Days)',
        'Effort Override (in Days)',
        'Final Effort (in Days)'
      ],
      ...modularComponentsData
    ]);
    XLSX.utils.book_append_sheet(workbook, modularComponentsSheet, 'Modular Components');
    // Add the data for the "Activities" table
    const activitiesData = activitiesLoadData.map((activity) => [
      activity.activity,
      Math.round((activity.percentagesplit * totalDevEffortStoryPoints) / 100),
      Math.round((activity.percentagesplit * totalDevEffortStoryPoints) / 100) * hoursPerStoryPoint
    ]);
    const activitiesSheet = XLSX.utils.aoa_to_sheet([
      ['Activities', 'Effort in story points/(person days)', 'Total effort in hrs'],
      ...activitiesData,
      ['Total', totalSecondColumn, totalThirdColumn]
    ]);
    XLSX.utils.book_append_sheet(workbook, activitiesSheet, 'Activities');
    XLSX.writeFile(workbook, 'estimate_summary.xlsx');
  };

  const handleSendByEmail = () => {
    handleDownload();
    const emailClientLink = 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new';
    window.open(emailClientLink, '_blank');
  };

  // Calculate the total for the third column of the "Activities" table
  const totalThirdColumn = totalSecondColumn * hoursPerStoryPoint;
  const lightButton = (
    <div>
      <Button
        variant="contained"
        className="tab-btn"
        onClick={handleEstimateSummary}
        style={{ backgroundColor: estimateSummary ? 'rgb(203 187 235)' : '#ede7f6' }}
      >
        Estimate Summary
      </Button>
      <Button
        className="tab-btn"
        variant="contained"
        onClick={handleModularComponents}
        style={{
          backgroundColor: modularComponents ? 'rgb(203 187 235)' : '#ede7f6'
        }}
      >
        Modular Components
      </Button>
    </div>
  );
  const darkButton = (
    <div>
      <Button
        variant="contained"
        className="themes-btn"
        onClick={handleEstimateSummary}
        style={{ backgroundColor: estimateSummary ? theme.palette.common.title2 : '' }}
      >
        Estimate Summary
      </Button>
      <Button
        variant="contained"
        className="themes-btn"
        onClick={handleModularComponents}
        style={{
          backgroundColor: estimateSummary ? theme.palette.common.title2 : ''
        }}
      >
        Modular Components
      </Button>
    </div>
  );
  const conditionThemeBtns = themeMode === 'dark' ? darkButton : lightButton;
  return (
    <MainCard style={{ height: '100%' }} className="" title="Estimate Summary">
      <Box display="flex" mb={3} justifyContent="end" gap="10px">
        <Button variant="contained" className="primary-btn" onClick={handleSendByEmail}>
          Send by Email
          <EmailIcon />
        </Button>
        <Button variant="contained" className="primary-btn" onClick={handleDownload}>
          Download
          <ArrowCircleDownIcon />
        </Button>
        <Button variant="contained" className="primary-btn" onClick={handleCreateNew}>
          New
          <AddCircleOutlineIcon />
        </Button>
      </Box>
      <Box display="flex" padding="0px 25px">
        {conditionThemeBtns}
      </Box>
      {sendByEmail && <p>Send by Email functionality is displayed</p>}
      {download && <p>Download functionality is displayed</p>}
      {createNew && <p>New functionality is displayed</p>}
      {estimateSummary && (
        <Box padding="0px 25px">
          <Typography variant="h3" style={{ margin: '25px 0px' }}>
            {' '}
            Estimate Summary
          </Typography>

          <SubCard style={{ maxWidth: '630px' }}>
            <TableContainer
              style={{ background: themeMode === 'dark' ? theme.palette.darkbg.blue2 : '', padding: themeMode === 'dark' ? '15px' : '0px' }}
              component={Paper}
            >
              <Table className="work-item-table">
                <TableBody>
                  <TableRow className="workitem-tab table-rows">
                    <TableCell style={{ padding: '0px' }} className={themeMode === 'dark' ? 'theme-border' : 'border-none'}>
                      Project Name
                    </TableCell>
                    <TableCell className="border-none" style={{ padding: '5px 0px' }}>
                      <input className={themeMode === 'dark' ? 'theme-input' : 'fader-input'} type="text" value={projectName} readOnly />
                    </TableCell>
                  </TableRow>
                  <TableRow className="workitem-tab table-rows">
                    <TableCell style={{ padding: '0px' }} className={themeMode === 'dark' ? 'theme-border' : 'border-none'}>
                      Estimated By
                    </TableCell>
                    <TableCell className={themeMode === 'dark' ? 'theme-border' : 'border-none'} style={{ padding: '5px 0px' }}>
                      <input className={themeMode === 'dark' ? 'theme-input' : 'fader-input'} type="text" value={estimatedBy} readOnly />
                    </TableCell>
                  </TableRow>
                  <TableRow className="workitem-tab table-rows">
                    <TableCell style={{ padding: '0px' }} className={themeMode === 'dark' ? 'theme-border' : 'border-none'}>
                      Estimated On
                    </TableCell>
                    <TableCell className={themeMode === 'dark' ? 'theme-border' : 'border-none'} style={{ padding: '5px 0px' }}>
                      <input
                        className={themeMode === 'dark' ? 'theme-input' : 'fader-input'}
                        type="text"
                        value={dayjs(estimatedOn).locale('en').format('DD-MM-YYYY')}
                        readOnly
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow className="workitem-tab table-rows">
                    <TableCell style={{ padding: '0px' }} className={themeMode === 'dark' ? 'theme-border' : 'border-none'}>
                      Version
                    </TableCell>
                    <TableCell className={themeMode === 'dark' ? 'theme-border' : 'border-none'} style={{ padding: '5px 0px' }}>
                      <input className={themeMode === 'dark' ? 'theme-input' : 'fader-input'} type="text" value={version} readOnly />
                    </TableCell>
                  </TableRow>
                  <TableRow className="workitem-tab table-rows">
                    <TableCell style={{ padding: '0px' }} className={themeMode === 'dark' ? 'theme-border' : 'border-none'}>
                      Document Version
                    </TableCell>
                    <TableCell className={themeMode === 'dark' ? 'theme-border' : 'border-none'} style={{ padding: '5px 0px' }}>
                      <input
                        className={themeMode === 'dark' ? 'theme-input' : 'fader-input'}
                        type="number"
                        value={documentVersion}
                        readOnly
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow className="workitem-tab table-rows">
                    <TableCell style={{ padding: '0px' }} className={themeMode === 'dark' ? 'theme-border' : 'border-none'}>
                      Hours per Story Point
                    </TableCell>
                    <TableCell className={themeMode === 'dark' ? 'theme-border' : 'border-none'} style={{ padding: '5px 0px' }}>
                      <input
                        className={themeMode === 'dark' ? 'theme-input' : 'fader-input'}
                        type="number"
                        value={hoursPerStoryPoint}
                        readOnly
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow className="workitem-tab table-rows">
                    <TableCell style={{ padding: '0px' }} className={themeMode === 'dark' ? 'theme-border' : 'border-none'}>
                      Rate per Hour
                    </TableCell>
                    <TableCell className={themeMode === 'dark' ? 'theme-border' : 'border-none'} style={{ padding: '5px 0px' }}>
                      <input className={themeMode === 'dark' ? 'theme-input' : 'fader-input'} type="number" value={ratePerHour} readOnly />
                    </TableCell>
                  </TableRow>
                  <TableRow className="workitem-tab table-rows">
                    <TableCell style={{ padding: '0px' }} className={themeMode === 'dark' ? 'theme-border' : 'border-none'}>
                      Overall Costing
                    </TableCell>
                    <TableCell className={themeMode === 'dark' ? 'theme-border' : 'border-none'} style={{ padding: '5px 0px' }}>
                      <input
                        className={themeMode === 'dark' ? 'theme-input' : 'fader-input'}
                        type="text"
                        value={`$${overallCosting}`}
                        readOnly
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow className="workitem-tab table-rows">
                    <TableCell style={{ padding: '0px' }} className={themeMode === 'dark' ? 'theme-border' : 'border-none'}>
                      Total Dev Effort (in Hours)
                    </TableCell>
                    <TableCell className={themeMode === 'dark' ? 'theme-border' : 'border-none'} style={{ padding: '5px 0px' }}>
                      <input
                        className={themeMode === 'dark' ? 'theme-input' : 'fader-input'}
                        type="number"
                        value={totalDevEffortHours}
                        readOnly
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow className="workitem-tab table-rows">
                    <TableCell style={{ padding: '0px' }} className={themeMode === 'dark' ? 'theme-border' : 'border-none'}>
                      Total Dev Effort (in Story Points)
                    </TableCell>
                    <TableCell className={themeMode === 'dark' ? 'theme-border' : 'border-none'} style={{ padding: '5px 0px' }}>
                      <input
                        className={themeMode === 'dark' ? 'theme-input' : 'fader-input'}
                        type="number"
                        value={totalDevEffortStoryPoints}
                        readOnly
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </SubCard>
          <Box className="activities-table" style={{ maxWidth: '800px' }}>
            <Typography variant="h3" style={{ margin: '20px 0px' }}>
              Activities
            </Typography>
            <TableContainer component={Paper}>
              <Table className="activities-Table">
                <TableHead className={themeMode === 'dark' ? 'theme-head' : 'activity-head'}>
                  <TableRow>
                    <TableCell style={{ width: '32%', padding: '9px 13px' }}>Activities</TableCell>
                    <TableCell style={{ width: '32%', textAlign: 'center' }}>Effort in story points/(person days)</TableCell>
                    <TableCell style={{ width: '32%', textAlign: 'center' }}>Total effort in hrs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activitiesLoadData.map((activity, index) => (
                    <TableRow style={{ background: themeMode === 'dark' ? 'rgb(70 80 92)' : '' }} key={index}>
                      <TableCell
                        style={{
                          color:themeMode === 'dark' ? '#fff' : '' ,
                          padding: '9px'
                        }}
                      >
                        {activity.activity}
                      </TableCell>
                      <TableCell style={{color:themeMode === 'dark' ? '#fff' : '' , textAlign: 'center', padding: '9px' }}>
                        {Math.round((activity.percentagesplit * totalDevEffortStoryPoints) / 100)}
                      </TableCell>
                      <TableCell style={{color:themeMode === 'dark' ? '#fff' : '' , textAlign: 'center', padding: '9px' }}>
                        {Math.round((activity.percentagesplit * totalDevEffortStoryPoints) / 100) * hoursPerStoryPoint}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className={themeMode === 'dark' ? 'theme-total' : 'total-box'}>
                    <TableCell className="tot-para">Total</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{totalSecondColumn}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{totalThirdColumn}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
      {modularComponents && (
        <Box className="work-item-container" style={{ marginLeft: '25px' }}>
          <Typography variant="h3" style={{ margin: '25px 0px' }}>
            Modular Components
          </Typography>
          <TableContainer
            style={{
              backgroundColor: themeMode === 'dark' ? theme.palette.darkbg.blue1 : theme.palette.background.paper
            }}
            className="work-item-container"
            component={Paper}
          >
            <Table>
              <TableHead style={{ backgroundColor: themeMode === 'dark' ? theme.palette.common.subtitle : theme.palette.common.light2 }}>
                <TableRow className="">
                  <TableCell className="workitem-data">S.No</TableCell>
                  <TableCell className="workitem-data">Module</TableCell>
                  <TableCell className="workitem-data">User Type</TableCell>
                  <TableCell className="workitem-data">App Type</TableCell>
                  <TableCell className="workitem-data">Component Name</TableCell>
                  <TableCell className="workitem-data">Comments</TableCell>
                  <TableCell className="workitem-data">Description</TableCell>
                  <TableCell className="workitem-data">Component Type</TableCell>
                  <TableCell className="workitem-data">Complexity</TableCell>
                  <TableCell className="workitem-data">Build Effort (in Days)</TableCell>
                  <TableCell className="workitem-data">Effort Override (in Days)</TableCell>
                  <TableCell className="workitem-data">Final Effort (in Days)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="workitem-tab">
                {tableData.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell className="workitem-data ">
                      <Typography variant="themevary">{index + 1}</Typography>{' '}
                    </TableCell>
                    <TableCell style={{ minWidth: '145px' }} className="workitem-data">
                      <Typography variant="themevary">{row.module}</Typography>{' '}
                    </TableCell>
                    <TableCell style={{ minWidth: '125px' }} className="workitem-data ">
                      <Typography variant="themevary">{row.userType}</Typography>
                    </TableCell>
                    <TableCell style={{ minWidth: '125px' }} className="workitem-data ">
                      <Typography variant="themevary">{row.appType}</Typography>
                    </TableCell>
                    <TableCell style={{ minWidth: '160px' }} className="workitem-data">
                      <Typography variant="themevary">{row.componentName}</Typography>
                    </TableCell>
                    <TableCell style={{ minWidth: '120px' }} className="workitem-data ">
                      <Typography variant="themevary">{row.comments}</Typography>
                    </TableCell>
                    <TableCell style={{ minWidth: '180px' }} className="workitem-data ">
                      {' '}
                      <Typography variant="themevary">{row.description}</Typography>
                    </TableCell>
                    <TableCell style={{ minWidth: '140px' }} className="workitem-data ">
                      <Typography variant="themevary">{row.componentType}</Typography>
                    </TableCell>
                    <TableCell style={{ minWidth: '100px' }} className="workitem-data ">
                      <Typography variant="themevary">{row.complexity}</Typography>
                    </TableCell>
                    <TableCell style={{ minWidth: '120px' }} className="workitem-data">
                      <Typography variant="themevary">{row.buildEffort}</Typography>
                    </TableCell>
                    <TableCell style={{ minWidth: '130px' }} className="workitem-data">
                      <Typography variant="themevary">{row.effortOverride}</Typography>
                    </TableCell>
                    <TableCell style={{ minWidth: '120px' }} className="workitem-data">
                      <Typography variant="themevary">{row.finalEffort}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </MainCard>
  );
};

export default EstimateSummary;
