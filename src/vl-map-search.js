import { VlElement } from '/node_modules/vl-ui-core/vl-core.js';
import '/node_modules/vl-ui-select/vl-select.js';

/**
 * VlMapSearch
 * @class
 * @classdesc De kaart zoek op adres component.
 * 
 * @extends VlElement
 */
export class VlMapSearch extends VlElement(HTMLElement) {
    constructor() {
        super(`
            <style>
                @import '/node_modules/vl-ui-select/style.css';
            </style>
            <select is="vl-select" data-vl-select data-vl-select-search-empty-text="Geen adres gevonden"></select>
        `);
        this._configure();
    }

    connectedCallback() {
        this._addSearchEventListener();
        this._addChoiceEventListener();
    }

    get _selectElement() {
        return this._shadow.querySelector('select');
    }

    get _parentElement() {
        if (this.parentNode) {
            return this.parentNode.host || this.parentNode;
        }
    }

    _addSearchEventListener() {
        if (!this.__searchEventListenerRegistered) {
            this.__searchEventListenerRegistered = true;
            this._selectElement.addEventListener('search', (event) => {
                if (event && event.detail && event.detail.value) {
                    fetch('http://loc.geopunt.be/v4/Suggestion?q=' + event.detail.value)
                        .then((response) => {
                            return response.json();
                        }).then((data) => {
                            if (data && data.SuggestionResult) {
                                const resultaten = data.SuggestionResult.map((resultaat) => {
                                    return {
                                        value: resultaat,
                                        label: resultaat
                                    }
                                });
                                this._selectElement.choices = resultaten;
                            }
                        });
                }
            });
        }
    }

    _addChoiceEventListener() {
        if (!this.__choiceEventListenerRegistered) {
            this.__choiceEventListenerRegistered = true;
            this.__choiceEventListener = this._selectElement.addEventListener('choice', (event) => {
                if (event && event.detail && event.detail.choice) {
                    fetch('http://loc.geopunt.be/v4/Location?q=' + event.detail.choice.value)
                        .then((response) => {
                            return response.json();
                        }).then((data) => {
                            if (data && data.LocationResult) {
                                this._parentElement.zoomTo([data.LocationResult[0].BoundingBox.LowerLeft.X_Lambert72, data.LocationResult[0].BoundingBox.LowerLeft.Y_Lambert72, data.LocationResult[0].BoundingBox.UpperRight.X_Lambert72, data.LocationResult[0].BoundingBox.UpperRight.Y_Lambert72]);
                            }
                        });
                }
            });
        }
    }

    _configure() {
        customElements.whenDefined('vl-map').then(() => {
            if (this._parentElement && this._parentElement.map) {
                this._parentElement._shadow.prepend(this);
                this._parentElement.style.setProperty('--vl-map--margin-top', "35px");
            }
        });
    }
}