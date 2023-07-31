import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  fetchComponents,
  addComponents,
  deleteComponents,
  componentSelector,
  setDeletedComponentIndex,
  updatingComponentName
} from '../../store/reducers/componentReducer';
import { Box, Typography, DialogActions, Button, TextField } from '@mui/material';
import { API_STATUS } from '../../utils/constants';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

const ComponentType = () => {
  const [components, setComponents] = useState([]);
  const [newComponent, setNewComponent] = useState('');
  const [newComponentModalIsOpen, setNewComponentModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);
  const [updatedComponentName, setUpdatedComponentName] = useState('');
  const [defaultComponent, setDefaultComponent] = useState(null);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [confirmComponentIndex, setConfirmComponentIndex] = useState(null);
  const componentloading = useSelector(componentSelector).componentloading;
  const addcomponentloading = useSelector(componentSelector).addcomponentloading;
  const deletecomponentloading = useSelector(componentSelector).deletecomponentloading;
  const updatecomponentnameloading = useSelector(componentSelector).updatecomponentnameloading;
  const deletedComponentIndex = useSelector(componentSelector).deletedComponentIndex;
  const componentData = useSelector(componentSelector).loadData;
  const addComponentData = useSelector(componentSelector).addcomponentloadData;
  const updatecomponentnameData = useSelector(componentSelector).updatecomponentnameloadData;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchComponents());
  }, [dispatch]);

  useEffect(() => {
    console.log(components); // Log the updated components array after state update
  }, [components]);

  useEffect(() => {
    console.log(componentloading, 'loading');
    if (componentloading === API_STATUS.FULFILLED) {
      console.log('Component data got Successfully!');

      setComponents(componentData);

      const defaultComponentIndex = componentData.findIndex((component) => component.default === 'default');
      setDefaultComponent(defaultComponentIndex);
    }
    if (componentloading === API_STATUS.REJECTED) {
      console.log('Component data got failed');
    }
  }, [componentloading]);

  useEffect(() => {
    console.log(addcomponentloading, 'add component loading');
    console.log(components);
    if (addcomponentloading === API_STATUS.FULFILLED) {
      console.log('Component added got Successfully!');
      const newComponentObj = addComponentData;
      console.log(newComponentObj);
      setComponents([...components, newComponentObj]);
      console.log(components);
      setNewComponent('');
      setNewComponentModalIsOpen(false);
      if (newComponentObj.isDefault) {
        setDefaultComponent(components.length);
      }
      console.log(components);
    }

    if (addcomponentloading === API_STATUS.REJECTED) {
      console.log('Component data got failed');
    }
  }, [addcomponentloading]);

  useEffect(() => {
    console.log(updatecomponentnameloading, 'update component name loading');
    console.log(components);
    if (updatecomponentnameloading === API_STATUS.FULFILLED) {
      const updatedComponents = [...components];

      updatedComponents[selectedComponentIndex] = updatecomponentnameData;
      setComponents(updatedComponents);
      console.log(updatecomponentnameData);
      if (updatecomponentnameData.default === 'default') {
        setDefaultComponent(confirmComponentIndex);
      }
      console.log(defaultComponent);
      closeEditModal();
    }

    if (updatecomponentnameloading === API_STATUS.REJECTED) {
      console.log('ComponentName update got failed');
    }
  }, [updatecomponentnameloading]);

  console.log(defaultComponent);
  useEffect(() => {
    console.log(deletecomponentloading, 'loading');
    if (deletecomponentloading === API_STATUS.FULFILLED && deletedComponentIndex !== null) {
      console.log('Component deleted Successfully!');
      const updatedComponents = [...components];
      updatedComponents.splice(deletedComponentIndex, 1); // Use the deletedComponentIndex to remove the deleted component
      setComponents(updatedComponents);
      if (deletedComponentIndex === defaultComponent) {
        setDefaultComponent(null);
      }
    }
    if (deletecomponentloading === API_STATUS.REJECTED) {
      console.log('Component not deleted');
    }
  }, [deletecomponentloading]);

  const addComponent = () => {
    if (newComponent.trimEnd() !== '') {
      dispatch(
        addComponents({
          name: newComponent,
          isDefault: defaultComponent === null || components.length === 0
        })
      );
    }
  };

  const updateComponentName = () => {
    if (selectedComponentIndex !== null && updatedComponentName.trim() !== '') {
      const componentToUpdate = components[selectedComponentIndex];
      console.log(componentToUpdate);
      const updatedComponent = {
        ...componentToUpdate,
        name: updatedComponentName.trim(),
        isDefault: componentToUpdate.isDefault || selectedComponentIndex === defaultComponent
      };
      console.log(updatedComponent);
      dispatch(
        updatingComponentName({
          id: componentToUpdate.id,
          name: updatedComponentName.trim(),
          isDefault: componentToUpdate.isDefault || selectedComponentIndex === defaultComponent
        })
      );
    }
  };

  const handleConfirmDefault = () => {
    const componentToUpdate = components[confirmComponentIndex];
    const updatedComponent = {
      ...componentToUpdate,
      isDefault: true
    };
    console.log(updatedComponent);
    dispatch(
      updatingComponentName({
        id: componentToUpdate.id,
        name: componentToUpdate.name,
        isDefault: true
      })
    );
    setConfirmModalIsOpen(false);
  };
  const deleteComponent = (index) => {
    const componentToDelete = components[index];
    const componentName = componentToDelete.name;
    const id = componentToDelete.id;
    console.log(id);
    dispatch(setDeletedComponentIndex(index));
    dispatch(deleteComponents(id));

    // Show toast message when the component is deleted
    toast.success(`${componentName} component successfully deleted!`, { autoClose: 4000 });
  };
  const handleAddComponent = () => {
    setNewComponentModalIsOpen(true);
  };

  const handleEditComponentName = () => {
    updateComponentName();
  };

  const openEditModal = (index) => {
    setSelectedComponentIndex(index);
    setUpdatedComponentName(components[index].name);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setSelectedComponentIndex(null);
    setUpdatedComponentName('');
  };

  const handleSetDefault = (index) => {
    setConfirmComponentIndex(index);
    setConfirmModalIsOpen(true);
  };

  const handleCancelConfirm = () => {
    setConfirmComponentIndex(null);
    setConfirmModalIsOpen(false);
  };

  return (
    <MainCard style={{ height: '100%' }} title="Component Type">
      <Box display="flex" mb={3} justifyContent="center">
        <Button variant="outlined" className="component-title" onClick={handleAddComponent}>
          Add Component
          <AddCircleOutlineIcon />
        </Button>
      </Box>
      <SubCard style={{maxWidth:'700px',margin:'auto'}}>
        {components.map((component, index) => (
          <Box
            display="flex"
            justifyContent="space-between"
            mb={1}
            key={index}
            alignItems="center"
            className={`component ${defaultComponent === index ? 'default' : ''}`}
          >
            <Typography variant="body1">{component.name}</Typography>
            <Box display="flex" gap="12px">
              {defaultComponent === index ? (
                <Button variant="body1" className="default-badge">
                  Default
                </Button>
              ) : (
                <Button variant="body1" className="default-button" onClick={() => handleSetDefault(index)}>
                  Set as Default
                </Button>
              )}

              <Button className=" view-btn" onClick={() => openEditModal(index)}>
                <EditIcon sx={{ color: 'black' }} />
              </Button>
              <Button className=" view-btn" onClick={() => deleteComponent(index)}>
                <DeleteIcon sx={{ color: 'black' }} />
              </Button>
            </Box>
          </Box>
        ))}
      </SubCard>

      {/* Add New Component Modal */}
      <Modal
        isOpen={newComponentModalIsOpen}
        onRequestClose={() => setNewComponentModalIsOpen(false)}
        contentLabel="Add New Component"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <DialogActions className="modal-content flex-column">
          <Typography variant="h3">Add New Component</Typography>
          <TextField type="text" style={{ minWidth: '270px' }} value={newComponent} onChange={(e) => setNewComponent(e.target.value)} />
          <Box display="flex" justifyContent="space-between" alignSelf="end" gap="8px">
            <Button variant="contained" className="primary-btn" onClick={addComponent}>
              Add
            </Button>
            <Button variant="contained" className="primary-btn" onClick={() => setNewComponentModalIsOpen(false)}>
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Modal>

      {/* Edit Component Modal */}
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Component Name"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <DialogActions className="modal-content flex-column">
          <Typography variant="h3">Edit Component Name</Typography>
          <TextField
            type="text"
            style={{ minWidth: '270px' }}
            value={updatedComponentName}
            onChange={(e) => setUpdatedComponentName(e.target.value)}
          />
          <Box display="flex" justifyContent="space-between" alignSelf="end" gap="8px">
            <Button variant="contained" className="primary-btn" onClick={handleEditComponentName}>
              Save
            </Button>
            <Button variant="contained" className="primary-btn" onClick={closeEditModal}>
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Modal>

      {/* Set Default Confirmation Modal */}
      <Modal
        isOpen={confirmModalIsOpen}
        onRequestClose={handleCancelConfirm}
        contentLabel="Set Default Confirmation"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <DialogActions className="modal-content flex-column">
          <Typography variant="h3">Set as Default</Typography>
          <Typography variant="body1">Are you sure you want to set this component as the default?</Typography>
          <Box display="flex" justifyContent="space-between" alignSelf="end" gap="8px">
            <Button variant="contained" className="primary-btn" onClick={handleConfirmDefault}>
              Yes
            </Button>
            <Button variant="contained" className="primary-btn" onClick={handleCancelConfirm}>
              No
            </Button>
          </Box>
        </DialogActions>
      </Modal>
    </MainCard>
  );
};

export default ComponentType;
