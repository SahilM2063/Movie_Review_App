import client from "./client";

export const createActor = async (formData) => {
    const token = localStorage.getItem('auth-token');

    try {
        const { data } = await client.post("/actor/create-actor", formData, {
            headers: {
                Authorization: "Bearer " + token,
                'content-type': 'multipart/form-data'
            },
        });
        return data;
    } catch (error) {
        const { response } = error;
        if (response?.data) return response.data

        return { error: error.message || error }
    }
}