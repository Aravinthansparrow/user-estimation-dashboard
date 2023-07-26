import React, { useState, useEffect } from 'react';
import { fetchActivities, addActivityAction,updateActivityAction,activitiesSelector, deleteActivityAction, setDeletedActivityId } from 'store/reducers/activityReducer';
import { useDispatch, useSelector } from 'react-redux';
import { API_STATUS } from "../../utils/constants";
const YourComponent = () => {
  const [data, setData] = useState([]);
  const [newActivity, setNewActivity] = useState('');
  const [newPercentage, setNewPercentage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editedActivity, setEditedActivity] = useState('');
  const [editedPercentage, setEditedPercentage] = useState('');
  const activitiesloading = useSelector(activitiesSelector).activitiesloading;
  const addActivityloading = useSelector(activitiesSelector).addActivityloading;
  const updateActivityloading = useSelector(activitiesSelector).updateActivityloading;
  const deleteActivityloading = useSelector(activitiesSelector).deleteActivityloading;
  const activitiesData = useSelector(activitiesSelector).loadData
  const addactivitiesData = useSelector(activitiesSelector).addloadData
  const deleteActivityId = useSelector(activitiesSelector).deletedActivityId
  // const updateactivitiesData = useSelector(activitiesSelector).editloadData
  
useEffect(()=>{console.log(data)}, [data])
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchActivities())
  }, [dispatch]);

  useEffect(() => {
    console.log(activitiesloading, "loading")
    if (activitiesloading === API_STATUS.FULFILLED) {
      
      console.log("activities data got Successfully!");
      setData(activitiesData)
     
     
   
    }
    if (activitiesloading === API_STATUS.REJECTED) {
      
      console.log('Activities data got failed');
      
    }
     
    
  
  }, [activitiesloading])

  useEffect(() =>  {
    console.log(addActivityloading, "loading")
    if (addActivityloading === API_STATUS.FULFILLED) {
      
      console.log("activities data added got Successfully!");
      setData([...data, addactivitiesData]);
      setNewActivity('');
      setNewPercentage('');
      setShowPopup(false);
     
     
   
    }
    if (addActivityloading === API_STATUS.REJECTED) {
      
      console.log('Activities data adding  got failed');
      
    }
     
    
  
  }, [addActivityloading])

  
  useEffect(() =>  {
    console.log(updateActivityloading, "loading")
    if (updateActivityloading === API_STATUS.FULFILLED) {
      
      console.log("activities data updated got Successfully!");
     
      const updatedItems = data.map(item =>
        item.id === selectedItemId
          ? { ...item, activity: editedActivity, percentagesplit: editedPercentage }
          : item
      );
      setData(updatedItems);
      setShowEditPopup(false);
     
   
    }
    if (updateActivityloading === API_STATUS.REJECTED) {
      
      console.log('Activities data updating  got failed');
      
    }},[updateActivityloading])


useEffect(() => {
    console.log(deleteActivityloading, "loading")
    if (deleteActivityloading === API_STATUS.FULFILLED) {
      console.log(deleteActivityId)
      console.log("activities data deleted got Successfully!");
      const filteredItems = data.filter(item => item.id !== deleteActivityId);
      console.log(filteredItems)
      setData(filteredItems);
    
   
    }
    if (deleteActivityloading === API_STATUS.REJECTED) {
      
      console.log('Activities data deleting  got failed');
      
    }
     
    
  
  }, [deleteActivityloading])

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3002/activity'); // Replace 'http://localhost:3002/activity' with your API endpoint for fetching data
  //     setData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const handleAdd = () => {
    dispatch(addActivityAction({
      activity: newActivity,
      percentagesplit: newPercentage,
    }))
  }
  // const handleAdd = async () => {
  //   try {
      // const response = await axios.post('http://localhost:3002/activity', {
      //   activity: newActivity,
      //   percentagesplit: newPercentage,
      // });
      // setData([...data, response.data]);
      // setNewActivity('');
      // setNewPercentage('');
      // setShowPopup(false);
  //   } catch (error) {
  //     console.error('Error adding data:', error);
  //   }
  // };

  const handleDelete = (id) => {
    dispatch(deleteActivityAction(id))
    dispatch(setDeletedActivityId(id))
  }

  // const handleDelete = (id) => {
  //   try {
  //     await axios.delete(`http://localhost:3002/activity/${id}`);
      // const filteredItems = data.filter(item => item.id !== id);
      // setData(filteredItems);
  //   } catch (error) {
  //     console.error('Error deleting data:', error);
  //   }
  // };

  const handleEditClick = (id, activity, percentage) => {
    setSelectedItemId(id);
    setEditedActivity(activity);
    setEditedPercentage(percentage);
    setShowEditPopup(true);
  };

  const handleEditSubmit = () => {
    dispatch(updateActivityAction({
      id : selectedItemId,
      activity: editedActivity,
      percentagesplit: editedPercentage,
    }))

  }

  // const handleEditSubmit = async () => {
  //   try {
      // await axios.put(`http://localhost:3002/activity/${selectedItemId}`, {
      //   activity: editedActivity,
      //   percentagesplit: editedPercentage,
      // });
      // const updatedItems = data.map(item =>
      //   item.id === selectedItemId
      //     ? { ...item, activity: editedActivity, percentagesplit: editedPercentage }
      //     : item
      // );
      // setData(updatedItems);
      // setShowEditPopup(false);
  //   } catch (error) {
  //     console.error('Error updating data:', error);
  //   }
  // };

  const calculateTotalPercentage = () => {
    const total = data.reduce((sum, item) => sum + parseFloat(item.percentagesplit), 0);
    return total.toFixed(2);
  };
  return (
    <div>
      <h2>Activities and Percentage Split</h2>
      <table>
        <thead>
          <tr>
            <th>Activities</th>
            <th>Percentage Split</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.activity}</td>
              <td>{item.percentagesplit}</td>
              <td>
                <button onClick={() => handleEditClick(item.id, item.activity, item.percentagesplit)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setShowPopup(true)}>Add</button>
      </div>
      {showPopup && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
          <h3>Add New Entry</h3>
          <div>
            <input type="text" placeholder="Activity" value={newActivity} onChange={e => setNewActivity(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="Percentage Split" value={newPercentage} onChange={e => setNewPercentage(e.target.value)} />
          </div>
          <div>
            <button onClick={handleAdd}>Submit</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
      {showEditPopup && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
          <h3>Edit Entry</h3>
          <div>
            <input type="text" placeholder="Activity" value={editedActivity} onChange={e => setEditedActivity(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="Percentage Split" value={editedPercentage} onChange={e => setEditedPercentage(e.target.value)} />
          </div>
          <div>
            <button onClick={handleEditSubmit}>Submit</button>
            <button onClick={() => setShowEditPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
        <div>
        <p>Total Percentage Split: {calculateTotalPercentage()}%</p>
      </div>
    </div>
  );
};

export default YourComponent;
