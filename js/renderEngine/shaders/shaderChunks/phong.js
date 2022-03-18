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

        vec3 phongShading(vec3 diffuse, vec3 specular, float shininess, vec3 normal, vec3 fragPos, vec3 cameraPos, vec3 lightPos, vec3 lightAmbient, vec3 lightDiffuse) {
          vec3 lightDir = normalize(lightPos - fragPos);
          vec3 viewDir = normalize(cameraPos - fragPos);
          vec3 norm = normalize(normal);

          vec3 ambientComp = lightAmbient * diffuse;
          vec3 diffuseComp = calculateDiffuse(norm, lightDir) * lightDiffuse * diffuse;
          vec3 specularComp = calculateSpecular(shininess, norm, lightDir, viewDir) * lightDiffuse * specular;

          return ambientComp + diffuseComp + specularComp;
        }
      `,
      attribsMeta: null,
      uniformsMeta: null,
    },
  ],
]);
