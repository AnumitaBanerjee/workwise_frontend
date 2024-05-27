import Loader from "@/components/shared/Loader";
import { sendReminder } from "@/services/rfq";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const RFQItem = ({ data }) => {
  const [loading, setloading] = useState(false);
  const list_products = () => {
    let productTitles = [];

    if (data?.products && data?.products?.length > 0) {
      data.products.map((item) => {
        if (item?.product_details && item?.product_details?.length > 0) {
          productTitles.push(item?.product_details[0].name);
        }
      });

      return (
        <span className="mproducts">
          {productTitles.length > 0 ? productTitles.join(",") : "---"}
        </span>
      );
    }
  };
  const handlereminder = (e) => {
    e.preventDefault();
    setloading(true);
    sendReminder(data.id)
      .then((res) => {
        setloading(false);
        //alert(res.message)
        toast.success(res.message)
      })
      .catch((err) => {
        setloading(false);
      });
  };
  return (
    <>
      <tr>
        <td>{data?.rfq_no}</td>
        {/* <td>Piping</td> */}
        <td>{list_products()}</td>
        <td>{moment(data.timestamp).format("DD/MM/YYYY")}</td>
        <td>{moment(data.bid_end_date).format("DD/MM/YYYY")}</td>
        <td>{data.status == 1 ? "Open" : "Closed"}</td>
        <td>
          <span>
            <Link
              href={`rfq-management-details?type=buyer-view&id=${data?.id}`}
              className="page-link"
            >
              View
            </Link>
          </span>
          <span>
            <Link href="#" onClick={handlereminder} className="page-link-btn">
              {!loading && "Send Reminder For Quote"}
              {loading &&<>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></span>{" "}
                Processing request...
              </>}
            </Link>
          </span>
        </td>
      </tr>
    </>
  );
};

export default RFQItem;
