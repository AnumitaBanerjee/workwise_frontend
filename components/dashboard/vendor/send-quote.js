import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { getRFQById, sendQuotation } from "@/services/rfq";
import PlaceholderLoading from "react-placeholder-loading";
import Loader from "@/components/shared/Loader";
import { toast } from "react-toastify";

const SendQuotePageComp = () => {
  const router = useRouter();
  const { id } = router.query;
  const [rfqDetails, setrfqDetails] = useState(null);
  const [loading, setloading] = useState(false);
  const [quoteProducts, setquoteProducts] = useState([]);
  const [submitLoading, setsubmitLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getRFQdetails();
    }
  }, [router]);

  const getRFQdetails = () => {
    setloading(true);
    getRFQById(id)
      .then((res) => {
        setloading(false);
        if (res.data.products.length > 0) {
          let bidProducts = [];
          res.data.products.map((item) => {
            bidProducts.push({
              product_id: item.product_id,
              product_name: item.product_details
                ? item.product_details[0].name
                : "",
              unit_price: 0,
              package_price: 0,
              tax: 0,
              freight_price: 0,
              total_price: 0,
              comment: "",
              delivery_period: "",
            });
          });
          setquoteProducts(bidProducts);
        }

        setrfqDetails(res.data);
      })
      .catch((error) => {
        setloading(false);
      });
  };

  const handleUpdateData = (
    e,
    product_id,
    type,
    valueType = "integer",
    total_qty
  ) => {
    let value = e.target.value;
    let d = quoteProducts.map((item) => {
      if (item.product_id == product_id) {
        if (valueType == "integer") {
          item[type] = parseFloat(value);
        } else {
          item[type] = value;
        }

        let getTotalPrice =
          +item.unit_price * parseInt(total_qty) +
          +item.package_price +
          +item.tax +
          +item.freight_price;

        item.total_price = getTotalPrice ? getTotalPrice : 0;
      }
      return item;
    });
    setquoteProducts(d);
  };

  const handleSendQuote = () => {
    let isEmpty = false;
    let allFinalizedProducts = [];
    rfqDetails.finalizations.map(item=>allFinalizedProducts.push(item.product_id))
    let filteredquoteProducts = quoteProducts.filter((item)=>{     
     if(!allFinalizedProducts.includes(item.product_id)){
        return item;
      }
    })
    
    filteredquoteProducts.map((item) => {
      if (item.total_price <= 0) {
        isEmpty = true;
      }
    });
    if (isEmpty) {
      toast.error("One or more product's total amount is 0");
      return;
    }

    setsubmitLoading(true);
    let payload = {
      rfq_id: rfqDetails.id,
      rfq_no: rfqDetails.rfq_no,
      status: 1,
      products: filteredquoteProducts,
    };
    sendQuotation(payload)
      .then((res) => {
        setsubmitLoading(false);
        router.push(`/dashboard/vendor/inquiries-details?id=${id}`);
      })
      .catch((err) => {
        setsubmitLoading(false);
      });
  };

  const isAvailableForQuote = (item) =>{
    if(rfqDetails.finalizations && rfqDetails.finalizations.length > 0){
      let allFinalizedProducts = [];
      rfqDetails.finalizations.map(item=>allFinalizedProducts.push(item.product_id))
      return !allFinalizedProducts.includes(item.product_id)
    }else{
      return true
    }
  }

  return (
    <>
      {submitLoading && <Loader />}
      <section className="quote-common-header sc-pt-80">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h3 className="heading">Send Quotation</h3>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </section>
      {loading && (
        <section className="quote-send-sec-1">
          <div className="container-fluid">
            <Link
              href={`/dashboard/vendor/inquiries-details?id=${id}`}
              className="page-link backBtn"
            >
              {" "}
              <FontAwesomeIcon icon={faArrowLeft} /> Go back
            </Link>
            <div className="row">
              <div className="col-md-12">
                <div className="quote-sec-table">
                  <div className="quote-sec-table-top">
                    <h3 className="title">
                      <PlaceholderLoading
                        shape="rect"
                        width={600}
                        height={50}
                      />
                    </h3>

                    <p>
                      <PlaceholderLoading
                        shape="rect"
                        width={300}
                        height={20}
                      />
                    </p>
                    <p>
                      <PlaceholderLoading
                        shape="rect"
                        width={300}
                        height={20}
                      />
                    </p>
                    <p>
                      <PlaceholderLoading
                        shape="rect"
                        width={300}
                        height={20}
                      />
                    </p>
                    <p>
                      <PlaceholderLoading
                        shape="rect"
                        width={300}
                        height={20}
                      />
                    </p>
                  </div>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Sl No.</th>
                          <th>HSN Code</th>
                          <th>Item</th>
                          <th>Qty</th>
                          <th>Unit</th>
                          <th>Unit Rate</th>
                          <th>Freight</th>
                          <th>Package</th>
                          <th>Taxes</th>
                          <th>Total</th>
                          <th>Vendor Comments</th>
                          <th>Delivery Period</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <PlaceholderLoading
                              shape="rect"
                              width={50}
                              height={20}
                            />
                          </td>
                          <td>
                            <PlaceholderLoading
                              shape="rect"
                              width={100}
                              height={20}
                            />
                          </td>
                          <td>
                            <PlaceholderLoading
                              shape="rect"
                              width={300}
                              height={20}
                            />
                          </td>
                          <td>
                            <PlaceholderLoading
                              shape="rect"
                              width={50}
                              height={20}
                            />
                          </td>
                          <td>
                            <PlaceholderLoading
                              shape="rect"
                              width={50}
                              height={20}
                            />
                          </td>
                          <td>
                            <PlaceholderLoading
                              shape="rect"
                              width={50}
                              height={20}
                            />
                          </td>

                          <td>
                            <PlaceholderLoading
                              shape="rect"
                              width={50}
                              height={20}
                            />
                          </td>

                          <td>
                            <PlaceholderLoading
                              shape="rect"
                              width={50}
                              height={20}
                            />
                          </td>

                          <td>
                            <PlaceholderLoading
                              shape="rect"
                              width={50}
                              height={20}
                            />
                          </td>

                          <td>
                            <PlaceholderLoading
                              shape="rect"
                              width={50}
                              height={20}
                            />
                          </td>
                          <td>
                            <div className="comment">
                              <div className="comment-group">
                                <PlaceholderLoading
                                  shape="rect"
                                  width={200}
                                  height={20}
                                />
                              </div>

                              <PlaceholderLoading
                                shape="rect"
                                width={150}
                                height={40}
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="quote-sec-btm">
                    <div className="row">
                      <div className="col-md-6">
                        <PlaceholderLoading
                          shape="rect"
                          width={150}
                          height={40}
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="float-end">
                          <PlaceholderLoading
                            shape="rect"
                            width={150}
                            height={40}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* // Actual Data area */}

      {!loading && rfqDetails && (
        <section className="quote-send-sec-1">
          <div className="container-fluid">
            <Link
              href={`/dashboard/vendor/inquiries-details?id=${id}`}
              className="page-link backBtn"
            >
              {" "}
              <FontAwesomeIcon icon={faArrowLeft} /> Go back
            </Link>
            <div className="row">
              <div className="col-md-12">
                <div className="quote-sec-table">
                  <div className="quote-sec-table-top">
                    <h3 className="title">RFQ No. #{rfqDetails.rfq_no}</h3>

                    {/* <span className="btn btn-primary download-btn">
                      Download as Excel/PDF
                    </span> */}
                    {rfqDetails?.company_name && (
                      <p>
                        <b>Buyer</b> : {rfqDetails?.company_name}.
                      </p>
                    )}
                    {rfqDetails?.contact_name && (
                      <p>
                        <b>Contact Person</b> : {rfqDetails?.contact_name}
                      </p>
                    )}
                    {rfqDetails?.response_email && (
                      <p>
                        <b>Email</b> : {rfqDetails?.response_email}
                      </p>
                    )}
                    {rfqDetails?.contact_number && (
                      <p>
                        <b>Contact Number</b> : +91-{rfqDetails?.contact_number}
                      </p>
                    )}
                  </div>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Sl No.</th>
                          <th>HSN Code</th>
                          <th>Item</th>
                          <th>Qty</th>
                          <th>Unit</th>
                          <th>Unit Rate</th>
                          <th>Freight</th>
                          <th>Package</th>
                          <th>Taxes</th>
                          <th>Total</th>
                          <th>Vendor Comments</th>
                          <th>Delivery Period</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rfqDetails.products &&
                          rfqDetails.products.length > 0 &&
                          rfqDetails.products.map((item, index) => {
                            if(isAvailableForQuote(item)){
                              return (
                                <tr key={`q_${index}`}>
                                  <td>{index + 1}</td>
                                  <td>HSN Code</td>
                                  <td>{item?.product_details[0]?.name}</td>
                                  <td>{item?.product_specs[2]?.value}</td>
                                  <td>{item?.product_specs[2]?.value}</td>
                                  <td>
                                    <input
                                      type="number"
                                      name=""
                                      id=""
                                      placeholder="₹"
                                      onChange={(e) =>
                                        handleUpdateData(
                                          e,
                                          item.product_id,
                                          "unit_price",
                                          "",
                                          item?.product_specs[2]?.value
                                        )
                                      }
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="number"
                                      name=""
                                      id=""
                                      placeholder="₹"
                                      onChange={(e) =>
                                        handleUpdateData(
                                          e,
                                          item.product_id,
                                          "freight_price",
                                          "",
                                          item?.product_specs[2]?.value
                                        )
                                      }
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="number"
                                      name=""
                                      id=""
                                      placeholder="₹"
                                      onChange={(e) =>
                                        handleUpdateData(
                                          e,
                                          item.product_id,
                                          "package_price",
                                          "",
                                          item?.product_specs[2]?.value
                                        )
                                      }
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="number"
                                      name=""
                                      id=""
                                      placeholder="₹"
                                      onChange={(e) =>
                                        handleUpdateData(
                                          e,
                                          item.product_id,
                                          "tax",
                                          "",
                                          item?.product_specs[2]?.value
                                        )
                                      }
                                    />
                                  </td>

                                  <td>
                                    <input
                                      value={quoteProducts[index].total_price}
                                      type="number"
                                      name=""
                                      id=""
                                      placeholder="₹"
                                      disabled
                                      onChange={(e) =>
                                        handleUpdateData(
                                          e,
                                          item.product_id,
                                          "total_price",
                                          "",
                                          item?.product_specs[2]?.value
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <div className="comment">
                                      <div className="comment-group">
                                        <textarea
                                          name="comment"
                                          id="comment"
                                          cols="30"
                                          rows="3"
                                          onChange={(e) =>
                                            handleUpdateData(
                                              e,
                                              item.product_id,
                                              "comment",
                                              "string",
                                              item?.product_specs[2]?.value
                                            )
                                          }
                                        ></textarea>
                                        <span htmlFor="comment">0/300</span>
                                      </div>

                                      {/* <button className="btn btn-secondary">
                                        No Quote
                                      </button> */}
                                    </div>
                                  </td>
                                  <td style={{ width: 250 }}>
                                    <input
                                    style={{ width: 150 }}
                                      name="comment"
                                      id="delivery_period"
                                      type="text"
                                      placeholder="E.g. 7 Days"
                                      onChange={(e) =>
                                        handleUpdateData(
                                          e,
                                          item.product_id,
                                          "delivery_period",
                                          "string",
                                          item?.product_specs[2]?.value
                                        )
                                      }
                                    />
                                  </td>
                                </tr>
                              );
                            }
                          })}
                      </tbody>
                    </table>
                  </div>

                  <div className="quote-sec-btm">
                    <div className="row">
                      <div className="col-md-6">
                        <button type="submit" className="btn btn-primary">
                          Regret Quote
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button
                          type="submit"
                          className="btn btn-secondary float-end"
                          onClick={handleSendQuote}
                        >
                          Send Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SendQuotePageComp;
