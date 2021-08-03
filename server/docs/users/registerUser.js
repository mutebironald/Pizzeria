module.exports = {
    post: {
        tags: ["Users CRUD operations"], 
        description: "Register User", 
        operationId: "registerUser", 
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          201: {
            description: "You have successfully registered, login", 
          },
          500: {
            description: "Server error",
          },
        },
    },
}
