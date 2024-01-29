interface SignUpSchemaType {
    values: {
        username: string,
        email: string,
        password: string,
        image?: string
    }
}

export const useSignUp = async ({ values }: SignUpSchemaType) => {
    try {
        const response = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password,
                image: values.image
            }),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log("Created account success", responseData);
            return responseData;
        } else {
            console.error("Registration failed");
            return null;
        }
    } catch (error) {
        console.error("Error during registration", error);
        return null;
    }
}