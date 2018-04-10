import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ProvidersMapWebPartStrings';
import ProvidersMap from './components/ProvidersMap';
import { IProvidersMapProps } from './components/IProvidersMapProps';

export interface IProvidersMapWebPartProps {
  description: string;
  apiKey: string;
}

export default class ProvidersMapWebPart extends BaseClientSideWebPart<IProvidersMapWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IProvidersMapProps > = React.createElement(
      ProvidersMap,
      {
        description: this.properties.description,
        apiKey: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('apiKey', {
                  label: strings.ApiKeyFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
