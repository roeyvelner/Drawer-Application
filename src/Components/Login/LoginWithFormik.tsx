import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const LoginSchema = Yup.object().shape({
    email : Yup.string().required('This field is required').email('bad email'),
    password : Yup.string().required ('This field is required').min(5)
})

export default ()=>{
    const  handleSubmit = (values:any)=>{
        console.log(values);
    }

    return(
        <Formik
            initialValues = {{ email:"Try@gmail.com",password:"12345" }}
            onSubmit ={handleSubmit}
            validationSchema ={LoginSchema}
            render={
                ()=>{
                    return(
                        <Form>
                            <div className="form-group">
                                <Field type="email" name="email" className="form-control"/>
                                <ErrorMessage name="email" component="div" className="alert alert-danger"/>
                            </div>

                            <div className="form-group">
                                <div></div>
                                <Field type="password" name="password" className="form-control"/>
                                <ErrorMessage name="password" component="div" className="alert alert-danger"/>
                            </div>


                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>


                        </Form>
                    )
                }
                

            }
        />

        
    )
}
