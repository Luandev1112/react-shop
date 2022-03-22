import React from 'react';
import logoPlaceholder from '@assets/placeholders/logo.svg';
const siteSettings = {
  name: 'PickBazar E-commerce Shop',
  description: '',
  currencyCode: 'USD',
  logo: logoPlaceholder,
};

type State = typeof initialState;

const initialState = {
  siteTitle: siteSettings.name,
  siteSubtitle: siteSettings.description,
  currency: siteSettings.currencyCode,
  logo: {
    id: 1,
    thumbnail: siteSettings.logo,
    original: siteSettings.logo,
  },
  seo: {
    metaTitle: '',
    metaDescription: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: {
      id: 1,
      thumbnail: '',
      original: '',
    },
    twitterHandle: '',
    twitterCardType: '',
    metaTags: '',
    canonicalUrl: '',
  },
  google: {
    isEnable: false,
    tagManagerId: '',
  },
  facebook: {
    isEnable: false,
    appId: '',
    pageId: '',
  },
  contactDetails: {
    socials: [],
    contact: '',
  },
};

export const SettingsContext = React.createContext<State | any>(initialState);

SettingsContext.displayName = 'SettingsContext';

export const SettingsProvider: React.FC<{ initialValue: any }> = ({
  initialValue,
  ...props
}) => {
  const [state] = React.useState(initialValue ?? initialState);
  return <SettingsContext.Provider value={state} {...props} />;
};

export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (context === undefined) {
    throw new Error(`useSettings must be used within a SettingsProvider`);
  }
  return context;
};
