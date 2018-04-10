import * as React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { IGoogleMapProps } from './IGoogleMapsProps';
import { IProvidersProps } from './IProvidersProps';
import Geocode from "react-geocode";
import Providers from './Providers';
import * as _ from 'lodash';

const apiKey = "AIzaSyDinAigAuWmlsdWhz7vDdE3VBsP-OXJ_Io";
Geocode.setApiKey(apiKey);

export class GoogleMap extends React.Component<IGoogleMapProps, any> {
  constructor (props) {
    super(props);
  }

  state = {
    markerLat: 0,
    markerLng: 0,
    activeMarker:{},
    region: '',
    showMarker: false,
    showInfoWindow: false
  }

  private style: any = {
    width: '100%',
    height: '100%'
  }

  private onMapClicked = (mapProps, map, clickEvent) => {
    this.setState((state) => {
      state.markerLat = clickEvent.latLng.lat(),
      state.markerLng = clickEvent.latLng.lng(),
      state.showMarker = true,
      state.showInfoWindow = false
    });
  }

  private onMarkerClick = (props, marker, e) => {
    Geocode.fromLatLng(marker.position.lat(), marker.position.lng()).then(
      response => {
        this.setState((state) => {
          state.activeMarker = marker
          state.region = this.getAdministrativeArea(response.results);
          state.showInfoWindow = true;
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  private getAdministrativeArea = (results) => {
    const firstResult: any = _.head(results);
    var filtered = _.filter(firstResult.address_components, function(o: any) {
       return _.head(o.types) == 'administrative_area_level_1'; }
    );
    if(filtered.length >= 0)
      return filtered[0].long_name;
    else
      return null;
  }

  public render(): React.ReactElement<IGoogleMapProps> {
    return (
      <div style={{height: '400px'}}>
        <Map google={this.props.google} style= {this.style} initialCenter={{lat: this.props.initialLat, lng: this.props.initialLon}} zoom={this.props.zoomLevel} onClick={this.onMapClicked}>
          <Marker visible={this.state.showMarker} onClick={this.onMarkerClick} position={{lat: this.state.markerLat, lng: this.state.markerLng}} />
          <InfoWindow marker={this.state.activeMarker} visible={this.state.showInfoWindow}>
            <div>
              <h2>{this.state.region}</h2>
              <Providers providers={this.props.providers} region={this.state.region} />
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: apiKey
  })(GoogleMap);


