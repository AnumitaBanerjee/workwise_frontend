import React, { useEffect, useState } from "react";
import Link from "next/link";
import FullLoader from "@/components/shared/FullLoader";
import {
  closeRFQ,
  downloadQuotesDetails,
  finalizeQuotation,
  getQuotes,
  getRFQS,
} from "@/services/rfq";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import * as XLSX from "xlsx";
import QuoteCompareTable from "@/components/dashboard/buyer/quote-compare-table";
import Loader from "@/components/shared/Loader";
import { toast } from "react-toastify";

const QuoteCompare = () => {
  const router = useRouter();
  const { rfq } = router.query;
  const [loading, setloading] = useState(false);
  const [quotesLoading, setquotesLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [closeRFqLoading, setcloseRFqLoading] = useState(false);
  const [finalizeLoading, setfinalizeLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(50000000);
  const [myRFQs, setmyRFQs] = useState([]);
  const [totalRFQs, settotalRFQs] = useState(0);
  const [showing, setshowing] = useState(0);
  const [currentRFQ, setcurrentRFQ] = useState(null);
  const [quotes, setquotes] = useState([]);

  useEffect(() => {
    if (rfq) {
      setcurrentRFQ(rfq);
      getRespectiveQuotes();
    } else {
      setcurrentRFQ(null);
    }
  }, [router]);

  useEffect(() => {
    getAllRFQs();
  }, []);

  const getAllRFQs = () => {
    setloading(true);
    getRFQS({ page, limit })
      .then((res) => {
        setloading(false);
        setmyRFQs(res.data);
        settotalRFQs(res.total_items);
        const items = page * limit;
        setshowing(items > res.total_items ? res.total_items : items);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
      });
  };

  const getRespectiveQuotes = () => {
    setquotesLoading(true);
    setquotes([]);
    getQuotes(rfq)
      .then((res) => {
        setquotesLoading(false);
        setquotes(res.data);
      })
      .catch((err) => {
        setquotesLoading(false);
      });
  };

  const handleDownloadQuote = (e) => {
    e.preventDefault();
    setDownloadLoading(true);
    downloadQuotesDetails(rfq)
      .then((res) => {
        console.log(res);
        generateExcelFile(res.data);
      })
      .catch((err) => {
        setDownloadLoading(false);
      });
  };
  const generateExcelFile = (data) => {
    if (data.length > 0) {
      setDownloadLoading(true);
      // Create a new workbook
      let workbook = XLSX.utils.book_new();

      data.map((rfqItem) => {
        if (rfqItem?.id) {
          let sheetData = [
            [
              "Vendon Name",
              "Organization Name",
              "Vendor Email",
              "Vendor Mobile",
              "Product Name",
              "Unit Price",
              "Package Price",
              "Tax",
              "Freight Price",
              "Total Price",
              "Comment",
              "Delivery Period",
            ],
          ];

          if (rfqItem?.quotations.length > 0) {
            rfqItem?.quotations.map((item) => {
              sheetData.push([
                "" + item?.vendor_details[0]?.name,
                "" + item?.vendor_details[0]?.organization_name,
                "" + item?.vendor_details[0]?.email,
                "" + item?.vendor_details[0]?.mobile,
              ]);

              if (item.products.length > 0) {
                item?.products.map((productItem) => {
                  sheetData.push([
                    "",
                    "",
                    "",
                    "",
                    productItem.product_name,
                    productItem.unit_price,
                    productItem.package_price,
                    productItem.tax,
                    productItem.freight_price,
                    productItem.total_price,
                    productItem.comment,
                    productItem.delivery_period,
                  ]);
                });
              }
            });
          }
          // Add sheet1 to the workbook
          const sheet = XLSX.utils.aoa_to_sheet(sheetData);
          XLSX.utils.book_append_sheet(
            workbook,
            sheet,
            `RFQ #${rfqItem?.rfq_no}`
          );
        }
      });

      // Generate a binary string from the workbook
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Convert binary string to a Blob
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      // Create a download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const filename = `RFQ_details_${Date.now()}.xlsx`;
      a.download = filename;
      document.body.appendChild(a);

      // Trigger the download
      a.click();
      setDownloadLoading(false);

      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0);
    }
  };

  const handleRFqClose = (e) => {
    setcloseRFqLoading(true);
    e.preventDefault();
    closeRFQ(rfq)
      .then(() => {
        getRespectiveQuotes();
        setcloseRFqLoading(false);
      })
      .catch((err) => {
        setcloseRFqLoading(false);
      });
  };

  const handleFinalize = (e,item,proditem)=>{
    e.preventDefault();
    setfinalizeLoading(true)
    const payload = {
      rfq_id:proditem.rfq_id,
      rfq_no:proditem.rfq[0].rfq_no,
      product_id:proditem.product_id,
      vendor_id:item.quote_details.created_by,
      quote_id:item.quote_id,
    }
    console.log("payload",payload)
    finalizeQuotation(payload).then(res=>{
      setfinalizeLoading(false)
      //toast.success("You've finalized vendor for this product!")
      getRespectiveQuotes();
    }).catch(err=>{
      setfinalizeLoading(false)
      console.log(err)
    })
  }

  return (
    <>
    {finalizeLoading && <Loader/>}
      <section className="quote-common-header compare-received-quote sc-pt-80">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h3 className="heading">Compare Received Quote</h3>
            </div>
            <div className="col-md-6">
              <div className="btn-options float-end">
                <span>
                  <Link
                    href="#"
                    className="page-link"
                    onClick={handleDownloadQuote}
                    disabled={downloadLoading}
                  >
                    {downloadLoading
                      ? "Generating Excel file...."
                      : "Download Result as Excel"}
                  </Link>
                </span>
                {currentRFQ && quotes && quotes.length > 0 && (
                  <>
                    {quotes[0]?.rfq[0]?.status == 1 && (
                      <span>
                        {closeRFqLoading && (
                          <Link
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="page-link disabled-button"
                          >
                            Processing request...
                          </Link>
                        )}
                        {!closeRFqLoading && (
                          <Link
                            href="#"
                            onClick={handleRFqClose}
                            className="page-link"
                          >
                            Mark RFQ as Closed
                          </Link>
                        )}
                      </span>
                    )}
                    {quotes[0]?.rfq[0]?.status == 2 && (
                      <span className="disabled-button">
                        <Link
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="page-link"
                        >
                          RFQ has been closed
                        </Link>
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="quote-edit-sec-1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 ">
              <div className="hasFullLoader">
                {loading && <FullLoader />}
                <h5 className="title">Quotes Received</h5>
                {!loading && myRFQs && myRFQs.length == 0 && <p>NoFQs yet!</p>}
                {myRFQs && myRFQs.length > 0 && (
                  <ul>
                    {myRFQs.map((item) => {
                      if (item.quotes.length > 0) {
                        return (
                          <>
                            {currentRFQ && item.id == currentRFQ ? (
                              <li className="active">
                                {/* <li className="active"> */}
                                <Link
                                  href={`/dashboard/buyer/quote-compare/?rfq=${item?.id}`}
                                  className="page-link"
                                >
                                  RFQ #{item?.rfq_no}
                                </Link>
                              </li>
                            ) : (
                              <li>
                                {/* <li className="active"> */}
                                <Link
                                  href={`/dashboard/buyer/quote-compare/?rfq=${item?.id}`}
                                  className="page-link"
                                >
                                  RFQ #{item?.rfq_no}
                                </Link>
                              </li>
                            )}
                          </>
                        );
                      }
                    })}
                  </ul>
                )}
              </div>
            </div>
            {!currentRFQ && (
              <div className="col-md-10">
                <div className="quote-sec-table">
                  <h4 className="text-center">
                    Please select a RFQ to view its quotes!
                  </h4>
                </div>
              </div>
            )}

            {currentRFQ && (
              <div className="col-md-10">
                {quotesLoading && (
                  <div className="quote-sec-table hasFullLoader">
                    {quotesLoading && <FullLoader />}
                  </div>
                )}
                {!quotesLoading && quotes.length == 0 && (
                  <div className="quote-sec-table hasFullLoader">
                    <h4>You don't have any quotes.</h4>
                  </div>
                )}
                {quotes &&
                  quotes.length > 0 &&
                  quotes.map((item,index) => {
                    return (
                      <div className="quote-sec-table" key={`qq_${index}`}>
                        <span className="sub-heading">
                          <b>Product</b> :{" "}
                          {item?.product_details[0]?.product_name}
                        </span>
                        <span className="sub-heading">
                          <b>Requested Quantity </b>:{" "}
                          {item?.product_details[0]?.rfq_details[2]?.value}
                        </span>
                        {item?.quotations && item?.quotations.length == 0 && (
                          <h4 className="mt-4 text-center">
                            No Quotations yet!
                          </h4>
                        )}
                        {item?.quotations && item?.quotations.length > 0 && (
                          <>
                            <QuoteCompareTable
                              proditem={item}
                              handleFinalize={handleFinalize}
                              quotations={item?.quotations}
                              quantity={
                                item?.product_details[0]?.rfq_details[2]?.value
                              }
                            />
                          </>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default QuoteCompare;
