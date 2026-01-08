export type Food = {
  id?: number;
  name: string;
  slug?: string;
  description?: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatsPer100g: number;
  fiberPer100g: number;
  sugarPer100g: number;
  sodiumPer100g: number;
  servingSizeG: number;
  servingSizeUnit?: string;
  fullNutrients?: Array<FullNutrient>;
  altMeasures?: Array<AltMeasure>;
  createdAt?: string;
  updatedAt?: string;
  image_url?: string;
};

export type FullNutrient = {
  value?: number;
  attr_id?: number;
};

export type AltMeasure = {
  measure?: string;
  qty?: number;
  serving_weight?: number;
};

