import{VlElement as e}from"../../../../../../../node_modules/vl-ui-core/vl-core.js";class t extends(e(HTMLElement)){constructor(){super("\n            <style>\n                @import '../style.css';\n\n                :host {\n                    display: block;\n                    position: relative;\n                }\n\n                #map {\n                    width: 100%;\n                    height: var(--vl-map-height, 500px);\n                }\n\n                .ol-overviewmap-map {\n                    width: 100px;\n                    height: 100px;\n                }\n            </style>\n\n            <div id=\"map\"></div>\n        ")}get map(){return this._map}get disableEscapeKey(){return null!=this.getAttribute("disable-escape-key")}get _geoJSON(){return this.__geoJSON||(this.__geoJSON=new ol.format.GeoJSON),this.__geoJSON}get _mapElement(){return this._shadow.querySelector("#map")}get _projection(){return new ol.proj.Projection({code:"EPSG:31370",extent:this._extent})}get _extent(){return[9928,66928,272072,329072]}connectedCallback(){this.__initializeCoordinateSystem(),this._map=new acd.ol.CustomMap({actions:[],disableEscapeKey:this.disableEscapeKey,customLayers:{baseLayerGroup:this.__createLayerGroup("Basis lagen",[]),overviewMapLayers:[],overlayGroup:this.__createLayerGroup("Lagen",[])},projection:this._projection,target:this._mapElement}),this._map.initializeView()}__createLayerGroup(e,t){return new ol.layer.Group({title:e,layers:t})}__initializeCoordinateSystem(){proj4.defs("EPSG:31370","+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs")}}class r extends(e(HTMLElement)){static get _observedAttributes(){return["auto-extent","features"]}constructor(){super(),r._counter=0,this.__geoJSON=new ol.format.GeoJSON,this.__counter=++r._counter}connectedCallback(){this._layer=this.__createLayer(this._name,this._features),this._map&&(this._map.getOverlayLayers().push(this._layer),this.__zoomToExtent())}static get _counter(){return this.__counter}static set _counter(e){this.__counter=e}get layer(){return this._layer}get source(){return this._source}get _name(){return this.getAttribute("name")||"kaartlaag"}get _autoExtent(){return null!=this.getAttribute("auto-extent")}get _cluster(){return null!=this.getAttribute("cluster")}get _clusterDistance(){return this.getAttribute("cluster-distance")}get _features(){const e=this.getAttribute("features");return e?this.__geoJSON.readFeatures(e):[]}get _map(){if(this.parentNode)return this.parentNode.map}get style(){if(this._layer)return this._layer.getStyle()}set style(e){this._style=e,this._layer.setStyle(e)}verwijderFeatureStijlen(){this._source&&this._source.getFeatures()&&this._source.getFeatures().forEach(e=>{e.setStyle(null)})}rerender(){this._map&&this._map.render()}getFeature(e){if(this._source&&this._source.getFeatures())return this._source.getFeatures().filter(t=>t.getId()===e)[0]}getCluster(e){if(this._layer)return this._layer.getSource().getFeatures().filter(t=>{const r=t.get("features");return!!r&&r.some(t=>t.getId()===e)})[0]}_auto_extentChangedCallback(e,t){this.__zoomToExtent()}_featuresChangedCallback(e,t){t&&this._layer&&(this._source.clear(),this._source.addFeatures(this._features),this.__zoomToExtent(),this.rerender())}__zoomToExtent(){this._map&&this._autoExtent&&this._map.zoomToExtent(this.__getBoundingbox())}__createLayer(e,t){const r=new ol.layer.Vector({title:e,source:this.__createSource(t),updateWhileAnimating:!0,updateWhileInteracting:!0});return r.set("id",this.__counter),r}__createSource(e){return this._source=new ol.source.Vector({features:e}),this._cluster?this.__createClusterSource(this._source):this._source}__createClusterSource(e){return new ol.source.Cluster({distance:this._clusterDistance,source:e,geometryFunction:e=>{const t=e.getGeometry();return t instanceof ol.geom.Point?t:this.__negeerClustering()}})}__getBoundingbox(){let e;return this._source&&this._source.getFeatures().length>0&&(e=this._source.getExtent()),e}__negeerClustering(){return null}}class s extends(e(HTMLElement)){connectedCallback(){this._map.addBaseLayerAndOverlayMapLayer(this._createBaseLayer(),this._createBaseLayer())}get type(){return this.getAttribute("type")||"wmts"}get url(){return this.getAttribute("url")}get layer(){return this.getAttribute("layer")}get title(){return this.getAttribute("title")}get _map(){if(this.parentNode)return this.parentNode.map}get _projection(){if(this.parentNode)return this.parentNode._projection}get _WMTSSource(){return this._wmtsSource=this._wmtsSource||this._createWMTSSource(),this._wmtsSource}get _vectorSource(){return this._createdVectorSource=this._createdVectorSource||this._createVectorSource(),this._createdVectorSource}_createWMTSSource(){let e=ol.extent.getWidth(this._projection.getExtent())/256,t=new Array(16),r=new Array(16);for(let s=0;s<16;++s)t[s]=e/Math.pow(2,s),r[s]=s;return new ol.source.WMTS({url:this.url,layer:this.layer,matrixSet:"BPL72VL",format:"image/png",projection:this._projection,tileGrid:new ol.tilegrid.WMTS({extent:this._projection.getExtent(),origin:ol.extent.getTopLeft(this._projection.getExtent()),resolutions:t,matrixIds:r}),style:""})}_createVectorSource(){var e=this;return new ol.source.Vector({format:new ol.format.GeoJSON({defaultDataProjection:e._projection}),url:function(){return e.url+"&typeName="+e.layer},strategy:ol.loadingstrategy.bbox})}_createBaseLayer(){switch(this.type){case"wmts":return new ol.layer.Tile({title:this.title,type:"base",source:this._WMTSSource});case"wfs":return new ol.layer.Vector({source:this._vectorSource,style:new ol.style.Style({stroke:new ol.style.Stroke({color:"rgba(0, 0, 0, 1.0)",width:1}),fill:new ol.style.Fill({color:"rgba(255, 0, 0, 1.0)"})})})}}}class i extends s{constructor(){super(),this.setAttribute("url","https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts"),this.setAttribute("layer","grb_bsk_grijs"),this.setAttribute("title","GRB basis laag grijs")}}class o extends s{constructor(){super(),this.setAttribute("url","https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts"),this.setAttribute("layer","grb_bsk"),this.setAttribute("title","GRB basis laag")}}class n extends s{constructor(){super(),this.setAttribute("url","https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts"),this.setAttribute("layer","omwrgbmrvl"),this.setAttribute("title","GRB ortho laag")}}class a extends(e(HTMLElement)){connectedCallback(){this._setStyleOnParent()}get color(){return this.getAttribute("color")||"rgba(255, 255, 255, 1)"}get textColor(){return this.getAttribute("text-color")||"#FFF"}get textOffsetX(){return this.getAttribute("text-offset-x")||0}get textOffsetY(){return this.getAttribute("text-offset-y")||0}get style(){return console.info("opgelet vl-map-layer-style is abstract en zal geen stijl toevoegen aan de kaartlaag"),null}_hasUniqueStyles(e){const t=this._getStyles(e);return t&&this._containsObject(t)&&this._areIdentical(t)}_containsStyle(e){return this._containsObject(e.map(e=>e.getStyle()))}_getStyles(e){return e.map(e=>e.getStyle())}_containsObject(e){return e.some(e=>!!e)}_areIdentical(e){return e.every((e,t,r)=>e==r[0])}_setStyleOnParent(){if(this.parentElement)return this.parentElement.style=this.style}}class l extends a{get size(){return this.getAttribute("size")||5}get borderColor(){return this.getAttribute("border-color")||"rgba(0, 0, 0, 1)"}get borderSize(){return this.getAttribute("border-size")||1}get clusterTextColor(){return this.getAttribute("cluster-text-color")||"#FFF"}get clusterColor(){return this.getAttribute("cluster-color")||"rgba(0, 0, 0, 0)"}get style(){return(e,t)=>{const r=e&&e.get&&e.get("features")||[],s=r.length||1,i=1==s?1:Math.max(1.5,s.toString().length),o=s>1?s.toString():"";let n=this.textColor,a=this.color,l=this.borderColor,u=this.borderSize,c=s>1?this.size*i:this.size;if(this.parentElement&&this.parentElement.cluster)if(this._hasUniqueStyles(r)){let e=r[0].getStyle();e instanceof Function&&(e=e());const t=e.getImage();a=t.getFill().getColor(),l=t.getStroke().getColor(),u=t.getStroke().getWidth(),c=s>1?t.getRadius()*i:t.getRadius()}else this._containsStyle(r)&&(a=this.clusterColor,n=this.clusterTextColor);return new ol.style.Style({image:new ol.style.Circle({fill:new ol.style.Fill({color:a}),stroke:new ol.style.Stroke({color:l,width:u}),radius:c}),text:new ol.style.Text({text:o,font:"12px Flanders Art",fill:new ol.style.Fill({color:n}),offsetX:this.textOffsetX,offsetY:this.textOffsetY})})}}}(()=>{function e(e,t,r){if(!document.head.querySelector("#"+e)){const s=document.createElement("script");s.setAttribute("id",e),s.setAttribute("src",t),s.async=!1,s.defer=!1,s.onload=r,document.head.appendChild(s)}}e("VlMap-openlayers","/node_modules/vl-mapactions/lib/openlayers/dist/ol.js"),e("VlMap-proj4","/node_modules/proj4/dist/proj4.js"),e("VlMap-mapactions","/node_modules/vl-mapactions/dist/mapactions-min.js",()=>{customElements.define("vl-map",t),customElements.define("vl-map-layer",r),customElements.define("vl-map-baselayer",s),customElements.define("vl-map-baselayer-grb-gray",i),customElements.define("vl-map-baselayer-grb",o),customElements.define("vl-map-baselayer-grb-ortho",n),customElements.define("vl-map-layer-style",a),customElements.define("vl-map-layer-circle-style",l)})})();export{t as VlMap,s as VlMapBaseLayer,o as VlMapBaseLayerGRB,i as VlMapBaseLayerGRBGray,n as VlMapBaseLayerGRBOrtho,r as VlMapLayer,l as VlMapLayerCircleStyle,a as VlMapLayerStyle};
