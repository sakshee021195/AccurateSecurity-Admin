import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { submitUserForm } from '../services/api';
import { generatePDF } from '../services/pdfService';
import logo from '../assets/Images/logo.png';
import './userForm.css';  // Import the external CSS file
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // If you're using tables (optional)
import axios from 'axios';


const initialValues = {
    date: '',
    unitName: '',
    designation: '',
    fullName: '',
    motherName: '',
    fatherName: '',
    presentAddress: '',
    presentAddressLine2: '',
    presentPoliceStation: '',
    permanentAddress: '',
    permanentAddressLine2: '',
    permanentPoliceStation: '',
    mobile1: '',
    mobile2: '',
    height: '',
    weight: '',
    chest: '',
    education: '',
    idMark: '',
    dob: '',
    age: '',
    maritalStatus: '',
    aadharNo: '',
    voterId: '',
    bankName: '',
    bankAccountNo: '',
    ifscCode: '',
    uan: '',
    esic: '',
    prevCompany: '',
    prevDesignation: '',
    fromDate: '',
    toDate: '',
    spouseName: '',
    spouseDob: '',
    child1: '',
    child2: '',
    emergencyContactName: '',
    emergencyContactMobile: ''
};

const validationSchema = Yup.object({
    // fullName: Yup.string().required('Full name is required'),
    // mobile1: Yup.string().matches(/^[0-9]{10}$/, 'Enter valid 10-digit number'),
    // dob: Yup.date().required('Date of birth is required'),
    // aadharNo: Yup.string().required('Aadhar number is required'),
    // bankAccountNo: Yup.string().required('Bank account number is required'),
    // ifscCode: Yup.string().required('IFSC code is required')
});

