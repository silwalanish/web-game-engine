export default new Map([
  [
    "phong",
    {
      source: `
        float calculateDiffuse(vec3 norm, vec3 lightDir) {
          float diffuseFactor = max(dot(norm, lightDir), 0.0);

          return diffuseFactor;
        }

        float calculateSpecular(float shininess, vec3 norm, vec3 lightDir, vec3 viewDir) {
          vec3 reflectDir = reflect(-lightDir, norm);

          float specularFactor = pow(max(dot(viewDir, reflectDir), 0.0), shininess);

          return specularFactor;
        }

        vec3 calculateLight(vec3 diffuse, vec3 specular, float shininess, vec3 norm, vec3 lightDir, vec3 viewDir, Light light) {
          vec3 ambientComp = light.ambient * diffuse;
          vec3 diffuseComp = calculateDiffuse(norm, lightDir) * light.diffuse * diffuse;
          vec3 specularComp = calculateSpecular(shininess, norm, lightDir, viewDir) * light.diffuse * specular;

          return (ambientComp + diffuseComp + specularComp);
        }

        vec3 calculatePointLight(vec3 diffuse, vec3 specular, float shininess, vec3 norm, vec3 fragPos, vec3 viewDir, Light light) {
          vec3 lightDir = light.position - fragPos;
          float d = length(lightDir);
          lightDir = normalize(lightDir);

          return calculateLight(diffuse, specular, shininess, norm, lightDir, viewDir, light) * calculateAttenuation(d, light.attenuation);
        }

        vec3 phongShading(vec3 diffuse, vec3 specular, float shininess, vec3 normal, vec3 fragPos, vec3 cameraPos, Light lights[MAX_NUM_OF_LIGHTS]) {
          vec3 viewDir = normalize(cameraPos - fragPos);
          vec3 norm = normalize(normal);
          vec3 lightResult = vec3(0.0);

          for(int i = 0; i < MAX_NUM_OF_LIGHTS; i++) {
            if (lights[i].isActive == 1) {
              if (lights[i].type == 0) {
                lightResult += calculateLight(diffuse, specular, shininess, norm, normalize(lights[i].orientation), viewDir, lights[i]);
              }
              if (lights[i].type == 1) {
                lightResult += calculatePointLight(diffuse, specular, shininess, norm, fragPos, viewDir, lights[i]);
              }
            }
          }

          return lightResult;
        }
      `,
      attribsMeta: null,
      uniformsMeta: null,
    },
  ],
]);
