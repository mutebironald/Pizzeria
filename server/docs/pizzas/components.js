module.exports = {
    components: {
      securitySchemes:{
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
          }
      },
      schemas: {
        id: {
            type: "string", 
            description: "order Id",
            example: "610587b86351a38b18643e35",
        },
        User: {
            type: "object", 
            properties: {
              first_name: {
                type: "string", 
                description: "User's first name", 
                example: "John",
              },
              last_name: {
                type: "string", 
                description: "User's last name", 
                example: "Doe",
              },
              email: {
                type: "string",
                description: "A user's email address", 
                example: "johndoe@gmail.com", 
              },
              password: {
                type: "string",
                description: "A user's password", 
                example: "tjfejubhopr904@#R", 
              }
            },
        },
        Pizza: {
            type: "object", 
            properties: {
              name: {
                type: "string", 
                description: "Name of pizza", 
                example: "Margherita",
              },
              price: {
                type: "number",
                description: "price/cost of the pizza", 
                example: 20, 
              }
            },
        },
        OrderItem: {
          type: "object",
          properties: {
            pizza_id: {
              type: "string",
              description: "Pizza id", 
              example: "610587b86351a38b18643e35",
            },
            quantity: {
              type: "number",
              description: "number of pizzas ordered", 
              example: 2, 
            },
            totalAmount: {
              type: "number", 
              description: "The total amount/cost of the pizzas purchased",
              example: 10,  
            },
          },
        },
      },
    },
  };
