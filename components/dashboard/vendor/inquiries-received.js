import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getVendorRfqList } from "@/services/rfq";
import FullLoader from "@/components/shared/FullLoader";
import moment from "moment";

const InquiriesReceived = () => {
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(20);
  const [rfqList, setrfqList] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getRFQs();
  }, []);

  const getRFQs = () => {
    setloading(true);
    getVendorRfqList({ page, limit })
      .then((res) => {
        setloading(false);
        setrfqList(res.data);
      })
      .catch((err) => {
        setloading(false);
      });
  };

  const getProductsList = (item)=>{
    if(item.products.length > 0){
      return item.products.map((product)=>product.product_details[0].name).join(', ')
    }
  }

  return (
    <>
      <section className="vendor-common-header sc-pt-80">
        <div className="container-fluid">
          <h1 className="heading">Inquiries Received</h1>
        </div>
      </section>

      <section className="vendor-mngt-sec-1 hasFullLoader">
        {loading && <FullLoader />}
       
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="vendor-mngt-con">
              {!loading && rfqList.length == 0 && <p className="mb-0 text-center">You've not received any inqueries yet.</p>}
                {/* Content for Manage RFQs tab */}
                {!loading && rfqList.length > 0 && (
                  <span className="title">
                    You have received {rfqList.length} Inquiries
                  </span>
                )}

                <div className="details-table">
                  {!loading && rfqList.length > 0 && (
                    <div className="table-responsive">
                    <table className="table table-striped ">
                      <thead>
                        <tr>
                          <th>RFQ ID</th>
                          <th>Category</th>
                          <th>Products</th>
                          <th>Company</th>
                          <th>End Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!loading &&
                          rfqList.length > 0 &&
                          rfqList.map((item) => {
                            return (
                              <tr key={`rfq-item-${item.rfq_no}`}>
                                <td>#{item.rfq_no}</td>
                                <td>Piping</td>
                                <td>
                                  {getProductsList(item)}
                                </td>
                                <td>{item.company_name}</td>
                                <td>{moment(item.bid_end_date).format('DD/MM/YYYY')}</td>
                                <td>
                                  <span>
                                    <Link href={`/dashboard/vendor/inquiries-details?id=${item.id}`} className="page-link">
                                      View
                                    </Link>
                                  </span>
                                </td>
                              </tr>
                            );
                          })}                        
                      </tbody>
                    </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InquiriesReceived;
