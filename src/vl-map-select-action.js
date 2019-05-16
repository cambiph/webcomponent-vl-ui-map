import { VlMapAction } from "./vl-map-action.js";

/**
 * VlMapSelectAction
 * @class
 * @classdesc De kaart selecteer actie component. <a href="demo/vl-map.html">Demo</a>.
 * 
 * @extends VlElement
 */
export class VlMapSelectAction extends VlMapAction {
    constructor() {
        super();
        this._onSelect = () => {
            console.info('er is geen onSelect functie gedefinieerd!');
        };
    }

    get style() {
        return this._style;
    }
    
    set style(style) {
        this._style = style;
    }

    mark(id) {
        if (this._action && id) {
            this._action.hoverFeatureWithId(id, this.layer);
        }
    }
    
    removeMarks() {
        if (this._action) {
            this._action.dehoverAllFeatures();
        }
    }

    select(feature) {
        if (this._action && feature) {
            this._action.selectFeature(feature);
        }
    }

    onSelect(callback) {
        this._onSelect = callback;
    }

    reset() {
        if (this._action) {
            this._action.clearFeatures();
        }
    }
    
    _createAction(layer) {
        return new acd.ol.action.SelectAction(layer, (args) => {
            this.__featuresGeselecteerd(args);
            this._onSelect(args);
        }, {
            style: this._style
        });
    }

    __featuresGeselecteerd(data) {
        if (data) {
            this.__geselecteerdeFeatures = data.get('features') || [data];
        } else {
            this.__geselecteerdeFeatures = null;
        }
    };

    _rerender() {
        if (this.__geselecteerdeFeatures) {
            this.reset();
            this.__geselecteerdeFeatures.forEach((feature) => this.mark(feature.getId()));
        }
    }
}