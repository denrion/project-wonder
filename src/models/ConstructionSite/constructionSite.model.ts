import { model } from 'mongoose';
import ConstructionSiteSchema from './constructionSite.schema';
import { IConstructionSiteDocument, IConstructionSiteModel } from './constructionSite.types';

const ConstructionSite = model<IConstructionSiteDocument, IConstructionSiteModel>(
  'ConstructionSite',
  ConstructionSiteSchema
);

export default ConstructionSite;
