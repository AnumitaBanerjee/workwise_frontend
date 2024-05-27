import axiosInstance from "@/lib/axios";
import axiosFormData from "@/lib/axiosFormData";

export const searchProducts = (values, type = "products") => {
	if (type == "products") {
		let payload = {
			cat_id: values.cat_id,
			product_name: values.search_key,
			approve_by: values.approved_by,
		};

		return new Promise(async (resolve, reject) => {
			try {
				let response = await axiosInstance.post(
					`/products/product-search`,
					payload
				);
				resolve(response);
			} catch (error) {
				reject({ message: error });
			}
		});
	} else {
		let payload = {
			cat_id: values.cat_id,
			product_name: values.search_key,
			approve_by: values.approved_by,
		};

		return new Promise(async (resolve, reject) => {
			try {
				let response = await axiosInstance.post(
					`/products/vendor-list`,
					payload
				);
				resolve(response);
			} catch (error) {
				reject({ message: error });
			}
		});
	}
};

export const vendorProductList = (limit, page, productName, vendorApprove) => {
	return new Promise(async (resolve, reject) => {
		try {
			let response = await axiosInstance.get(
				`products/vendor-product-list?limit=${limit}&page=${page}&productName=${productName}&vendorApprove=${vendorApprove}`
			);
			resolve(response);
		} catch (error) {
			reject({ message: error });
		}
	});
};

export const addProducts = (payload) => {
	return new Promise(async (resolve, reject) => {
		try {
			let response = await axiosFormData.post(
				`${process.env.NEXT_PUBLIC_API_URL}/products/vendor-product-add`,
				payload
			);
			resolve(response);
		} catch (error) {
			reject({ message: error });
		}
	});
};

export const exportProduct = (
	limit,
	page,
	productName,
	vendorApprove,
	product_ids,
	downloadAll
) => {
	return new Promise(async (resolve, reject) => {
		try {
			let response = await axiosInstance.get(
				`products/vendor-product-list?limit=${limit}&page=${page}&productName=${productName}&vendorApprove=${vendorApprove}&download=true&product_ids=${product_ids}&downloadAll=${downloadAll}`,
				{
					responseType: "blob", // Set responseType to 'blob' to receive binary data
				}
			);
			resolve(response);
		} catch (error) {
			reject({ message: error });
		}
	});
};
