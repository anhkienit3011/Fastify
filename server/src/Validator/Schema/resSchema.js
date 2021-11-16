const resSchema = {
    response: {
        200: {
            type: 'object',
            required: ['code', 'message'],
            properties: {
                code: { type: 'integer', default: 0 },
                message: { type: 'string' },
                payload: {
                    oneOf: [
                        {
                            type: 'object',
                            additionalProperties: true,
                        },
                        {
                            type: 'array',
                        },
                    ],
                },
            },
            additionalProperties: false,
        },
        400: {
            type: 'object',
            required: ['code', 'message'],
            properties: {
                code: { type: 'integer', default: 999 },
                message: { type: 'string' },
                payload: {
                    oneOf: [
                        {
                            type: 'object',
                            additionalProperties: true,
                        },
                        {
                            type: 'array',
                        },
                    ],
                },
            },
            additionalProperties: false,
        },
        401: {
            type: 'object',
            required: ['code', 'message'],
            properties: {
                code: { type: 'integer', default: 401 },
                message: { type: 'string' },
                payload: {
                    oneOf: [
                        {
                            type: 'object',
                            additionalProperties: true,
                        },
                        {
                            type: 'array',
                        },
                    ],
                },
            },
            additionalProperties: false,
        },
    },
    definitions: {
        nonEmptyString: {
            minLength: 1,
        },
    },
};

module.exports = {
    resSchema,
};