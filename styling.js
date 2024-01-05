(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form_text">
			<fieldset>
			<legend>KPI Tile Value Properties</legend>
				<table>
					<tr>
						<td>Heading Text</td>
						<td><input id="kpi_heading" type="text" size="40" maxlength="40"></td>
					</tr>
					<tr>
						<td>Version Text</td>
						<td><input id="kpi_version" type="text" size="40" maxlength="40"></td>
					</tr>
					<tr>
						<td>Variance Text</td>
						<td><input id="kpi_variance" type="text" size="40" maxlength="40"></td>
					</tr>
				</table>
				<input type="submit" style="display:inline;">
		</fieldset>
		</form>


		<form id="form_style">
			<fieldset>
			<legend>KPI Tile Properties</legend>
				<table>
					<tr>
						<td>Color</td>
						<td><input id="styling_color" type="text" size="40" maxlength="40"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
		</fieldset>
		</form>
		
		
	`;

	class StandardKPIStyle extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form_text").addEventListener("submit", this._submittext.bind(this));
		}

		_submittext(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							color: this.color,
							title: this.title,
							version: this.version,
							varianc: this.variance
						}
					}
			}));
		}

		set title(newTitle) {
			this._shadowRoot.getElementById("kpi_heading").value = newTitle;
		}

		get title() {
			return this._shadowRoot.getElementById("kpi_heading").value;
		}

		set version(newVersion) {
			this._shadowRoot.getElementById("kpi_version").value = newVersion;
		}

		get version() {
			return this._shadowRoot.getElementById("kpi_version").value;
		}

		set variance(newVariance) {
			this._shadowRoot.getElementById("kpi_variance").value = newVariance;
		}

		get variance() {
			return this._shadowRoot.getElementById("kpi_variance").value;
		}

		set color(newColor) {
			this._shadowRoot.getElementById("styling_color").value = newColor;
		}

		get color() {
			return this._shadowRoot.getElementById("styling_color").value;
		}

	}

customElements.define("standard-kpi-tile-style", StandardKPIStyle);
})();