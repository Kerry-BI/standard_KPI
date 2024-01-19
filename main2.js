(function() { 
	const template = document.createElement('template')
	template.innerHTML = `
	<div id="KPITile" class="kpi-tile">
		<div id="title" class="heading-text">Heading</div>
  		<div class="kpi-content">
    		<div id="VersionText" class="version-text">Version 1.0</div>
   			<div id="VarianceText" class="variance-text">Variance: +10%</div>
			<div id="arrow" class="arrow"></div> <!-- Added div for the arrow -->
  		</div>
	</div>


	<style>
	/* Styles for the KPI tile */
	.kpi-tile {
	  width: 100%; /* Adjust width as needed */
	  height: 100%; /* Adjust height as needed */
	  background-color: #ffffff; /* White background */
	  border-radius: 10px; /* Rounded corners */
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: Adding a subtle shadow */
	}
	
	/* Styles for the content within the KPI tile */
	.kpi-content {
	  text-align: center;
	}

	/* Styles for the heading text */
	.heading-text {
	position: absolute;
	top: 10px;
	left: 10px;
	font-size: 14px; /* Adjust font size as needed */
	}
	
	/* Styles for the version text */
	.version-text {
	  font-size: 18px; /* Adjust font size as needed */
	  font-weight: bold;
	  margin-bottom: 10px; /* Spacing between texts */
	}
	
	/* Styles for the variance text */
	.variance-text {
	  font-size: 14px; /* Adjust font size as needed */
	}

	/* Styles for the arrow */
	.arrow {
		position: absolute;
		bottom: 10px;
		right: 10px;
		width: 20px; /* Adjust arrow size as needed */
		height: 20px; /* Adjust arrow size as needed */
		background-repeat: no-repeat;
		background-size: contain;
	}

	/* Green up arrow */
	.arrow.green {
		background-image: url('https://kerry-bi.github.io/standard_KPI/upArrowGreen.png'); /* the path to green arrow image */
	}

	/* Red down arrow */
	.arrow.red {
		background-image: url('https://kerry-bi.github.io/standard_KPI/downArrowRed.png'); /*  the path to red arrow image */
	}
	</style>
	
	`;

	class KPItile extends HTMLElement {
		constructor() {
			super(); 
			this._shadowRoot = this.attachShadow({mode: 'open'});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			console.log("example");
			this._rootVersion = this._shadowRoot.getElementById('VersionText');
			this._rootVariance = this._shadowRoot.getElementById('VarianceText');
			this._rootTile = this._shadowRoot.getElementById('KPITile');
			this._rootTitle = this._shadowRoot.getElementById('title');
			this._rootArrow = this._shadowRoot.getElementById('arrow');
			
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
			console.log("example render");
			}

			onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
			}

			onCustomWidgetAfterUpdate(changedProperties) {
			if ("color" in changedProperties) {
				//this._rootTile.style["background-color"] = changedProperties["color"];
			}

			if ("title" in changedProperties) {
				this._rootTitle.textContent = changedProperties["title"];
			}

			if ("version" in changedProperties) {
				//this._rootTile.style["background-color"] = changedProperties["color"];
				this._rootVersion.textContent = changedProperties["version"];
			}

			if ("variance" in changedProperties) {
				//this._rootTile.style["background-color"] = changedProperties["color"];
				this._rootVariance.textContent = changedProperties["variance"];
			}

			if ("showArrows" in changedProperties) {
				if(changedProperties["showArrows"] = "true"){
					//this._rootArrow.style.display = "block"
					this._rootArrow.style.visibility = "visible";

				}else if(changedProperties["showArrows"] = "false"){
					//this._rootArrow.style.display = "none"
					this._rootArrow.style.visibility = "hidden";


				}
			}

			if ("arrowColor" in changedProperties) {
				if(changedProperties["arrowColor"] = "green"){
					//show green arrow
					this._rootArrow.classList.remove("red");
					this._rootArrow.classList.add("green");

				}else if(changedProperties["arrowColor"] = "red"){
					//show red arrow
					this._rootArrow.classList.remove("green");
					this._rootArrow.classList.add("red");

				}else{
					//hide arrow 
				}
			}

		

			

			// if("radius" in changedProperties) {
			// 	this._rootTile.style.borderRadius =  changedProperties["radius"];
			// }
				
			}

			onCustomWidgetResize (width, height) {
				
			  }
		}
	  
		customElements.define('standard-kpi-tile', KPItile)
	  })()