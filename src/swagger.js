import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerDefinition = {
  info: {
    title: 'Endpoints Documentation',
    version: '1.0.0',
    description: 'Documentation for Endpoints in Api-sampleD',
  },
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ['src/main.js'],
};

const swaggerSpec = swaggerJSDoc(options)

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
