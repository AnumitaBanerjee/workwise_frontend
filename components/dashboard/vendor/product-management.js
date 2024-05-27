import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { exportProduct, vendorProductList } from "@/services/products";
import Loader from "@/components/shared/Loader";
import { getVendorApproveList } from "@/services/Auth";
import Select from "react-select";

const ProductManagement = () => {
	const id = Date.now().toString();
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [vendorApproveList, setVendorApproveList] = useState([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);
	const [selectedVendor, setSelectedVendor] = useState("");
	const [search, setSearch] = useState("");

	const getProducts = () => {
		setLoading(true);
		setProducts([]);
		vendorProductList(limit, page, search, selectedVendor)
			.then((res) => {
				setLoading(false);
				setTotalPages(Math.ceil(res.total_count / limit));
				res.data.map((item) => (item.isChecked = false));
				setProducts(res.data);
			})
			.catch((err) => {
				setLoading(false);
			});
	};

	const customSelectStyles = {
		control: (base) => ({
			...base,
			height: "52px",
			maxWidth: "300px",
			borderRadius: "6px",
			paddingLeft: "10px",
			marginRight: "15px",
		}),
	};

	const getVendorApproveLists = () => {
		getVendorApproveList().then((res) => {
			let result = res.data.map((item) => ({
				value: item.id,
				label: item.vendor_approve,
			}));
			setVendorApproveList(result);
		});
	};

	const getSubCats = (item) => {
		let cats = "";
		if (item.product_categories.length > 1) {
			item.product_categories.map((cat, index) => {
				if (index > 0) {
					cats = (
						<>
							{cats}
							<span className="badge badge-primary">{cat.category_name}</span>
						</>
					);
				}
			});
		}
		return cats;
	};
	const selectProduct = (e, citem) => {
		let pp = [];
		//item.isChecked = e.target.checked;
		pp = products.map((item) => {
			if (item.id === citem.id) {
				item.isChecked = e.target.checked;
			}
			return item;
		});
		setProducts(pp);
	};
	const selectAllProduct = (e, item) => {
		let pp = [];
		if (e.target.checked) {
			pp = products.map((item) => {
				item.isChecked = true;
				return item;
			});
		} else {
			pp = products.map((item) => {
				item.isChecked = false;
				return item;
			});
		}
		setProducts(pp);
	};

	const exportProducts = () => {
		const checkedProduct = products.reduce(
			(acc, ele) => (ele.isChecked == true ? acc.concat(ele.id) : acc),
			[]
		);
		console.log(checkedProduct);
		setLoading(true);
		exportProduct(
			limit,
			page,
			search,
			selectedVendor,
			checkedProduct.length > 0 ? JSON.stringify([119, 132]) : [],
			checkedProduct.length > 0 ? false : true
		)
			.then((res) => {
				setLoading(false);
				const downloadLink = document.createElement("a");
				downloadLink.href = window.URL.createObjectURL(res);
				downloadLink.setAttribute("download", "export_product.xlsx"); // Set desired file name
				document.body.appendChild(downloadLink);

				// Trigger the download
				downloadLink.click();

				// Cleanup
				document.body.removeChild(downloadLink);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	useEffect(() => {
		getProducts();
		getVendorApproveLists();
	}, []);
	useEffect(() => {
		getProducts();
	}, [page, limit]);

	return (
		<>
			<section className="vendor-common-header sc-pt-80">
				<div className="container-fluid">
					<h1 className="heading">Product Management</h1>
				</div>
			</section>

			<section className="vendor-mngt-sec-1">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<div className="vendor-mngt-con">
								{/* Content for Manage RFQs tab */}
								<span className="title">Products</span>
								<div className="filter">
									<div className="row">
										<div className="col-md-5">
											<div className="filter-options">
												<input
													type="search"
													name="search"
													placeholder="Search"
													defaultValue={search}
													onChange={(e) =>
														setSearch(e.target.value ? e.target.value : "")
													}
												/>
												<Select
													id={id}
													options={vendorApproveList}
													placeholder="Search here"
													styles={customSelectStyles}
													isClearable={true}
													id="long-value-select"
													instanceId="long-value-select"
													onChange={(e) => setSelectedVendor(e ? e.value : "")}
												/>
											</div>
										</div>
										<div className="col-md-7">
											<div className="action-btm">

												<button
													className="btn btn-primary"
													onClick={() => {
														getProducts();
													}}
												>
													Search
												</button>

												<Link href="add-products" className="btn btn-secondary">
													Add Product
												</Link>

												<Link
													href="#"
													className="btn btn-primary"
													onClick={() => {
														exportProducts();
													}}
												>
													Export
												</Link>

												<Link href="#" className="btn btn-secondary primary">
													Import
												</Link>

											</div>
										</div>
									</div>
								</div>

								<div className="details-table">
									{loading && <Loader />}
									<div className="table-responsive">
										<table className="table table-striped ">
											<thead>
												<tr>
													<th scope="col">
														<input
															type="checkbox"
															name="select_all_products"
															value=""
															onClick={(e) => selectAllProduct(e)}
														/>
													</th>
													<th scope="col">Name of product</th>
													<th scope="col">Product Status</th>
													<th scope="col">Category</th>
													<th scope="col">Sub Category</th>
													<th scope="col">Action</th>
												</tr>
											</thead>
											<tbody>
												{products &&
													products.map((item) => {
														return (
															<>
																<tr key={item.id}>
																	<td>
																		<input
																			type="checkbox"
																			name="select_product"
																			checked={item.isChecked}
																			value=""
																			onClick={(e) => selectProduct(e, item)}
																		/>
																	</td>
																	<td>{item.name}</td>
																	<td>
																		{item.status == 1 ? "Active" : "Inactive"}
																	</td>
																	<td className="subcatstd">
																		<span className="badge badge-warning">
																			{item.product_categories.length > 0
																				? item.product_categories[0].category_name
																				: "-"}
																		</span>
																	</td>
																	<td className="subcatstd">
																		{getSubCats(item)}
																	</td>
																	<td>
																		<span>
																			<Link href="#" className="page-link">
																				Edit
																			</Link>
																		</span>
																	</td>
																</tr>
															</>
														);
													})}
												{products.length == 0 && (
													<tr>
														<td colSpan="6">No products found.</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>

									<div className="pagination">
										{Math.ceil(totalPages / limit) > 1 && (
											<>
												<div
													className="arrow-prev"
													onClick={() => {
														setPage((prevState) => {
															return prevState - 1;
														});
													}}
												>
													<FontAwesomeIcon icon={faChevronLeft} />
												</div>
												<div
													className="arrow-next"
													onClick={() => {
														setPage((prevState) => {
															return prevState + 1;
														});
													}}
												>
													<FontAwesomeIcon icon={faChevronRight} />
												</div>
											</>
										)}

										<span>Page</span>
										<input type="number" value={page} />
										<span> of {Math.ceil(totalPages / limit)}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ProductManagement;
