import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Chart } from "chart.js";
import Head from "next/head";

const Vendor = () => {
  const canvasRef = useRef()

  useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Mar",
          "May",
          "Jul",
          "Aug",
          "Oct",
          "Dec",
        ],
        datasets: [
          {
            label: 'Earning',
            fill: false,
            backgroundColor: "#FFA500",
            borderColor: "#FFA500",
            data: [25, 38, 12, 66, 44, 5, 56,],
          },
          {
            label: 'Invested',
            fill: false,
            backgroundColor: "#000080",
            borderColor: "#000080",
            data: [15, 28, 22, 56, 34, 52, 36],
          },
          {
            label: 'Expenses',
            fill: false,
            backgroundColor: "#18CE98",
            borderColor: "#18CE98",
            data: [56, 34, 52, 36, 15, 28, 22],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "#525252",
        },
        legend: {
          labels: {
            fontColor: "#525252",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "#525252",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "#525252",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "#D3D3D3",
                zeroLineColor: "#D3D3D3",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "#525252",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "#525252",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: true,
                color: "#D3D3D3",
                zeroLineColor: "#D3D3D3",
                zeroLineBorderDash: [4],
                zeroLineBorderDashOffset: [4],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <>
      <Head>
        <title>Dashboard | Vendor</title>
      </Head>
      <section className="vendor-common-header sc-pt-80">
        <div className="container-fluid">
          <h1 className="heading">Dashboard</h1>
        </div>
      </section>

      <section className="vendor-sec-1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6 buyer-col">
              <div className="detail-con">
                <div className="detail-con-text">
                  <h2>85K</h2>
                  <span>Total Orders</span>
                </div>

                <div className="detail-con-icon buy">
                  <Image
                    src="/assets/images/buy-icon.png"
                    alt="Workwise"
                    width={30}
                    height={30}
                    priority={true}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 buyer-col">
              <div className="detail-con">
                <div className="detail-con-text">
                  <h2>21.6K</h2>
                  <span>Pending Orders</span>
                </div>
                <div className="detail-con-icon p-order">
                  <Image
                    src="/assets/images/p-order-icon.png"
                    alt="Workwise"
                    width={26}
                    height={30}
                    priority={true}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 buyer-col">
              <div className="detail-con">
                <div className="detail-con-text">
                  <h2>220K</h2>
                  <span>Total Earnings</span>
                </div>
                <div className="detail-con-icon reject">
                  <Image
                    src="/assets/images/earn-icon.png"
                    alt="Workwise"
                    width={24}
                    height={30}
                    priority={true}
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-md-7">
              <div className="buy-stats">
                <div className="buy-stats-header">
                  <h3 className="title">Revenue Report</h3>
                </div>
                <div className="buy-stats-container position-relative h-450-px">
                  <canvas id="line-chart" ref={canvasRef}></canvas>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="recent-activity">
                <div className="recent-activity-top">
                  <h4>Recent Activity</h4>
                </div>
                <div className="recent-activity-bottom">
                  <ul>
                    <li>
                      <h5>
                        <p>Your account is logged in</p>
                        <span>45 min ago</span>
                      </h5>
                      <p>
                        Nunc sed sem nec nunc volutpat fringilla. Proin in
                        condimentum ligula.
                      </p>
                      <p>
                        <span className="user-icon">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <span>Wade Warren</span>
                      </p>
                    </li>

                    <li>
                      <h5>
                        <p>Your account is logged in Just</p>
                        <span>45 min ago</span>
                      </h5>
                      <p>
                        Nunc sed sem nec nunc volutpat fringilla. Proin in
                        condimentum ligula.
                      </p>
                      <p>
                        <span className="user-icon">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <span>Ronald Richards</span>
                      </p>
                    </li>

                    <li>
                      <h5>
                        <p>Your account is logged in</p>
                        <span>45 min ago</span>
                      </h5>
                      <p>
                        Nunc sed sem nec nunc volutpat fringilla. Proin in
                        condimentum ligula.
                      </p>
                      <p>
                        <span className="user-icon">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <span>Kristin Watson</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="best-selling">
            <div className="table-header">
              <h3 className="title">Best Selling Product</h3>
            </div>
            <div className="details-table">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>RFQ Code</th>
                      <th>Name of product</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Rating</th>
                      <th>Order</th>
                      <th>Sales</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>123</td>
                      <td>Carbon steel pipes</td>
                      <td>Piping</td>
                      <td>Open</td>
                      <td>5400</td>
                      <td>20</td>
                      <td>4.8</td>
                      <td>540</td>
                      <td>5400</td>
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
                      <td>123</td>
                      <td>Carbon steel pipes</td>
                      <td>Piping</td>
                      <td>Open</td>
                      <td>5400</td>
                      <td>20</td>
                      <td>4.8</td>
                      <td>540</td>
                      <td>5400</td>
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
                      <td>123</td>
                      <td>Carbon steel pipes</td>
                      <td>Piping</td>
                      <td>Open</td>
                      <td>5400</td>
                      <td>20</td>
                      <td>4.8</td>
                      <td>540</td>
                      <td>5400</td>
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
                      <td>123</td>
                      <td>Carbon steel pipes</td>
                      <td>Piping</td>
                      <td>Open</td>
                      <td>5400</td>
                      <td>20</td>
                      <td>4.8</td>
                      <td>540</td>
                      <td>5400</td>
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
                      <td>123</td>
                      <td>Carbon steel pipes</td>
                      <td>Piping</td>
                      <td>Open</td>
                      <td>5400</td>
                      <td>20</td>
                      <td>4.8</td>
                      <td>540</td>
                      <td>5400</td>
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
              <div className="table-footer">
                <span>Showing 4 of 20 results</span>
                <div className="pagination">
                  <Link href="#" className="page-link">
                    Previous
                  </Link>
                  <input type="text" value="01" />
                  <Link href="#" className="page-link">
                    Next
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Vendor;
