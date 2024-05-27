import React, { useEffect, useState } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';

const QuoteCompareTable = ({ quotations, quantity, handleFinalize, proditem }) => {
  var alreadyFinalized = []

  useEffect(() => {

  }, [])
  alreadyFinalized = quotations.filter(item => item.finalization != null)


  return (
    <>

      <div className="table-content">
        <div className="table-elements">
          <div className="table-row">
            <div className="table-col">
              <div className="table-si-row"></div>
              <div className="table-si-row">Unit Rate</div>
              <div className="table-si-row table-grey-row">Total Rate</div>
              <div className="table-si-row">Packaging</div>
              <div className="table-si-row">Freight</div>
              <div className="table-si-row">GST</div>
              <div className="table-si-row  table-yellow-row">Sub Total</div>
              <div className="table-si-row">Delivery Period</div>
              <div className="table-si-row">Comments</div>
            </div>
            {quotations &&
              quotations.length > 0 &&
              quotations.map((item, index) => {
                return (
                  <div className="table-col" key={`tab_qq_${index}`}>
                    <div className="table-si-row table-dark-row">
                      <span>{item?.quote_details?.vendor_details?.organization_name}</span>
                      <Dropdown className="dots-nav-anchor">
                        <Dropdown.Toggle className="dots-nav">
                          <Image
                            src="/assets/images/3-dots-nav.svg"
                            width={4}
                            height={18}
                            alt="Nav"
                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href={'tel:+91' + quotations[0]?.quote_details?.vendor_details?.mobile} className="negotiate-link">Negotiate</Dropdown.Item>
                          <Dropdown.Item target="_blank" href={`/dashboard/buyer/rfq-management-vendor/vendor-profile?id=${item?.quote_details?.vendor_details?.id}`} className="view-link">View Profile</Dropdown.Item>
                          {!item.finalization && <Dropdown.Item href="#" onClick={(e) => handleFinalize(e, item, proditem)} className="finalize-link">Finalize</Dropdown.Item>}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="table-si-row">{item.unit_price}</div>
                    <div className="table-si-row table-grey-row">{quantity * item.unit_price}</div>
                    <div className="table-si-row">{item.package_price}</div>
                    <div className="table-si-row">{item.freight_price}</div>
                    <div className="table-si-row">{item.tax}</div>
                    <div className="table-si-row  table-yellow-row">
                      {item.total_price}
                    </div>
                    <div className="table-si-row">{item.delivery_period}</div>
                    <div className="table-si-row">{item.comment}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* Lowest bid area */}
      {alreadyFinalized.length == 0 ?
        <div className="quote-sec-bottom">
          <div className="quote-sec-bottom-con">
            <span>
              <b>Lowest Bid</b> : {quotations[0]?.quote_details?.vendor_details?.organization_name}
            </span>
            <span>
              <Link href={'mailto:' + quotations[0]?.quote_details?.vendor_details?.email}>
                <FontAwesomeIcon icon={faEnvelope} />
              </Link>
            </span>

            <span>
              <Link href={'tel:+91' + quotations[0]?.quote_details?.vendor_details?.mobile}>
                <FontAwesomeIcon icon={faPhone} />
              </Link>
            </span>

            <button type="submit" className="btn btn-secondary" onClick={(e) => handleFinalize(e, quotations[0], proditem)}>
              Finalize
            </button>
          </div>
        </div> : <div className="quote-sec-bottom">
          <div className="quote-sec-bottom-con">
            <span>
              <b>Finalized vendor</b> : {alreadyFinalized[0].finalization?.winning_vendor?.organization_name}
            </span>
            <span>
              <Link href={'mailto:' + alreadyFinalized[0].finalization?.winning_vendor?.email}>
                <FontAwesomeIcon icon={faEnvelope} />
              </Link>
            </span>

            <span>
              <Link href={'tel:+91' + alreadyFinalized[0].finalization?.winning_vendor?.mobile}>
                <FontAwesomeIcon icon={faPhone} />
              </Link>
            </span>

            
          </div>
        </div>}
      {/* Lowest bid area end */}
    </>
  );
};

export default QuoteCompareTable;
