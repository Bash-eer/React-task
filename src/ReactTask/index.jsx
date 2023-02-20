import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import '../RowTask/RowTask.css';
import { Link } from 'react-router-dom';

export const ReactTask = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const [defaultValues, setdefaultValues] = useState([
    {
      name: '',
      email: '',
      number: '',
      pan: '',
    },
  ]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setFormData(data);
    setShowMessage(true);

    reset();
  };
  //     let handleChange = (i, e) => {
  //      let newFormValues = [...defaultValues];
  //      newFormValues[i][e.target.name] = e.target.value;
  //      setdefaultValues(newFormValues);
  //   }
  let addFormFields = () => {
    setdefaultValues([...defaultValues, { name: '', email: '', number: '' }]);
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
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
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
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
        <div className="flex justify-content-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: '5rem', color: 'var(--green-500)' }}
          ></i>
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
            Your account is registered under name <b>{formData.name}</b> ; it'll
            be valid next 30 days without activation. Please check{' '}
            <b>{formData.email}</b> for activation instructions.
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-start ml-4 mt-3">
        {' '}
        <Link to="/">
          <i className="pi pi-arrow-left" style={{ fontSize: '20px' }} />
        </Link>
      </div>
      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Register</h5>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            {defaultValues.map((element, index) => (
              <div key={index} className="p-fluid FormStyle">
                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: 'Name is required.' }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          autoFocus
                          className={classNames({
                            'p-invalid': fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor="name"
                      className={classNames({ 'p-error': errors.name })}
                    >
                      Name*
                    </label>
                  </span>
                  {getFormErrorMessage('name')}
                </div>
                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: 'Email is required.',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message:
                            'Invalid email address. E.g. example@email.com',
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          className={classNames({
                            'p-invalid': fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor="email"
                      className={classNames({ 'p-error': !!errors.email })}
                    >
                      Email*
                    </label>
                  </span>
                  {getFormErrorMessage('email')}
                </div>
                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="number"
                      control={control}
                      rules={{ required: 'Phone Number is required.' }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.number}
                          {...field}
                          autoFocus
                          className={classNames({
                            'p-invalid': fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor="number"
                      className={classNames({ 'p-error': errors.number })}
                    >
                      Phone Number*
                    </label>
                  </span>
                  {getFormErrorMessage('number')}
                </div>
                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="pan"
                      control={control}
                      rules={{ required: 'Pan is required.' }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.pan}
                          {...field}
                          autoFocus
                          className={classNames({
                            'p-invalid': fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor="pan"
                      className={classNames({ 'p-error': errors.pan })}
                    >
                      Pan*
                    </label>
                  </span>
                  {getFormErrorMessage('pan')}
                </div>
                <Button
                  label="Add Field"
                  onClick={() => addFormFields()}
                  style={{ width: '65%', height: '51px' }}
                ></Button>
              </div>
            ))}

            <Button
              type="submit"
              label="Submit"
              className="mt-2"
              style={{ width: '22%', height: '51px' }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default ReactTask;
