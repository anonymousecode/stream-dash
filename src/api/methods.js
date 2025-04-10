const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_FRAPPE_API_KEY;
const apiSecret = process.env.NEXT_PUBLIC_FRAPPE_API_SECRET;

export async function login(usr, pwd) {
    return fetch(apiBaseUrl + "/api/method/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usr: usr,
            pwd: pwd,
        }),

    })
        .then((response) => response.json())
        .then((response) => {
            if (response.message === "Logged In") {
                // toast.success(`Logging in as ${response.full_name}`);
                console.log("Login successful:", response);
                // Store the session ID in local storage
                localStorage.setItem("session_id", response.session_id);
                localStorage.setItem("user", JSON.stringify(response));
                // localStorage.setItem("user_name", response.full_name);
                // localStorage.setItem("user_email", response.email);
                // localStorage.setItem("user_image", response.image);
                // localStorage.setItem("user_role", response.user_type);
                // localStorage.setItem("user_full_name", response.full_name);
                // localStorage.setItem("user_first_name", response.first_name);
                // localStorage.setItem("user_last_name", response.last_name); 
                return true;
            }
        })
        .catch((error) => {
            console.error("Login Error:", error);
            toast.error("Login failed");
        });
}



export async function getUser() {
    try {
        const res = await fetch(
            apiBaseUrl + "/api/method/stream.api.get_user",
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `token ${apiKey}:${apiSecret}`,
                },
            }
        );

        const resJson = await res.json();
        return resJson.data;

    } catch (err) {
        return err;
    }
}

export async function getDashBoard() {
    try {
        const res = await fetch(
            apiBaseUrl + "/api/method/stream.api.admin_dashboard",
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `token ${apiKey}:${apiSecret}`,
                },
            }
        );
        const resJson = await res.json();
        return resJson.data;
    } catch (err) {
        return err;
    }
}
