import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
const UploadFiles = ({
	noLabel,
	accept,
	upload,
	reset,
	preview,
	label,
	isMultiple = true,
}) => {
	const [uid, setUid] = useState();
	const [selectedFiles, setSelectedFiles] = useState(undefined);
	const [filePreviews, setFilePreviews] = useState([]);
	const [progressInfos, setProgressInfos] = useState(0);
	const [viewFiles, setViewFiles] = useState([]);

	useEffect(() => {
		setUid(Date.now() + (Math.random() * 100000).toFixed());
	}, []);

	useEffect(() => {
		if (reset) {
			setSelectedFiles(undefined);
			setFilePreviews([]);
			upload([]);
		}
	}, [reset]);

	useEffect(() => {
		if (preview) {
			setViewFiles(preview);
		}
	}, [preview]);

	const selectFiles = (event) => {
		let files = [];

		for (let i = 0; i < event.target.files.length; i++) {
			files.push(URL.createObjectURL(event.target.files[i]));
		}
		upload(Array.from(event.target.files));
		setSelectedFiles(Array.from(event.target.files));
		setFilePreviews(files);
	};

	const handleRemoveFile = (index) => {
		upload(selectedFiles.filter((_, i) => i !== index));
		setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
		setFilePreviews(filePreviews.filter((_, i) => i !== index));
	};

	return (
		<>
			<div className="col-md-12">
				<div className="form-group">
					{noLabel != "true" ? (
						<label htmlFor="">{label ? label : "Upload files"}</label>
					) : (
						""
					)}
					{isMultiple == true ? (
						<input
							type="file"
							data-multiple-caption="{count} files selected"
							className="file-control"
							multiple
							onChange={selectFiles}
							id={`file_upload${uid}`}
							accept={accept.toString()}
						/>
					) : (
						<input
							type="file"
							data-multiple-caption="{count} files selected"
							className="file-control"
							onChange={selectFiles}
							id={`file_upload${uid}`}
							accept={accept.toString()}
						/>
					)}

					<label htmlFor={`file_upload${uid}`} className="label-file">
						<span>Choose file</span>
					</label>
				</div>
				{progressInfos > 0 && (
					<div className="progress mb-3">
						<div
							className="progress-bar progress-bar-striped bg-success progress-bar-animated"
							role="progressbar"
							style={{ width: `${progressInfos}%` }}
							aria-valuenow={progressInfos}
							aria-valuemin="0"
							aria-valuemax="100"
						></div>
					</div>
				)}
			</div>
			{filePreviews &&
				filePreviews.map((img, i) => {
					return (
						<div
							className="col-md-2 doc-thumb"
							key={i}
							onClick={() => {
								handleRemoveFile(i);
							}}
						>
							<img
								className="preview"
								src={img}
								alt={"file-" + i}
								width={140}
								height={164}
								priority="true"
							/>
						</div>
					);
				})}
			{viewFiles &&
				viewFiles.map((item, i) => {
					return (
						<div className="col-md-2 doc-thumb hide-close" key={i}>
							<img
								className="preview"
								src={item.file_path}
								alt={"file-" + i}
								width={140}
								height={164}
								priority="true"
							/>
						</div>
					);
				})}
		</>
	);
};

export default UploadFiles;
