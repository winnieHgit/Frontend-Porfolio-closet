interface OutfitGenerateParameter {
  temperature: number;
  condition: string;
  
}

const WeatherCondition = (recommedation: OutfitGenerateParameter) => {
  if (0 < recommedation.temperature && recommedation.temperature < 10) {
    return "Freeze";
  }
  if (10 < recommedation.temperature && recommedation.temperature < 20) {
    return "Cold";
  }
  if (20 < recommedation.temperature && recommedation.temperature < 30) {
    return "Warm";
  }
  if (recommedation.temperature > 30) {
    return "Hot";
  }
};

export default WeatherCondition;
