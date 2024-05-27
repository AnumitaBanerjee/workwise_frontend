import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Chart } from "chart.js";
import Head from "next/head";

const Buyer = () => {
    const canvasRef = useRef()
    
    useEffect(() => {
        var config = {
            type: "line",
            data: {
                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
                datasets: [
                    {
                        label: new Date().getFullYear(),
                        fill: false,
                        backgroundColor: "#FFA500",
                        borderColor: "#FFA500",
                        data: [25, 38, 12, 66, 44, 5, 56, 67, 75, 10, 20, 54],
                    },
                    {
                        label: new Date().getFullYear() - 1,
                        fill: false,
                        backgroundColor: "#000080",
                        borderColor: "#000080",
                        data: [15, 28, 22, 56, 34, 52, 36, 47, 65, 25, 40, 34],
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
            <title>Dashboard | Buyer</title>
        </Head>
            <section className="buyer-common-header sc-pt-80">
                <div className="container-fluid">
                    <h1 className="heading">Dashboard</h1>
                </div>
            </section>

            <section className="buyer-sec-1">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 buyer-col">
                            <div className="detail-con">
                                <div className="detail-con-text">
                                    <h2>21.6K</h2>
                                    <span>Pending Orders</span>
                                </div>
                                <div className="detail-con-icon p-order">
                                    <Image src="/assets/images/p-order-icon.png" alt="Workwise" width={26} height={30} priority={true} />
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-lg-3 col-md-6 buyer-col">
                            <div className="detail-con">
                                <div className="detail-con-text">
                                    <h2>1.8K</h2>
                                    <span>Unread Messages</span>
                                </div>
                                <div className="detail-con-icon message">
                                    <Image src="/assets/images/message-icon.png" alt="Workwise" width={31.67} height={24} priority={true} />
                                </div>
                            </div>
                        </div> */}
                        <div className="col-lg-3 col-md-6 buyer-col">
                            <div className="detail-con">
                                <div className="detail-con-text">
                                    <h2>985</h2>
                                    <span>Buying Requests</span>
                                </div>

                                <div className="detail-con-icon buy">
                                    <Image src="/assets/images/buy-icon.png" alt="Workwise" width={30} height={30} priority={true} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 buyer-col">
                            <div className="detail-con">
                                <div className="detail-con-text">
                                    <h2>22K</h2>
                                    <span>Buying Rejects</span>
                                </div>
                                <div className="detail-con-icon reject">
                                    <Image src="/assets/images/reject-icon.png" alt="Workwise" width={24} height={30} priority={true} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="buy-stats">
                        <div className="buy-stats-header">
                            <h3 className="title">Buying Statistics</h3>
                        </div>
                        <div className="buy-stats-container position-relative h-450-px">
                            <canvas id="line-chart" ref={canvasRef}></canvas>
                        </div>
                    </div>


                    <div className="recent-orders">
                        <div className="table-header">
                            <h3 className="title">Recent Orders</h3>
                        </div>
                        <div className="details-table">
                            <div className="table-responsive">
                                <table className="table table-striped ">
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
                                            <th>Comments</th>
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
                                            <td>Quisque semper at</td>
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
                                            <td>Quisque semper at</td>
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
                                            <td>Quisque semper at</td>
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
                                            <td>Quisque semper at</td>
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
                                            <td>Quisque semper at</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="table-footer">
                                <span>Showing 4 of 20 results</span>
                                <div className="pagination">
                                    <Link href="#" className="page-link">Previous</Link>
                                    <input type="text" value="01" />
                                    <Link href="#" className="page-link">Next</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Buyer;