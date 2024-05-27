import FullLoader from "@/components/shared/FullLoader";
import { getRFQS } from "@/services/rfq";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import RFQItem from "./Item";

const ManageRFQ = () => {
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(5);
  const [myRFQs, setmyRFQs] = useState([]);
  const [totalRFQs, settotalRFQs] = useState(0);
  const [showing, setshowing] = useState(0);

  useEffect(() => {
    getAllRFQs();
  }, []);
  useEffect(() => {
    getAllRFQs();
  }, [page, limit]);

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

  return (
    <>
      <div className="manage-rfq-con">
        {/* Content for Manage RFQs tab */}
        <span className="title">Manage RFQs</span>

        <div className="details-table hasFullLoader">

          {loading && <FullLoader />}
          {!loading && myRFQs.length == 0 && (
            <p>You haven't created any RFQs yet!</p>
          )}
          {!loading && myRFQs && myRFQs.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th>RFQ Code</th>
                    {/* <th>Category</th> */}
                    <th>Products</th>
                    <th>Published Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myRFQs.map((item) => {
                    return <RFQItem key={`rfq_item_${item.id}`} data={item} />;
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!loading && myRFQs.length > 0 && (
            <div className="table-footer">
              <span>
                Showing {showing} of {totalRFQs} results
              </span>
              <div className="pagination">
                <ul>
                  {Array.from(Array(Math.ceil(totalRFQs / limit)), (e, i) => {
                    let currentIndex = i + 1;
                    return (
                      <li
                        onClick={() => setpage(currentIndex)}
                        className={`${currentIndex == page ? "current" : ""}`}
                        key={currentIndex}
                      >
                        {currentIndex}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default ManageRFQ;
