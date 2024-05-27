import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Item from "./Item";
import { createRfq, getTerms, vendorApproveList } from "@/services/rfq";
import { Form, Formik } from "formik";
import { CreateRFQSchema } from "@/utils/schema";
import FormikField from "@/components/shared/FormikField";
import { getProfile } from "@/services/Auth";
import Loader from "@/components/shared/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addProductSpec, clearState, setRfqFormData } from "@/redux/slice";
import Link from "next/link";
import { toast } from "react-toastify";

const CreateRFQ = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [mainLoading, setMainLoading] = useState(false);
  const [rfqProducts, setRfqProducts] = useState([]);
  const [terms, setTerms] = useState([]);
  const [userProfile, setuserProfile] = useState(null);
  const [vendorApprovedList, setVendorApprovedList] = useState([]);
  const rfqProductsFromStore = useSelector((data) => data.rfqProducts);
  const rfqFormData = useSelector((data) => data.rfqFormData);
  const [selectedTerms, setSelectedTerms] = useState([]);

  useEffect(() => {
    getTermsData();
    getProfileDetails();
    setRfqProducts(rfqProductsFromStore);
    getVendorApproveList();
  }, []);

  const getVendorApproveList = () => {
    setLoading(true);
    vendorApproveList().then((res) => {
      setLoading(false);
      setVendorApprovedList(res.data);
    });
  };

  const getProfileDetails = () => {
    setLoading(true);
    getProfile().then((res) => {
      setLoading(false);
      setuserProfile(res.data);
    });
  };

  const getTermsData = () => {
    setTerms([]);
    getTerms()
      .then((res) => {
        setTerms(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const gotoAddMoreProducts = () => {
    router.push("/products");
  };
  const handleGotoPreferredVendors = () => {
    router.push("/vendors");
  };
  const handleCreateRFQ = (values, resetForm) => {
    setMainLoading(true);

    //router.push('/dashboard/buyer/rfq-management-preview')
    let payload = values;
    payload.products = rfqProductsFromStore;
    payload.terms = selectedTerms;
    createRfq(payload)
      .then((res) => {
        setMainLoading(false);
        dispatch(setRfqFormData(values));
        toast.success(
          <h6>
            <b>RFQ #{res.data.rfq_no}:</b> Successfully created!
          </h6>,
          {
            position: "bottom-right",
          }
        );
        resetForm();
        dispatch(clearState());
        router.push('/dashboard/buyer/rfq-management?tab=manage-rfq')
      })
      .catch((err) => {
        setMainLoading(false);
        console.log(err);
      });
  };

  const handleProductSpec = (specItems, product_id) => {
    dispatch(addProductSpec({ specItems, product_id }));
  };

  const handleClickTerms = (e,item) =>{
    if (e.target.checked) {
      setSelectedTerms((oldArray) => [...oldArray, {id:item.id}]);
    } else {
      let p = selectedTerms.filter(
        (term) => term.id != item.id
      );
      setSelectedTerms(p);
    }
  }

  return (
    <>
      {mainLoading && <Loader />}
      <div className="create-rfq-con">
        {/* Content for Create RFQs tab */}
        {/* <span className="title">Create RFQs</span> */}

        <div className="details-table">
          {rfqProducts.length == 0 && !loading && (
            <div className="text-center">
              <Link href="/products" className="btn btn-primary">
                Add Products
              </Link>
            </div>
          )}
          {rfqProducts.length > 0 && (
            <div className="table-responsive">
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th>Name of product</th>
                  <th>Size specifications & Quantity</th>
                  <th>Select Datasheet</th>
                  <th>QAP</th>
                  <th>Comments</th>
                  <th>Selected vendors</th>
                </tr>
              </thead>
              <tbody>
                {rfqProducts &&
                  rfqProducts.map((product,index) => {
                    return (
                      <Item
                      key={`rfqpp_${index}`}
                        vendorApprovedList={vendorApprovedList}
                        handleProductSpec={handleProductSpec}
                        data={product}
                      />
                    );
                  })}
              </tbody>
            </table>
            </div>
          )}
          {rfqProducts.length > 0 && (
            <>
              <div className="float-end addmore">
                <button className="mr-4" onClick={gotoAddMoreProducts}>
                  Add More Products
                </button>
              </div>
            </>
          )}
        </div>
        {loading && <Loader />}
        {rfqProducts.length > 0 && !loading && (
          <div className="create-rfq-con-2 sc-pt-50">
            <div className="row">
              {!loading && terms.length > 0 && (
                <div className="col-md-8 createR-ffq-1">
                  <h4>Suggested Terms</h4>

                  <ol className="custom-ol">
                    {terms.map((item) => {
                      return (
                        <li key={`term-item-${item.id}`}>
                          <input onClick={(e)=> handleClickTerms(e,item)} type="checkbox" id={`term-item-${item.id}`} />
                          <label htmlFor={`term-item-${item.id}`}>
                            {item?.term_content}
                          </label>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}

              <div className="col-md-8 createR-ffq-2">
                <Formik
                  enableReinitialize={true}
                  validateOnMount={true}
                  initialValues={{
                    is_published: rfqFormData.is_published,
                    comment: rfqFormData.comment,
                    response_email: rfqFormData.response_email,
                    contact_name: rfqFormData.contact_name,
                    contact_number: rfqFormData.contact_number,
                    location: rfqFormData.location,
                    bid_end_date: rfqFormData.bid_end_date,
                    company_name: userProfile?.company_name
                      ? userProfile?.company_name
                      : "",
                  }}
                  validationSchema={CreateRFQSchema}
                  onSubmit={(values, { resetForm }) =>
                    handleCreateRFQ(values, resetForm)
                  }
                >
                  {({ errors, touched, isValid }) => (
                    <Form className="add-your-term-form">
                      <FormikField
                        label="Add your own Terms"
                        type="textarea"
                        rows="5"
                        isRequired={true}
                        name="comment"
                        touched={touched}
                        errors={errors}
                      />
                      {/* <div className="form-group">
                        <h4>Add your own Terms</h4>
                        <textarea
                        id="addterm"
                        name="addterm"
                        placeholder="Enter here"
                        rows="5"
                        />
                    </div> */}

                      <div className="row my-2">
                        <div className="col-md-6">
                          <FormikField
                            label="Receive responses on"
                            type="email"
                            isRequired={true}
                            name="response_email"
                            touched={touched}
                            errors={errors}
                          />
                        </div>
                        <div className="col-md-6">
                          <FormikField
                            label="Contact person"
                            type="text"
                            isRequired={true}
                            name="contact_name"
                            touched={touched}
                            errors={errors}
                          />
                        </div>
                        <div className="col-md-6">
                          <FormikField
                            label="Contact Number"
                            type="text"
                            isRequired={true}
                            name="contact_number"
                            touched={touched}
                            errors={errors}
                          />
                        </div>
                        <div className="col-md-6">
                          <FormikField
                            label="Company Name"
                            type="text"
                            isRequired={true}
                            name="company_name"
                            touched={touched}
                            errors={errors}
                          />
                        </div>
                      </div>
                      <div className="row my-2">
                        <div className="col-md-3">
                          <FormikField
                            label="Delivery location"
                            type="select"
                            selectOptions={[
                              { label: "Select Location", value: 0 },
                              { label: "Kolkata", value: 1 },
                            ]}
                            isRequired={true}
                            name="location"
                            touched={touched}
                            errors={errors}
                          />
                        </div>
                        <div className="col-md-3">
                          <FormikField
                            label="Bid end data"
                            type="date"
                            isRequired={true}
                            name="bid_end_date"
                            touched={touched}
                            errors={errors}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-secondary"
                        //onClick={handlePreviewButtonClick}
                        disabled={!isValid}
                      >
                        Create RFQ
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateRFQ;
