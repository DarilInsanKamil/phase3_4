interface SignUpSchemaType {
    values: {
        username: string,
        email: string,
        password: string,
        image?: string
    }
}
interface CreateTweetType {
    values: {
        userId: number,
        tweet: string
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

export const useCreateTweet = async ({ values }: CreateTweetType) => {
    const id = Number(values.userId)
    try {
        const response = await fetch(`api/tweet/${id}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                tweet: values.tweet
            })
        })
        if (response.ok) {
            const responseData = await response.json();
            return responseData
        } else {
            console.error("Create tweet failed")
            return null;
        }
    } catch (err) {
        console.error("Error during create tweet", err)
        return null;
    }
}