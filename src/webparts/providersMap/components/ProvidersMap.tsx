import * as React from 'react';
import styles from './ProvidersMap.module.scss';
import { IProvidersMapProps } from './IProvidersMapProps';
import GoogleMap from './GoogleMap';
import axios from 'axios';

export default class ProvidersMap extends React.Component<IProvidersMapProps, any> {
  state = {
    initialMsg: '',
    providers: [],
    providersReady: false
  };
  public render(): React.ReactElement<IProvidersMapProps> {
    return (
    <div>
      {
        this.state.providersReady == true ?
        (
          <GoogleMap providers={this.state.providers} zoomLevel={6} initialLat={-38.297354040177604} initialLon={175.96374702652213} apiKey={this.props.apiKey}/>
        ) : 
        (
          <div>{this.state.initialMsg}</div>
        )
      }
    </div>
    );
  }
  componentDidMount() {
    axios.get("/sites/ElectraServicesLtd/_api/web/lists/GetByTitle('Region Providers')/items")
    .then(response => {
      this.setState({ 
        providers: response.data.value,
        providersReady: true
      });
    })
    .catch(error => {
      this.setState({
        initialMsg: 'No regions were found.'
      })
    });
  }
}