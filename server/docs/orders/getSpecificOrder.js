module.exports = {
    get: {
      security: [
          {
              bearerAuth: [],
          }
      ],
      tags: ["Orders CRUD operations"], 
      description: "Get Specific Order details", 
      operationId: "getSpecificOrder", 
      parameters: [
        {
            name: "id",
            in: "path",
            schema: {
            $ref: "#/components/schemas/OrderId",
            },
            required: true,
            description: "The order id", 
        },
      ], 
      responses: {
        200: {
          description: "The Order was retrieved", 
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
