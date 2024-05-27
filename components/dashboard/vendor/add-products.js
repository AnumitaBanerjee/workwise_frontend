import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FormikField from "@/components/shared/FormikField";
import * as yup from "yup";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { categoryList, vendorApproveList } from "@/services/rfq";
import Select from "react-select";
import UploadFiles from "@/components/shared/ImagesUpload";
import Loader from "@/components/shared/Loader";
import { ToastContainer, toast } from "react-toastify";
import { addProducts } from "@/services/products";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AddProducts = () => {
	const id = Date.now().toString();
	const [catloading, setcatloading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [parentCategories, setParentCategories] = useState([]);
	const [cat_id, setCat_id] = useState("");
	const [levelOneCat, setlevelOneCat] = useState([]);
	const [levelTwoCat, setlevelTwoCat] = useState([]);
	const [levelThreeCat, setlevelThreeCat] = useState([]);
	const [levelFourCat, setlevelFourCat] = useState([]);
	const [levelFiveCat, setlevelFiveCat] = useState([]);
	const [levelSixCat, setlevelSixCat] = useState([]);
	const [vendorApprovedList, setVendorApprovedList] = useState([]);
	const [selectedGalleryFilesReset, setSelectedGalleryFilesReset] =
		useState(false);
	const [selectedGalleryFiles, setSelectedGalleryFiles] = useState([]);
	const [selectedFeaturedFilesReset, setSelectedFeaturedFilesReset] =
		useState(false);
	const [selectedFeaturedFiles, setSelectedFeaturedFiles] = useState([]);
	const [levelOneCatSelected, setlevelOneCatSelected] = useState("");
	const [levelTwoCatSelected, setlevelTwoCatSelected] = useState("");
	const [levelThreeCatSelected, setlevelThreeCatSelected] = useState("");
	const [levelFourCatSelected, setlevelFourCatSelected] = useState("");
	const [levelFiveCatSelected, setlevelFiveCatSelected] = useState("");
	const [levelSixCatSelected, setlevelSixCatSelected] = useState("");
	const [mainLoading, setMainLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		getCategories();
		getVendorApproveList();
	}, []);

	const validationSchema = yup.object().shape({
		// name: yup.string().required("Name is required"),
		// description: yup.string().required("Description name is required"),
		// manufacturer: yup.string().required("Manufacturer name is required"),
		// availability: yup.string().required("Availability name is required"),
		// // categories: yup.array().required("Categories id is required"),
		// variations: yup.array().required("Variation id is required"),
		// approved_id: yup.string().required("Approved id is required"),
		// approved_name: yup.string().when("approved_id", {
		// 	is: (type) => type == "o",
		// 	then: () => yup.string().required("Approved name is required"),
		// }),
		// variations: yup.array().of(
		// 	yup.object().shape({
		// 		attribute: yup.string().required("Attribute is required"),
		// 		attributeValue: yup.string().required("Attribute value is required"),
		// 	})
		// ),
	});

	const initialValues = {
		name: "",
		description: "",
		manufacturer: "",
		availability: "",
		categories: [],
		status: 1,
		approved_id: "",
		approved_name: "",
		variations: [{ attribute: "", attributeValue: "" }],
	};

	const customSelectStyles = {
		control: (base) => ({
			...base,
			height: 50,
			minHeight: 50,
		}),
	};

	const getCategories = () => {
		setcatloading(true);
		categoryList()
			.then((rsp) => {
				setcatloading(false);
				let options = [];
				let parentOptions = [];
				rsp.data.map((item) => {
					options.push({ value: item?.id, label: item?.title });
					if (item.parent_id == 0) {
						parentOptions.push({ value: item?.id, label: item?.title });
					}
				});
				setCategories(rsp.data);
				setParentCategories(parentOptions);
			})
			.catch((error) => {
				setcatloading(false);
			});
	};
	const getChildCategories = (id, level) => {
		let childItems = categories.filter((item) => item.parent_id == id);
		let options = [];
		if (childItems.length > 0) {
			childItems.map((item) => {
				options.push({ value: item?.id, label: item?.title });
			});
		}
		if (level == 1) {
			setlevelOneCat(options);
			setlevelOneCatSelected(id);
			setlevelTwoCatSelected("");
			setlevelThreeCatSelected("");
			setlevelFourCatSelected("");
			setlevelFiveCatSelected("");
			setlevelSixCatSelected("");
		} else if (level == 2) {
			setlevelTwoCat(options);
			setlevelTwoCatSelected(id);
			setlevelThreeCatSelected("");
			setlevelFourCatSelected("");
			setlevelFiveCatSelected("");
			setlevelSixCatSelected("");
		} else if (level == 3) {
			setlevelThreeCat(options);
			setlevelThreeCatSelected(id);
			setlevelFourCatSelected("");
			setlevelFiveCatSelected("");
			setlevelSixCatSelected("");
		} else if (level == 4) {
			setlevelFourCat(options);
			setlevelFourCatSelected(id);
			setlevelFiveCatSelected("");
			setlevelSixCatSelected("");
		} else if (level == 5) {
			setlevelFiveCat(options);
			setlevelFiveCatSelected(id);
			setlevelSixCatSelected("");
		} else if (level == 6) {
			setlevelSixCat(options);
			setlevelSixCatSelected(id);
		} else {
		}
	};

	const getVendorApproveList = () => {
		vendorApproveList().then((res) => {
			let lists = res.data.map((s) => ({
				label: s.vendor_approve,
				value: s.id,
			}));
			lists.unshift({ label: "Select Vendor list", value: "" });
			lists.push({ label: "Other", value: "o" });
			setVendorApprovedList(lists);
		});
	};

	const submitHandler = (values) => {
		const payload = new FormData();
		payload.append(`name`, values.name);
		payload.append(`description`, values.description);
		payload.append(`manufacturer`, values.manufacturer);
		payload.append(`availability`, values.availability);
		payload.append(`status`, 1);
		payload.append(
			`approved_id`,
			values.approved_id == "o" ? "" : values.approved_id
		);
		payload.append(
			`approved_name`,
			values.approved_id == "o" ? values.approved_name : ""
		);
		payload.append(`variations`, JSON.stringify(values.variations));
		selectedGalleryFiles.forEach((file, i) => {
			payload.append(`gallery`, file, file.name);
		});
		selectedFeaturedFiles.forEach((file, i) => {
			payload.append(`featured`, file, file.name);
		});
		let selectedCategories = [
			levelOneCatSelected,
			levelTwoCatSelected,
			levelThreeCatSelected,
			levelFourCatSelected,
			levelFiveCatSelected,
			levelSixCatSelected,
		];
		selectedCategories = selectedCategories.filter((v) => v != "");
		payload.append(`categories`, JSON.stringify(selectedCategories));

		setMainLoading(true);
		addProducts(payload)
			.then((res) => {
				setMainLoading(false);
				router.push("/dashboard/vendor/product-management");
				toast(res.message);
			})
			.catch((error) => {
				console.log(error);
				setMainLoading(false);
			});
	};

	return (
		<>
			<section className="vendor-common-header sc-pt-80">
				<div className="container-fluid">
					<h1 className="heading">Product Management</h1>
					<Link
						href="/dashboard/vendor/product-management"
						className="page-link backBtn"
					>
						{" "}
						<FontAwesomeIcon icon={faArrowLeft} /> Go back
					</Link>
				</div>
			</section>
			<ToastContainer />
			<section className="add-prod-sec-1">
				{mainLoading && <Loader />}
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<div className="add-prod-con">
								<span className="title">Add Products</span>
								<Formik
									enableReinitialize={true}
									initialValues={initialValues}
									validationSchema={validationSchema}
									onSubmit={(values, { resetForm }) => {
										submitHandler(values);
									}}
								>
									{({
										errors,
										touched,
										values,
										handleChange,
										setFieldValue,
									}) => (
										<Form>
											<div className="row add-product">
												<div className="col-md-12">
													<FormikField
														label="Product Name"
														isRequired={true}
														name="name"
														touched={touched}
														errors={errors}
													/>
												</div>


												{!catloading && (
													<>
														<div className="col-md-3 category-ab">
															<div className="form-group">
																<Select
																	id={id}
																	options={parentCategories}
																	placeholder="Select Category"
																	isClearable={true}
																	styles={customSelectStyles}
																	onChange={(e) => {
																		setlevelOneCat([]);
																		setlevelTwoCat([]);
																		setlevelThreeCat([]);
																		setlevelFourCat([]);
																		setlevelFiveCat([]);
																		setlevelSixCat([]);
																		if (e && e.value) {
																			getChildCategories(e.value, "1");
																			setCat_id(e.value);
																			setFieldValue("categories", [e.value]);
																		} else {
																			setFieldValue("categories", []);
																		}
																	}}
																/>
															</div>
														</div>
														{levelOneCat && levelOneCat.length > 0 && (
															<div className="col-md-3">
																<div className="form-group">
																	<Select
																		options={levelOneCat}
																		placeholder="Select Sub Category"
																		isClearable={true}
																		styles={customSelectStyles}
																		onChange={(e) => {
																			if (e && e.value) {
																				getChildCategories(e.value, "2");
																				setCat_id(e.value);
																			} else {
																				setCat_id("");
																			}
																		}}
																	/>
																</div>
															</div>
														)}
														{levelTwoCat && levelTwoCat.length > 0 && (
															<div className="col-md-3">

																<Select
																	options={levelTwoCat}
																	placeholder="Select Sub Category"
																	isClearable={true}
																	styles={customSelectStyles}
																	onChange={(e) => {
																		if (e && e.value) {
																			getChildCategories(e.value, "3");
																			setCat_id(e.value);
																		} else {
																			setCat_id("");
																		}
																	}}
																/>

															</div>
														)}
														{levelThreeCat && levelThreeCat.length > 0 && (
															<div className="col-md-3">

																<Select
																	options={levelThreeCat}
																	placeholder="Select Sub Category"
																	isClearable={true}
																	styles={customSelectStyles}
																	onChange={(e) => {
																		if (e && e.value) {
																			getChildCategories(e.value, "4");
																			setCat_id(e.value);
																		} else {
																			setCat_id("");
																		}
																	}}
																/>

															</div>
														)}

														{levelFourCat && levelFourCat.length > 0 && (
															<div className="col-md-3">

																<Select
																	options={levelFourCat}
																	placeholder="Select Sub Category"
																	isClearable={true}
																	styles={customSelectStyles}
																	onChange={(e) => {
																		if (e && e.value) {
																			getChildCategories(e.value, "5");
																			setCat_id(e.value);
																		} else {
																			setCat_id("");
																		}
																	}}
																/>

															</div>
														)}

														{levelFiveCat && levelFiveCat.length > 0 && (
															<div className="col-md-3">

																<Select
																	options={levelFiveCat}
																	placeholder="Select Sub Category"
																	isClearable={true}
																	styles={customSelectStyles}
																	onChange={(e) => {
																		if (e && e.value) {
																			getChildCategories(e.value, "6");
																			setCat_id(e.value);
																		} else {
																			setCat_id("");
																		}
																	}}
																/>

															</div>
														)}
														{levelSixCat && levelSixCat.length > 0 && (
															<div className="col-md-3">

																<Select
																	options={levelSixCat}
																	placeholder="Select Sub Category"
																	isClearable={true}
																	styles={customSelectStyles}
																	onChange={(e) => {
																		if (e && e.value) {
																			getChildCategories(e.value, "7");
																			setCat_id(e.value);
																		} else {
																			setCat_id("");
																		}
																	}}
																/>
															</div>

														)}
													</>
												)}

												<div className="col-md-12">

													<FormikField
														label="Product Description"
														type="textarea"
														isRequired={true}
														name="description"
														touched={touched}
														errors={errors}
														className="text-editor-area"
														cols="30"
														rows="10"
													/>

												</div>

												<div className="col-md-8">

													<FormikField
														label="Manufacturer"
														isRequired={true}
														name="manufacturer"
														touched={touched}
														errors={errors}
													/>

												</div>

												<div className="col-md-4">

													<FormikField
														label="Availability"
														type="select"
														selectOptions={[
															{ label: "Select Availability", value: "" },
															{ label: "Unavailability", value: 0 },
															{ label: "Availability", value: 1 },
														]}
														isRequired={true}
														name="availability"
														touched={touched}
														errors={errors}
													/>

												</div>

												<div className="col-md-4">

													<FormikField
														label="Approved Vendor"
														type="select"
														selectOptions={vendorApprovedList}
														isRequired={true}
														name="approved_id"
														touched={touched}
														errors={errors}
													/>

												</div>

												{values.approved_id == "o" && (
													<div className="col-md-8">

														<FormikField
															label="Approved name"
															isRequired={true}
															name="approved_name"
															touched={touched}
															errors={errors}
														/>

													</div>
												)}

												<div className="col-md-12">
													<div className="row">
														<UploadFiles
															accept=".png, .jpg, .jpeg, .gif"
															upload={setSelectedGalleryFiles}
															reset={selectedGalleryFilesReset}
															label="Upload Product Images"
														/>
													</div>
												</div>

												<div className="col-md-12">
													<div className="row">
														<UploadFiles
															accept=".png, .jpg, .jpeg, .gif"
															upload={setSelectedFeaturedFiles}
															reset={selectedFeaturedFilesReset}
															label="Upload Featured Image"
															isMultiple={false}
														/>
													</div>
												</div>
												<div className="col-md-12">
													<div className="prod-spec-sec">
														<div className="specification ">
															<FieldArray name="variations">
																{({ push, remove }) => (
																	<>
																		{values.variations.map((field, index) => (
																			<div key={index} className="row">
																				<div className="col-md-3">

																					<Field
																						name={`variations.${index}.attribute`}
																						type="text"
																						placeholder="Attribute"
																					/>
																					<div className="form-error">
																						<ErrorMessage
																							name={`variations.${index}.attribute`}
																							className="form-error"
																						/>
																					</div>

																				</div>

																				<div className="col-md-3">

																					<Field
																						name={`variations.${index}.attributeValue`}
																						type="text"
																						placeholder="Attribute Value"
																					/>
																					<div className="form-error">
																						<ErrorMessage
																							name={`variations.${index}.attributeValue`}
																							className="form-error"
																						/>
																					</div>

																				</div>

																				{values.variations.length > 1 && (
																					<div className="col-md-3">

																						<Link
																							href="/"
																							onClick={(event) => {
																								event.preventDefault();
																								remove(index);
																							}}
																							className="page-link btn btn-primary"
																						>
																							Remove
																						</Link>

																					</div>
																				)}
																			</div>
																		))}
																		<button
																			type="button"
																			className="btn btn-primary"
																			onClick={() =>
																				push({
																					attribute: "",
																					attributeValue: "",
																				})
																			}
																		>
																			Add Field
																		</button>
																	</>
																)}
															</FieldArray>
														</div>
													</div>
												</div>
											</div>

											<button
												type="submit"
												className="page-link btn btn-secondary"
											>
												Save
											</button>
										</Form>
									)}
								</Formik>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default AddProducts;
