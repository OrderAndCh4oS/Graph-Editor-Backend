function authFailTests(result) {
    expect(result.statusCode).toBe(401);
    expect(result.body).toBeDefined();
    expect(result.body.statusCode).toBeDefined();
    expect(result.body.message).toBeDefined();
    expect(result.body.message).toEqual("Auth failed.");
}

export function successResponseTests(result) {
    expect(result.statusCode).toBe(200);
    expect(result.body).toBeDefined();
    expect(result.body.data).toBeDefined();
}

export function successDataTest(obj, result) {
    // @ts-ignore
    for (const [key, value] of Object.entries(obj)) {
        expect(result.body.data[key]).toBeDefined();
        expect(result.body.data[key]).toEqual(value);
    }
}

export const authFailGet = (agent, endpoint) => async () => {
    // @ts-ignore
    const result = await agent
        .get(endpoint)
        .set('Accept', 'application/json');

    authFailTests(result);
};

export const authFailPost = (agent, endpoint, data) => async () => {
    // @ts-ignore
    const result = await agent
        .post(endpoint)
        .send(data)
        .set('Accept', 'application/json');

    authFailTests(result);
};

export const authFailPut = (agent, endpoint, data) => async () => {
    // @ts-ignore
    const result = await agent
        .put(endpoint)
        .send(data)
        .set('Accept', 'application/json');

    authFailTests(result);
};

export const authFailDelete = (agent, endpoint) => async () => {
    // @ts-ignore
    const result = await agent
        .delete(endpoint)
        .set('Accept', 'application/json');

    authFailTests(result);
};

export const login = (agent, user) => async () => {
    // @ts-ignore
    const result = await agent
        .post('/login')
        .send(user)
        .set('Accept', 'application/json');

    expect(result.statusCode).toBe(200);
};
