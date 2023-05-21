import React  from 'react';
import ReactDOM from 'react-dom/client';


import { BrowserRouter } from 'react-router-dom';
import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import {  initReactI18next } from "react-i18next";
import HttpApi from 'i18next-http-backend';
import './index.css';
import App from './components/component/App/App'
import { Suspense } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
 .use(HttpApi)
  .init({ 
    supportedlngs:['en','ar'],  
    fallbackLng: "en",
    detection:{
        order: ['cookie', 'htmlTag', 'localStorage',   'path', 'subdomain'],
        caches:['cookie'],
   },
   backend:{
    loadPath: '/assets/locales/{{lng}}/translation.json',
   },
   
  });

const loadinMarkup=(
  <div className='py-4 text-center'><h2>loading..</h2> </div>
   )
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Suspense fallback={loadinMarkup}>
 <BrowserRouter>
<App/>
 </BrowserRouter>
 </Suspense>
);


