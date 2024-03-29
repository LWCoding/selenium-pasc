// React
import { Link } from "react-router-dom";
// CSS
import "./Footer.css";

function Footer() {
	return (
		<div id="footer">
			<div id="footer-contents">
				<div id="footer-contents-left">
					<span>Walter Payton College Prep</span>
					<br />
					<span>1034 N WELLS CHICAGO IL, 60610</span>
					<br />
					<span>Phone Number: (773) 534-0034</span>
				</div>
				<div id="footer-contents-right">
					<Link to="/schedule">My Schedule</Link>
					<br />
					<Link to="/create">Propose an Enrichment</Link>
					<br />
					<span>
						<span className="not-mobile-inline">
							By Lucas Wang,{" "}
						</span>
						PASC 2022-23
					</span>
				</div>
			</div>
		</div>
	);
}

export default Footer;
