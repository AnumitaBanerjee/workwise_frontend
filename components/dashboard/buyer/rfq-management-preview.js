import React from "react";
import Link from "next/link";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const RfqManagementPreview = () => {
  return (
    <>
      <section className="buyer-common-header sc-pt-80">
        <div className="container-fluid">
          <h1 className="heading">RFQ Management</h1>
        </div>
      </section>

      <section className="buyer-rfq-det-sec-1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="tabs-container">
                <button className="">Manage RFQs</button>
                <button className="active">Create RFQs</button>
              </div>
              <div className="manage-rfq-con">
                {/* Content for Manage RFQs tab */}
                <span className="title">RFQ #1234 details</span>

                <div className="details-table">
                <div className="table-responsive">
                  <table className="table table-striped ">
                    <thead>
                      <tr>
                        <th>Name of product</th>
                        <th>Size specifications & Quantity</th>
                        <th>
                          Datasheet
                          <br /> (Optional)
                        </th>
                        <th>
                          QAP <br />
                          (Optional)
                        </th>
                        <th>Comments (Optional)</th>
                        <th>Selected vendors</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Carbon steel pipes</td>
                        <td>
                          <div className="size-specification">
                            <input
                              type="text"
                              name="size"
                              id="size"
                              placeholder="Size"
                              disabled
                            />
                            <input
                              type="text"
                              name="spec"
                              id="spec"
                              placeholder="Spec"
                              disabled
                            />
                            <input
                              type="text"
                              name="qty"
                              id="qty"
                              placeholder="Quantity"
                              disabled
                            />
                            <FontAwesomeIcon icon={faEye} />
                          </div>
                        </td>

                        <td>
                          <div>
                            <span>
                              <FontAwesomeIcon icon={faEye} />
                            </span>
                            <span>
                              <Image
                                src="/assets/images/download-icon.png"
                                alt="Workwise"
                                width={16}
                                height={16}
                                priority={true}
                              />
                            </span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>
                              <FontAwesomeIcon icon={faEye} />
                            </span>
                            <span>
                              <Image
                                src="/assets/images/download-icon.png"
                                alt="Workwise"
                                width={16}
                                height={16}
                                priority={true}
                              />
                            </span>
                          </div>
                        </td>
                        <td>Lorem ipsum placeholder</td>
                        <td>
                          <span>
                            <Link
                              href="rfq-management-vendor"
                              className="page-link"
                            >
                              View
                            </Link>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Carbon steel pipes</td>
                        <td>
                          <div className="size-specification">
                            <input
                              type="text"
                              name="size"
                              id="size"
                              placeholder="Size"
                              disabled
                            />
                            <input
                              type="text"
                              name="spec"
                              id="spec"
                              placeholder="Spec"
                              disabled
                            />
                            <input
                              type="text"
                              name="qty"
                              id="qty"
                              placeholder="Quantity"
                              disabled
                            />
                            <FontAwesomeIcon icon={faEye} />
                          </div>
                        </td>

                        <td>
                          <div>
                            <span>
                              <FontAwesomeIcon icon={faEye} />
                            </span>
                            <span>
                              <Image
                                src="/assets/images/download-icon.png"
                                alt="Workwise"
                                width={16}
                                height={16}
                                priority={true}
                              />
                            </span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>
                              <FontAwesomeIcon icon={faEye} />
                            </span>
                            <span>
                              <Image
                                src="/assets/images/download-icon.png"
                                alt="Workwise"
                                width={16}
                                height={16}
                                priority={true}
                              />
                            </span>
                          </div>
                        </td>
                        <td>Lorem ipsum placeholder</td>
                        <td>
                          <span>
                            <Link
                              href="rfq-management-vendor"
                              className="page-link"
                            >
                              View
                            </Link>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Carbon steel pipes</td>
                        <td>
                          <div className="size-specification">
                            <input
                              type="text"
                              name="size"
                              id="size"
                              placeholder="Size"
                              disabled
                            />
                            <input
                              type="text"
                              name="spec"
                              id="spec"
                              placeholder="Spec"
                              disabled
                            />
                            <input
                              type="text"
                              name="qty"
                              id="qty"
                              placeholder="Quantity"
                              disabled
                            />
                            <FontAwesomeIcon icon={faEye} />
                          </div>
                        </td>

                        <td>
                          <div>
                            <span>
                              <FontAwesomeIcon icon={faEye} />
                            </span>
                            <span>
                              <Image
                                src="/assets/images/download-icon.png"
                                alt="Workwise"
                                width={16}
                                height={16}
                                priority={true}
                              />
                            </span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>
                              <FontAwesomeIcon icon={faEye} />
                            </span>
                            <span>
                              <Image
                                src="/assets/images/download-icon.png"
                                alt="Workwise"
                                width={16}
                                height={16}
                                priority={true}
                              />
                            </span>
                          </div>
                        </td>
                        <td>Lorem ipsum placeholder</td>
                        <td>
                          <span>
                            <Link
                              href="rfq-management-vendor"
                              className="page-link"
                            >
                              View
                            </Link>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Carbon steel pipes</td>
                        <td>
                          <div className="size-specification">
                            <input
                              type="text"
                              name="size"
                              id="size"
                              placeholder="Size"
                              disabled
                            />
                            <input
                              type="text"
                              name="spec"
                              id="spec"
                              placeholder="Spec"
                              disabled
                            />
                            <input
                              type="text"
                              name="qty"
                              id="qty"
                              placeholder="Quantity"
                              disabled
                            />
                            <FontAwesomeIcon icon={faEye} />
                          </div>
                        </td>

                        <td>
                          <div>
                            <span>
                              <FontAwesomeIcon icon={faEye} />
                            </span>
                            <span>
                              <Image
                                src="/assets/images/download-icon.png"
                                alt="Workwise"
                                width={16}
                                height={16}
                                priority={true}
                              />
                            </span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>
                              <FontAwesomeIcon icon={faEye} />
                            </span>
                            <span>
                              <Image
                                src="/assets/images/download-icon.png"
                                alt="Workwise"
                                width={16}
                                height={16}
                                priority={true}
                              />
                            </span>
                          </div>
                        </td>
                        <td>Lorem ipsum placeholder</td>
                        <td>
                          <span>
                            <Link
                              href="rfq-management-vendor"
                              className="page-link"
                            >
                              View
                            </Link>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>

                  <form>
                    <div className="row">
                      <div className="col-md-8">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="comname" className="form-label">
                                Company Name
                              </label>
                              <input
                                type="text"
                                id="wacomnamepp"
                                className="form-control"
                                name="comname"
                                placeholder="lorem ipsum"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="cperson" className="form-label">
                                Contact person
                              </label>
                              <input
                                type="text"
                                id="cperson"
                                className="form-control"
                                name="cperson"
                                placeholder="John Doe"
                                disabled
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="email" className="form-label">
                                Email
                              </label>
                              <input
                                type="text"
                                id="email"
                                className="form-control"
                                name="email"
                                placeholder="lorem@ipsum.com"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="wapp" className="form-label">
                                Contact Number
                              </label>
                              <input
                                type="text"
                                id="wapp"
                                className="form-control"
                                name="wapp"
                                placeholder="+91 1234567890"
                                disabled
                              />
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="wapp" className="form-label">
                                Comments
                              </label>
                              <textarea
                                id="comment"
                                className="form-control"
                                name="comment"
                                placeholder="comment here"
                                rows={5}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-8">
                          <h4>Terms & Conditions</h4>

                          <ol>
                            <li>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, lorem .
                            </li>
                            <li>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, lorem .
                            </li>
                            <li>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, lorem .
                            </li>
                            <li>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, lorem .
                            </li>
                          </ol>
                        </div>

                      </div>
                        <button type="submit" className="btn btn-primary">
                          Create RFQ
                        </button>
                        <button type="submit" className="btn btn-secondary">
                          Create RFQ
                        </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RfqManagementPreview;
