import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Link } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useSelector, useDispatch } from 'react-redux';
import {
  GetUsers,
  CreateUser,
  EditUser,
  DeleteUser,
} from '../store/userReducer';
// import { Dropdown } from 'primereact/dropdown';
export const RowTask = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const toast = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const [Edit, setEdit] = useState(false);
  const [id, setId] = useState();
  const [formData, setFormData] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedCity1, setSelectedCity1] = useState(null);
  const onCityChange = (e) => {
    setSelectedCity1(e.value);
    formik.values.name = e.value.name;
    formik.values.email = e.value.email;
    formik.values.Phone = e.value.Phone;
    formik.values.id = e.value.id;
    setEdit(true);

    setId(e.value.id);
  };
  useEffect(() => {
    dispatch(GetUsers());
  }, [users]);
  const deleteData = (id) => {
    dispatch(DeleteUser(id));
    toast.current.show({
      severity: 'success',
      summary: 'Success Message',
      detail: 'Datas are deleted successfully',
      life: 5000,
    });
    dispatch(GetUsers());
  };
  useEffect(() => {}, [users]);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      Phone: '',
      id: 0,
    },

    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = 'Name is required.';
      }

      if (!data.email) {
        errors.email = 'Email is required.';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = 'Invalid email address. E.g. example@email.com';
      }

      if (!data.Phone) {
        errors.Phone = 'Phone is required.';
      }

      return errors;
    },
    onSubmit: async (data, e) => {
      setFormData(data);

      products.push(data);
      setProducts(products);
      formik.resetForm();
      if (Edit == true) {
        let status = {
          id: data.id,
          status: data,
        };
        dispatch(EditUser(status));
        toast.current.show({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Datas are updated successfully',
          life: 3000,
        });
      } else {
        dispatch(CreateUser(data));
        setShowMessage(true);
        toast.current.show({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Datas are register successfully',
          life: 3000,
        });
      }

      await dispatch(GetUsers());
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="cursor-pointer">
          <i
            className="pi pi-trash mr-2"
            onClick={() => deleteData(rowData.id)}
          ></i>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div>
      <Toast ref={toast} position="top-center" />
      <div className="form-demo">
        <Dialog
          visible={showMessage}
          onHide={() => setShowMessage(false)}
          position="top"
          footer={dialogFooter}
          showHeader={false}
          breakpoints={{ '960px': '80vw' }}
          style={{ width: '30vw' }}
        >
          <div className="flex align-items-center flex-column pt-6 px-3">
            <i
              className="pi pi-check-circle"
              style={{ fontSize: '5rem', color: 'var(--green-500)' }}
            ></i>
            <h5>Registration Successful!</h5>
            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
              Your account is registered under name <b>{formData.name}</b> ;
              it'll be valid next 30 days without activation. Please check{' '}
              <b>{formData.email}</b> for activation instructions.
            </p>
          </div>
        </Dialog>
        <div>
          <div className="flex justify-content-end mr-4 mt-3">
            {' '}
            <Link to="/addfields">
              <i className="pi pi-arrow-right" style={{ fontSize: '20px' }} />
            </Link>
          </div>
          <div className="flex justify-content-center">
            <div className="card">
              <h5 className="text-center">Register</h5>
              <form onSubmit={formik.handleSubmit} className="p-fluid">
                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-user" />
                    <InputText
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      autoFocus
                      className={classNames({
                        'p-invalid': isFormFieldValid('name'),
                      })}
                    />
                    <label
                      htmlFor="name"
                      className={classNames({
                        'p-error': isFormFieldValid('name'),
                      })}
                    >
                      Name*
                    </label>
                  </span>
                  {getFormErrorMessage('name')}
                </div>
                <div className="field mt-4">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <InputText
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className={classNames({
                        'p-invalid': isFormFieldValid('email'),
                      })}
                    />
                    <label
                      htmlFor="email"
                      className={classNames({
                        'p-error': isFormFieldValid('email'),
                      })}
                    >
                      Email*
                    </label>
                  </span>
                  {getFormErrorMessage('email')}
                </div>
                <div className="field mt-4">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-phone" />
                    <InputText
                      id="Phone"
                      type={Number}
                      name="Phone"
                      value={formik.values.Phone}
                      onChange={formik.handleChange}
                      toggleMask
                      className={classNames({
                        'p-invalid': isFormFieldValid('Phone'),
                      })}
                    />
                    <label
                      htmlFor="Phone"
                      className={classNames({
                        'p-error': isFormFieldValid('Phone'),
                      })}
                    >
                      Phone*
                    </label>
                  </span>
                  {getFormErrorMessage('Phone')}
                </div>

                <Button type="submit" label="Submit" className="mt-2" />
              </form>
            </div>
          </div>
        </div>
        <div className="card mt-3">
          {users.length == 0 ? (
            <Dropdown style={{ width: '19%' }} disabled placeholder="Edit" />
          ) : (
            <div className="mt-4">
              <Dropdown
                value={selectedCity1}
                options={users}
                style={{ width: '19%' }}
                onChange={onCityChange}
                optionLabel="name"
                placeholder="Edit"
              />
            </div>
          )}
          <div className="mt-3">
            <DataTable value={users} showGridlines responsiveLayout="scroll">
              <Column field="name" header="Name"></Column>
              <Column field="email" header="Email"></Column>
              <Column field="Phone" header="Phone Number"></Column>
              <Column body={countryBodyTemplate} header=""></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RowTask;
