import axiosInstance from "@/lib/axios";

export const getCmsData = (page_id) => {  
	return new Promise(async (resolve, reject) => {
		try {
			let response = await axiosInstance.get(`/cms/get-cms-data/${page_id}`);
			resolve(response);
		} catch (error) {
			reject({ message: error });
		}
	});
};

export const getPageBanner = (page_id) => {  
	return new Promise(async (resolve, reject) => {
		try {
			let response = await axiosInstance.get(`/cms/home-banner/${page_id}`);
			resolve(response);
		} catch (error) {
			reject({ message: error });
		}
	});
};

export const getAboutProfiles = (type) => {  
	return new Promise(async (resolve, reject) => {
		try {
			let response = await axiosInstance.get(`/cms/management-list/${type}`);
			resolve(response);
		} catch (error) {
			reject({ message: error });
		}
	});
};

export const getFaqs = (type) => {  
	return new Promise(async (resolve, reject) => {
		try {
			let response = await axiosInstance.get(`/cms/faq-listing`);
			resolve(response);
		} catch (error) {
			reject({ message: error });
		}
	});
};

export const getBLOGS = (type) => {  
	return new Promise(async (resolve, reject) => {
		try {
			let response = await axiosInstance.get(`/cms/blog-listing`);
			resolve(response);
		} catch (error) {
			reject({ message: error });
		}
	});
};

export const getHomeMediaVideo = (type) => {  
	return new Promise(async (resolve, reject) => {
		try {
			let response = await axiosInstance.get(`/cms/media-section`);
			resolve(response);
		} catch (error) {
			reject({ message: error });
		}
	});
};

export const getHomeCompanies = (type) => {  
	return new Promise(async (resolve, reject) => {
		try {
			let response = await axiosInstance.get(`/cms/company-list`);
			resolve(response);
		} catch (error) {
			reject({ message: error });
		}
	});
};

export const getTestimonials = (type) => {  
	return new Promise(async (resolve, reject) => {
		try {
			let response = await axiosInstance.get(`/cms/testimonial-list`);
			resolve(response);
		} catch (error) {
			reject({ message: error });
		}
	});
};

export const getProducts = (type) => {  
	return new Promise(async (resolve, reject) => {
		try {
			let response = await axiosInstance.get(`/cms/product-list`);
			resolve(response);
		} catch (error) {
			reject({ message: error });
		}
	});
};