const UserForm = () => {
    const [message, setMessage] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log("Form submitted with values:", values);
        console.log("Uploaded photo (base64):", photo);

        try {
            const payload = {
                ...values,
                photo: photo // include photo only if necessary
            };

            const response = await axios.post('http://localhost:5000/api/form/submit', payload);
            console.log('Server Response:', response.data);

            setMessage('Form submitted successfully!');
            resetForm();
            setPhoto(null); // Optional: clear photo after submit

        } catch (err) {
            console.error('Error submitting form:', err);
            setMessage('Form submission failed.');
        } finally {
            setSubmitting(false);
        }
    };



    return (
        <div className="main container-fluid px-5">
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 px-4 mb-5">
                <div className="container-fluid">
                    {/* Logo on the left */}
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img src={logo} alt="Logo" style={{ height: '100px', width: 'auto' }} className="me-3"/>
                    </a>
                    {/* Centered Text Section */}
                    <div className="mx-auto text-center">
                        <h5 className="mb-1 fw-bold text-uppercase">ACCURATE SECURITY & ALLIED SERVICES</h5>
                        <h6 className="mb-1 text-uppercase">ENROLMENT FORM</h6>
                        <p className="mb-0 small">
                            47, CITY CENTRE, NR. SWASTIK CROSS ROAD, C.G. ROAD, NAVRANGPURA, AHMEDABAD – 380009<br />
                            MOB: 8160880528, EMAIL: <a href="mailto:accurate.adi@gmail.com">accurate.adi@gmail.com</a>,
                            WEBSITE: <a href="http://www.accuratesecurity.in" target="_blank" rel="noreferrer">www.accuratesecurity.in</a>
                        </p>
                    </div>
                </div>
            </nav>
            {message && <div className="alert alert-info">{message}</div>}
            <Formik initialValues={initialValues}  validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, isSubmitting }) => (
                    <Form>
                        <div className="form-section" style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
                            {/* Left Side: Fields */}
                            <div className="form-left">
                                <div className="mb-3 row">
                                    <label className="col-sm-4 col-form-label">Date:</label>
                                    <div className="col-sm-8">
                                        <Field name="date" type="date" className="form-control" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-4 col-form-label">Name of Unit:</label>
                                    <div className="col-sm-8">
                                        <Field name="unitName" className="form-control" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-4 col-form-label">Designation Applied For:</label>
                                    <div className="col-sm-8">
                                        <Field name="designation" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            {/* Right Side: Photo Upload (adjust as needed) */}
                            <div className="form-right">
                                <label className="form-label">Passport Photo</label>
                                <Field name="photo">
                                    {({ field, form }) => (
                                        <>
                                            {photo ? (
                                                <div className="photo-preview">
                                                    <img src={photo} alt="Preview" className="photo-thumbnail"/>
                                                    <button type="button" onClick={() => {form.setFieldValue('photo', null); setPhoto(null);}}  className="remove-photo-btn">×</button>
                                                </div>
                                            ) : (
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(event) => {
                                                        const file = event.currentTarget.files[0];
                                                        form.setFieldValue('photo', file);
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setPhoto(reader.result);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }}
                                                    className="form-control"
                                                />
                                            )}
                                        </>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="form-fields">
                            <h4 className="personalDetail">PERSONNEL DETAILS</h4>
                            <div className="form-group d-flex">
                                <label className="col-sm-1 col-form-label">Full Name:</label>
                                <Field name="fullName" className="form-control" />
                                <ErrorMessage name="fullName" component="div" className="text-danger" />
                            </div>

                            {/* mother and father fields */}
                            <div className="form-group d-flex gap-3">
                                <label className="col-sm-1 col-form-label">Mother's Name:</label>
                                <Field name="motherName" className="form-control" />
                                <label className="col-sm-1 col-form-label" htmlFor="fatherName">Father's Name:</label>
                                <Field name="fatherName" className="form-control" />
                            </div>

                            {/* present and permanent fields */}
                            <div className="form-group mb-4 ">
                                <label>Present Address:</label>
                                <Field name="presentAddress" className="form-control mb-2" placeholder="Enter Present Address" />

                                <div className="d-flex align-items-center gap-2">
                                    <Field name="presentAddressLine2" className="form-control" placeholder="Additional Address Details" />
                                    <label className="col-sm-1 col-form-label">Police Station:</label>
                                    <Field name="presentPoliceStation" className="form-control" placeholder="Police Station" />
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <label>Permanent Address:</label>
                                <Field name="permanentAddress" className="form-control mb-2" placeholder="Enter Permanent Address" />

                                <div className="d-flex align-items-center gap-2">
                                    <Field name="permanentAddressLine2" className="form-control" placeholder="Additional Address Details" />
                                    <label className="col-sm-1 col-form-label">Police Station:</label>
                                    <Field name="permanentPoliceStation" className="form-control" placeholder="Police Station" />
                                </div>
                            </div>

                            {/* present and permanent fields */}


                            <div className="form-group d-flex align-items-center gap-2 mb-4">
                                <label className="col-sm-1 col-form-label">Mobile No.:</label>
                                <Field
                                    name="mobile1"
                                    className="form-control"
                                    placeholder="Mobile No. (1)"
                                />
                                <Field
                                    name="mobile2"
                                    className="form-control"
                                    placeholder="Mobile No. (2)"
                                />
                            </div>

                            {/* height and weight fields */}

                            <div className="form-group d-flex gap-3 mb-4">
                                <label className="col-form-label">Height:</label>
                                <Field
                                    name="height"
                                    type="number"
                                    className="form-control"
                                    placeholder="Height"
                                />
                                <label className="col-form-label">Weight:</label>
                                <Field
                                    name="weight"
                                    type="number"
                                    className="form-control"
                                    placeholder="Weight"
                                />
                                <label className=" col-form-label">Chest:</label>
                                <Field
                                    name="chest"
                                    type="number"
                                    className="form-control"
                                    placeholder="Chest"
                                />
                            </div>

                            <div className="form-group d-flex gap-3 mb-4">
                                <label className="col-sm-2 col-form-label">Education Qualification:</label>
                                <Field
                                    name="education"
                                    className="form-control"
                                    placeholder="Education Qualification"
                                />
                                <label className="col-sm-2  col-form-label">Identification Mark:</label>
                                <Field
                                    name="idMark"
                                    className="form-control"
                                    placeholder="Identification Mark"
                                />
                            </div>

                            <div className="form-group d-flex gap-3 mb-4">
                                <label className="col-sm-1 col-form-label">Date of Birth:</label>
                                <Field
                                    name="dob"
                                    type="date"
                                    className="form-control"
                                />
                                <label className="col-sm-1 col-form-label">Age as on Date:</label>
                                <Field
                                    name="age"
                                    type="number"
                                    className="form-control"
                                    placeholder="Age"
                                />
                                <label className="col-sm-1 col-form-label">Marital Status:</label>
                                <Field
                                    name="maritalStatus"
                                    className="form-control"
                                    placeholder="Marital Status"
                                />
                            </div>

                            <div className="form-group d-flex gap-3 mb-4">
                                <label className="col-sm-1 col-form-label">Aadhar No.:</label>
                                <Field
                                    name="aadharNo"
                                    className="form-control"
                                    placeholder="Aadhar No."
                                />
                                <label className="col-sm-1 col-form-label">VoterID/DL No.:</label>
                                <Field
                                    name="voterId"
                                    className="form-control"
                                    placeholder="Voter ID / DL No."
                                />
                            </div>

                            <div className="form-group d-flex gap-3 mb-4">
                                <label className="col-sm-1 col-form-label">Name of Bank:</label>
                                <Field
                                    name="bankName"
                                    className="form-control"
                                    placeholder="Bank Name"
                                />
                                <label className="col-sm-1 col-form-label">Bank Acct No.:</label>
                                <Field
                                    name="bankAccountNo"
                                    className="form-control"
                                    placeholder="Bank Account No."
                                />
                            </div>

                            <div className="form-group d-flex gap-3 mb-4">
                                <label className="col-sm-1 col-form-label">IFSC Code:</label>
                                <Field
                                    name="ifscCode"
                                    className="form-control"
                                    placeholder="IFSC Code"
                                />
                            </div>



                            {/* previous service details */}


                            <div className="form-fields">
                                <h4 className="personalDetail">PREVIOUS SERVICES DETAILS</h4>



                                <div className="form-group d-flex align-items-center gap-3 mb-4">
                                    <label className="d-inline-block label-25">UAN No. (if any):</label>
                                    <Field
                                        name="uan"
                                        className="form-control"
                                        placeholder="UAN No."
                                    />
                                    <label className="col-form-label d-inline-block label-20">ESIC (IP) No.:</label>
                                    <Field
                                        name="esic"
                                        className="form-control"
                                        placeholder="ESIC (IP) No."
                                    />
                                </div>

                                <div className="form-group d-flex align-items-center gap-3 mb-4">
                                    <label className="d-inline-block label-30">Name of Company:</label>
                                    <Field
                                        name="prevCompany"
                                        className="form-control"
                                        placeholder="Name of Company"
                                    />
                                    <label className="col-sm-1 col-form-label">Designation:</label>
                                    <Field
                                        name="prevDesignation"
                                        className="form-control"
                                        placeholder="Designation"
                                    />
                                </div>


                                <div className="form-group d-flex align-items-center gap-2 mb-3">
                                    <label className="form-label mb-0">From:</label>
                                    <Field
                                        name="fromDate"
                                        type="date"
                                        className="form-control"
                                        style={{ maxWidth: '200px' }}
                                    />

                                    <label className="form-label mb-0">To:</label>
                                    <Field
                                        name="toDate"
                                        type="date"
                                        className="form-control"
                                        style={{ maxWidth: '200px' }}
                                    />
                                </div>


                            </div>


                            {/* family details */}
                            <div className="form-fields">
                                <h4 className="personalDetail">FAMILY DETAILS</h4>



                                <div className="form-group d-flex align-items-center gap-3 mb-3">
                                    <label className="form-label d-inline-block label-25 ">Name of Spouse (if Married):</label>
                                    <Field
                                        name="spouseName"
                                        className="form-control"
                                        placeholder="Spouse Name"
                                    />

                                    <label className="form-label d-inline-block label-12">Date of Birth:</label>
                                    <Field
                                        name="spouseDob"
                                        type="date"
                                        className="form-control"
                                        style={{ maxWidth: '250px' }}
                                    />
                                </div>

                                <div className="form-group d-flex align-items-center gap-3 mb-3">
                                    <label className="form-label d-inline-block label-20 mb-0">Name of Children:</label>
                                    <Field
                                        name="child1"
                                        className="form-control"
                                        placeholder="Child 1"
                                    />

                                    {/* <label className="form-label mb-0">Name of Children (2):</label> */}
                                    <Field
                                        name="child2"
                                        className="form-control"
                                        placeholder="Child 2"
                                    />
                                </div>

                            </div>

                            {/* emergency details */}
                            <div className="form-fields mb-20">
                                <h4 className="personalDetail">EMERGENCY CONTACT DETAILS</h4>

                                <div className="form-group d-flex align-items-center gap-3 mb-3">
                                    <label className="form-label d-inline-block label-30 mb-0">Name of the Person with Relation:</label>
                                    <Field
                                        name="emergencyContactName"
                                        className="form-control"
                                        placeholder="Name and Relation"
                                    />

                                    <label className="form-label d-inline-block label-20 mb-0">Mobile No.:</label>
                                    <Field
                                        name="emergencyContactMobile"
                                        className="form-control"
                                        placeholder="Mobile Number"
                                    />
                                </div>

                            </div>

                            {/* Additional fields omitted for brevity */}

                            <div className="form-actions">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Form'}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UserForm;
