module.exports = {
    post: {
        tags: ["Orders CRUD operations"], 
        description: "Create Order", 
        operationId: "createOrder", 
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OrderItem",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Your order has been taken", 
          },
          400: {
            description: "That pizza is inexistent, try again with a valid pizza id",
          },
          500: {
            description: "Server error",
          },
        },
    },
    get: {
      security: [
        {
            bearerAuth: [],
        }
      ],
      tags: ["Orders CRUD operations"], 
      description: "Get Orders", 
      operationId: "getOrders", 
      parameters: [], 
      responses: {
        200: {
          description: "Orders were retrieved", 
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OrderItem",
              },
            },
          },
        },
        500: {
        description: "Server error", 
      },
      },
    },
  };
