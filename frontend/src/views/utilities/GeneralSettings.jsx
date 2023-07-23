import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGeneralSettings, updateGeneralSettings } from '../../store/reducers/generalReducer';
import { API_STATUS } from '../../utils/constants';

const GeneralSettings = () => {
  const [modal, setModal] = useState(false);
  const [tempValues, setTempValues] = useState({});

  const generalSettings = useSelector((state) => state.generalSetting.data);
  const generalSettingsStatus = useSelector((state) => state.generalSetting.status);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch general settings data if it's still pending
    if (generalSettingsStatus === API_STATUS.PENDING) {
      dispatch(fetchGeneralSettings());
    }else if (generalSettingsStatus === API_STATUS.REJECTED) {
      // If the API call to fetch general settings fails, you can handle the error here
      console.log('General settings data fetch failed');
    }
  }, [dispatch, generalSettingsStatus,generalSettingsStatus]);
  

  useEffect(() => {
    // Update the tempValues state whenever generalSettings is updated
    setTempValues(generalSettings);
  }, [generalSettings]);

  const handleUpdate = () => {
    setModal(true);
    setTempValues(generalSettings);
  };

  const handleClose = () => {
    setModal(false);
    setTempValues({});
  };

  const handleChange = (e) => {
    setTempValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedValues = { ...tempValues };
    console.log(updatedValues);
    try {
      const response = await dispatch(updateGeneralSettings(updatedValues));

      if (response.meta.requestStatus === 'fulfilled') {
        setModal(false);
      }
    } catch (error) {
      console.error('Error updating general settings:', error);
    }
  };

  return (
    <div className="table-overall">
      <h2 className="estimate-head">General Settings</h2>
      <table className="work-item-table">
        <tbody>
          <tr className="workitem-tab">
            <td>
              <p>Version</p>
            </td>
            <td>
              <input name="version" value={generalSettings.version || ''} readOnly />
            </td>
          </tr>
          <tr className="workitem-tab">
            <td>
              <p>Document Version</p>
            </td>
            <td>
              <input name="document_version" value={generalSettings.document_version || ''} readOnly />
            </td>
          </tr>
          <tr className="workitem-tab">
            <td>
              <p>Hours per Story Point</p>
            </td>
            <td>
              <input name="hours_per_story_point" value={generalSettings.hours_per_story_point || ''} readOnly />
            </td>
          </tr>
          <tr className="workitem-tab">
            <td>
              <p>Rate per Hour</p>
            </td>
            <td>
              <input name="rate_per_hour" value={generalSettings.rate_per_hour || ''} readOnly />
            </td>
          </tr>
        </tbody>
      </table>
      <button className="buttonBox" onClick={handleUpdate}>
        Update
      </button>

      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="estimate-head">Update General Settings</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <p style={{ color: 'white' }}>Version:</p>
                <input style={{ marginTop: '10px' }} name="version" value={tempValues.version || ''} onChange={handleChange} />
              </div>
              <div>
                <p style={{ color: 'white' }}>Document Version:</p>
                <input
                  style={{ marginTop: '10px' }}
                  name="document_version"
                  value={tempValues.document_version || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p style={{ color: 'white' }}>Hours per Story Point:</p>
                <input
                  style={{ marginTop: '10px' }}
                  name="hours_per_story_point"
                  value={tempValues.hours_per_story_point || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p style={{ color: 'white' }}>Rate per Hour:</p>
                <input style={{ marginTop: '10px' }} name="rate_per_hour" value={tempValues.rate_per_hour || ''} onChange={handleChange} />
              </div>
              <div className="modal-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralSettings;
