import React, { useEffect, useState } from "react";

import Image from "next/image";
import { getCmsData, getPageBanner } from "@/services/cms";
import DynamicSection from "../dynamicSection/dynamicSection";
import { Form, Formik } from "formik";
import { contactFormSchema } from "@/utils/schema";
import FormikField from "../shared/FormikField";
import { contactUsFormService } from "@/services/contact";
import { toast } from "react-toastify";
import FullLoader from "../shared/FullLoader";
import Head from "next/head";

const ContactUsPage = () => {
	const breadcrumbPaths = [
		{ title: "Home", url: "/" },
		{ title: "Contact", url: "/contact" },
	];
	const [cmsdata, setCmsdata] = useState([]);
	const [bannerdata, setBanner] = useState(null);
	const [formSubmitted, setformSubmitted] = useState(false);
	const [loading, setloading] = useState(false);

	useEffect(() => {
		getCmsSections();
		getBanner();
	}, []);

	const getCmsSections = () => {
		getCmsData(4)
			.then((response) => {
				if (response.data.length > 0) {
					setCmsdata(response.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const getBanner = () => {
		getPageBanner(4)
			.then((response) => {
				if (response.data.length > 0) {
					const regex = /(<([^>]+)>)/gi;
					const content = response.data[0].content.replace(regex, " ");

					setBanner({
						content: content,
						image: response.data[0].image,
						image_url: response.data[0].image_url,
					});
				}
			})
			.catch((error) => {
				if (error.message.response?.status === 400) {
					toast.error(error.message.response.data.message, {
						position: "top-center",
					});
				} else {
					toast.error(error.message.message, {
						position: "top-center",
					});
				}
			});
	};

	const handleSubmit = (values) => {
		setloading(true);
		setformSubmitted(false);
		contactUsFormService(values)
			.then((response) => {
				setloading(false);
				setformSubmitted(true);
			})
			.catch((error) => {
				setloading(false);
				setformSubmitted(false);
			});
	};

	return (
		<>
			<Head>
				<title>Workwise | Contact us</title>
			</Head>
			{bannerdata && (
				<section
					className="contact-sec-1 sc-pt-80"
					style={{
						backgroundImage: "url(" + bannerdata?.image_url + ")",
					}}
				>
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="contact-sec-1-con">
									{bannerdata && <h1>{bannerdata.content}</h1>}
								</div>
							</div>
						</div>
					</div>
				</section>
			)}

			<section className="breadcrumbs">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="breadcrumbs-con">
								<a href="#" className="p-bread" title="">
									Home
								</a>{" "}
								/{" "}
								<a href="#" className="c-bread" title="">
									Contact Us
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{cmsdata &&
				cmsdata.map((item) => {
					return <DynamicSection content={item.content} key={item.id} />;
				})}

			<section className="contact-sec-3 sc-pt-80 sc-pb-80">
				<div className="container">
					<div className="row">
						<div className="col-md-4">
							<div className="contact-sec-3-con">
								<div className="common-header">
									<h6>Have questions ?</h6>
									<h2>Feel free to write us</h2>
								</div>
								<div className="contact-sec-3-con-text">
									<p>
										Remember to keep the form concise and easy to fill out. You
										want to collect enough information to assist users
										effectively without overwhelming them.
									</p>
									<p>
										Additionally, ensure that the "Contact Us" page is easily
										accessible from various parts of your website.
									</p>
								</div>
							</div>
						</div>
						<div className="col-md-8">
							<div className="contact-sec-3-form hasFullLoader">
								{loading && <FullLoader />}
								{formSubmitted && (
									<h3 className="text-center mt-4 pt-4">
										Your request has been submitted successfully!
									</h3>
								)}
								{!formSubmitted && (
									<div className="contact-form">
										<Formik
											enableReinitialize={true}
											initialValues={{
												name: "",
												email: "",
												phone: "",
												subject: "",
												comment: "",
											}}
											validationSchema={contactFormSchema}
											onSubmit={(values) => handleSubmit(values)}
										>
											{({ errors, touched }) => (
												<Form>
													<div className="row">
														<div className="col-md-6">
															<div className="form-group">
																<FormikField
																	label="Your Name"
																	isRequired={true}
																	name="name"
																	touched={touched}
																	errors={errors}
																	nolabel={true}
																/>
															</div>
														</div>

														<div className="col-md-6">
															<div className="form-group">
																<FormikField
																	label="Email"
																	isRequired={true}
																	name="email"
																	touched={touched}
																	errors={errors}
																	nolabel={true}
																/>
															</div>
														</div>

														<div className="col-md-6">
															<div className="form-group">
																<FormikField
																	label="Phone Number"
																	isRequired={true}
																	name="phone"
																	touched={touched}
																	errors={errors}
																	nolabel={true}
																/>
															</div>
														</div>

														<div className="col-md-6">
															<div className="form-group">
																<FormikField
																	label="Subject"
																	isRequired={true}
																	name="subject"
																	touched={touched}
																	errors={errors}
																	nolabel={true}
																/>
															</div>
														</div>

														<div className="col-md-12">
															<div className="form-group">
																<FormikField
																	label="Comment"
																	isRequired={true}
																	name="comment"
																	type="textarea"
																	touched={touched}
																	errors={errors}
																	nolabel={true}
																/>
															</div>

															<button
																type="submit"
																className="btn btn-secondary"
															>
																Submit
															</button>
														</div>
													</div>
												</Form>
											)}
										</Formik>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ContactUsPage;
