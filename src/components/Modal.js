// Images
import closeBtn from "../img/close_btn.png";
// React
import React, { useState, useEffect } from "react";
import Select from "react-select";
// CSS
import "./Modal.css";

const Modal = (props) => {
	const [enrich, loadEnrich] = useState([]);
	const [name, setName] = useState(props.nameInput);
	const [desc, setDesc] = useState(props.descInput);

	function handleEnrichmentChange(event) {
		fetch("http://localhost:3000/find-enrichment?name=" + event.value)
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				// Handle if enrichment is selected
				setName(json.enrichment.name);
				setDesc(json.enrichment.description);
				props.updateEnrichments();
			});
		fetch("http://localhost:3000/register-enrichment", {
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				enrichmentName: event.value,
				date: props.date,
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				console.log(json);
			});
	}

	useEffect(() => {
		fetch("http://localhost:3000/get-all-enrichments")
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				let enrichments = json.enrichments;
				const weekday = [
					"Sunday",
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
				];
				let dotw = weekday[new Date(props.date).getDay()];
				dotw = dotw.charAt(0).toUpperCase() + dotw.slice(1, 3);
				enrichments = enrichments.filter((e) => {
					return (
						(e.repeats &&
							e.repeatDays.find((d) => d.day === dotw) != null) ||
						(!e.repeats && new Date(e.singleDay).toDateString() ===
							new Date(props.date).toDateString())
					);
				});
				loadEnrich(enrichments);
			});
	}, []);

	return (
		<div>
			<div className="modal-bg" onClick={() => props.setIsOpen(false)} />
			<div className="selenium-modal">
				<img
					src={closeBtn}
					alt="Close button"
					className="modal-close-btn"
					onClick={() => props.setIsOpen(false)}
				/>
				<h2 className="modal-name">{name}</h2>
				<p className="modal-description">{desc}</p>
				{props.allowEnrichmentChange && (
					<Select
						className="modal-select"
						onChange={(e) => handleEnrichmentChange(e)}
						options={enrich.map((enr) => ({
							value: enr.name,
							label: enr.name,
						}))}
					></Select>
				)}
			</div>
		</div>
	);
};

export default Modal;
