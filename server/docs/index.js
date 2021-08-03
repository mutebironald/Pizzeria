
const { servers } =  require('./servers')
const { tags } =  require('./tags')
const { components } = require('./components')
const { paths } = require('./paths')

const swaggerDocument = {
    openapi: '3.0.3',
    info: {
        version: '1.0.0',
        title: 'Pizzeria API',
        description: 'Pizza ordering serviceyour description here',
        termsOfService: '',
        contact: {
            name: 'Ronald Mutebi',
            email: 'mutebironaldroninho@gmail.com',
            url: 'github.com/mutebironald'
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    servers,
    tags,
    components,
    // paths,
    // securityDefinitions:{
    //     Bearer:{
    //         type: 'apiKey',
    //         name: 'Authorization',
    //         in: 'header'
    //     }
    // },
    paths,
}

module.exports = swaggerDocument;
