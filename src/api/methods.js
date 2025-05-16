const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_FRAPPE_API_KEY;
const apiSecret = process.env.NEXT_PUBLIC_FRAPPE_API_SECRET;

export async function login(usr, pwd) {
    return fetch(apiBaseUrl + "/api/method/login", {
        method: "POST",
        credentials: "include", //new addition
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

export async function getNotifications() {
    try {
        const response = await fetch(apiBaseUrl + "/api/method/stream.api.message", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `token ${apiKey}:${apiSecret}`,
            },
        });

        const data = await response.json();

        console.log(data.message);
        return data.message;
    } catch (error) {
        console.log("Error:", error);
        return error;
    }
}



export async function get_data(doctype, fields, filters) {
    return fetch(apiBaseUrl + "/api/method/stream.api.take_doc", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // Doctype: "Events",
            // Fields: ["Title", "Description", "Event_Image"]
            Doctype: doctype,
            Fields: fields,
            Filters: filters

        }),

    })

        .then(async (response) => {
            console.log(filters);
            console.log(fields);
            console.log(doctype);
            console.log("Response Status:", response.status);
            const json = await response.json();
            console.log("API Response:", json);
            return json.message || [];
        })
        .catch((error) => {
            console.error("Fetch Error:", error);
        });
}



export async function insertDoc(doctype, body) {
    try {
        const res = await fetch(
            `${apiBaseUrl}/api/resource/${doctype}`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `token ${apiKey}:${apiSecret}`,
                },
                body: JSON.stringify(body),
            }
        );

        const resJson = await res.json();
        console.log(resJson.data);

        if (!res.ok) {
            throw new Error(resJson.message || "Failed to insert document");
        }

        return resJson.data;

    } catch (err) {
        return { error: err.message || err };
    }
}


export async function uploadFile(file, isPrivate = false) {
    try {
        const formData = new FormData();
        formData.append("file", file);                         // Actual file object
        formData.append("is_private", isPrivate ? "1" : "0");  // "1" for private, "0" for public

        const res = await fetch(`${apiBaseUrl}/api/method/upload_file`, {
            method: "POST",
            headers: {
                "Authorization": `token ${apiKey}:${apiSecret}`
                // Note: DO NOT set Content-Type for FormData. Browser will auto-set with boundary.
            },
            body: formData
        });

        const resJson = await res.json();

        if (!res.ok) {
            throw new Error(resJson.message || "File upload failed");
        }

        // Returns the file_url like "/files/image.jpg"
        return resJson.message.file_url;

    } catch (err) {
        return { error: err.message || err };
    }
}


export async function update(DocType, Document, Data) {
    return fetch(apiBaseUrl + "/api/resource/" + DocType + "/" + Document, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `token ${apiKey}:${apiSecret}`,
        },
        body: JSON.stringify({
            ...Data,
        }),
    })
        .then((response) => {
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        })
        .catch((error) => {
            console.log("Error:", error);
            return error;
        });
}

export async function trash(DocType, Document) {
  return fetch(apiBaseUrl +"/api/resource/" + DocType + "/" + Document, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `token ${apiKey}:${apiSecret}`,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}