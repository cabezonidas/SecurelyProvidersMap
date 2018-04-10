import * as React from 'react';
import styles from './ProvidersMap.module.scss';
import { IProvidersProps } from './IProvidersProps';
import * as _ from 'lodash';
import axios from 'axios';
var v = require('voca');

export default class Providers extends React.Component<IProvidersProps, any> {

  constructor (props) {
    super(props);
  }


  public render(): React.ReactElement<IProvidersProps> {
    
    const region = this.props.region;
    const providers = _.filter(this.props.providers, function (o: any) {
      return v.matches(v.lowerCase(v.camelCase(region)), v.lowerCase(v.camelCase(o.Title)))    
    });
    
    return (
      <div>
        {providers.map(provider => 
            <div dangerouslySetInnerHTML={{__html: provider.Providers}}> 
            </div>
          )}
      </div>
    );
  }
}